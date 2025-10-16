package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "detalle_receta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleReceta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleReceta;
    
    @ManyToOne
    @JoinColumn(name = "id_receta", nullable = false)
    private RecetaMedica receta;
    
    @Column(nullable = false, length = 200)
    private String medicamento;
    
    @Column(nullable = false, length = 100)
    private String dosis;
    
    @Column(nullable = false, length = 100)
    private String frecuencia;
    
    @Column(length = 100)
    private String duracion;
}
