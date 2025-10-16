package com.hospital.controller;

import com.hospital.dto.LoginRequest;
import com.hospital.dto.LoginResponse;
import com.hospital.dto.MessageResponse;
import com.hospital.entity.Usuario;
import com.hospital.repository.UsuarioRepository;
import com.hospital.security.JwtTokenProvider;
import com.hospital.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
        final String username = loginRequest.getNombreUsuario() == null
            ? null
            : loginRequest.getNombreUsuario().trim();

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                username,
                            loginRequest.getContrasena()
                    )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
        Usuario usuario = usuarioRepository.findByNombreUsuario(username)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            return ResponseEntity.ok(new LoginResponse(
                    jwt,
                    usuario.getIdUsuario(),
                    usuario.getNombreUsuario(),
                    usuario.getRol()
            ));
        } catch (Exception e) {
        log.warn("Fallo de login: {}", e.getMessage());
        return ResponseEntity.status(400)
                    .body(new MessageResponse("Error: Credenciales inválidas"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByNombreUsuario(usuario.getNombreUsuario()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: El nombre de usuario ya está en uso"));
        }
        
        Usuario nuevoUsuario = usuarioService.guardar(usuario);
        return ResponseEntity.ok(new MessageResponse("Usuario registrado exitosamente"));
    }
}
