package com.hospital.security;

import com.hospital.entity.Usuario;
import com.hospital.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Validar username
        if (username == null || username.isBlank()) {
            log.warn("Se intentó cargar un usuario con nombre vacío o null");
            throw new UsernameNotFoundException("Nombre de usuario inválido");
        }

        // Asegurar que la variable usada en la lambda sea final o efectivamente final
        username = username.trim();
        final String usernameFinal = username;

        // Buscar usuario en la BD
        Optional<Usuario> optionalUsuario = usuarioRepository.findByNombreUsuario(usernameFinal);

        Usuario usuario = optionalUsuario
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + usernameFinal));

        // Validar contraseña
        String password = usuario.getPassword();
        if (password == null || password.isBlank()) {
            log.warn("Usuario '{}' tiene contraseña vacía en BD", usernameFinal);
            throw new UsernameNotFoundException("Usuario sin contraseña válida");
        }

        // Obtener roles
        Collection<? extends GrantedAuthority> authorities = getAuthorities(usuario);

        if (log.isDebugEnabled()) {
            log.debug("Cargando usuario='{}', rolBD='{}', authorities={}",
                    usernameFinal, usuario.getRol(), authorities);
        }

        return new User(usernameFinal, password, authorities);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Usuario usuario) {
        String role = usuario.getRol();

        if (role == null || role.isBlank()) {
            log.warn("Usuario '{}' con rol vacío en BD", usuario.getUsername());
            return Collections.emptyList();
        }

        role = role.trim().toUpperCase();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }
}