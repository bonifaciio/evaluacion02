package com.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "antecedente_medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AntecedenteMedico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAntecedente;
    
    @ManyToOne
    @JoinColumn(name = "id_historia", nullable = false)
    private HistoriaClinica historiaClinica;
    
    @Column(nullable = false, length = 50)
    private String tipo; // alergias, enfermedades_previas, cirugias
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
}
