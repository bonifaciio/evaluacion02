package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "hospitalizacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospitalizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHosp;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    @com.fasterxml.jackson.annotation.JsonBackReference("paciente-hospitalizaciones")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_habitacion", nullable = false)
    private Habitacion habitacion;

    @Column(nullable = false)
    private LocalDate fechaIngreso;

    private LocalDate fechaAlta;

    @Column(columnDefinition = "TEXT")
    private String diagnosticoIngreso;

    @Column(nullable = false, length = 20)
    private String estado = "activo"; // activo, dado_de_alta
}
