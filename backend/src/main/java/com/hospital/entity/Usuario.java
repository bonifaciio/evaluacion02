package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false, unique = true, length = 50)
    private String nombreUsuario;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false, length = 20)
    private String rol; // admin, medico, recepcionista, enfermera

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Bitacora> bitacoras = new ArrayList<>();

    // ✅ Métodos requeridos por Spring Security
    public String getUsername() {
        return this.nombreUsuario;
    }

    public String getPassword() {
        return this.contrasena;
    }
}
