package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "habitacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Habitacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHabitacion;
    
    @Column(nullable = false, unique = true, length = 20)
    private String numero;
    
    @Column(nullable = false, length = 50)
    private String tipo; // UCI, general, emergencia
    
    @Column(nullable = false, length = 20)
    private String estado = "disponible"; // disponible, ocupada, mantenimiento
    
    @OneToMany(mappedBy = "habitacion")
    private List<Hospitalizacion> hospitalizaciones = new ArrayList<>();
}
