package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String nombreUsuario;
    private String rol;
    
    public LoginResponse(String token, Long id, String nombreUsuario, String rol) {
        this.token = token;
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.rol = rol;
    }
}
