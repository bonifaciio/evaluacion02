package com.hospital;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utilidad para generar hashes BCrypt de contraseñas
 * Uso: Ejecutar este main para generar el hash de "admin123"
 */
public class GeneratePassword {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "admin123";
        String hashedPassword = encoder.encode(password);

        System.out.println("=====================================");
        System.out.println("GENERADOR DE CONTRASEÑAS BCRYPT");
        System.out.println("=====================================");
        System.out.println("Contraseña original: " + password);
        System.out.println("Hash BCrypt generado:");
        System.out.println(hashedPassword);
        System.out.println("=====================================");
        System.out.println("\nPuedes usar este hash en data.sql");
    }
}
