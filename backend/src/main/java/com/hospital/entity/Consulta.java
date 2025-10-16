package com.hospital.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "consulta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConsulta;

    @OneToOne
    @JoinColumn(name = "id_cita")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({ "consulta", "paciente", "medico" })
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "id_medico", nullable = false)
    @com.fasterxml.jackson.annotation.JsonBackReference("medico-consultas")
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    @com.fasterxml.jackson.annotation.JsonBackReference("paciente-consultas")
    private Paciente paciente;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(columnDefinition = "TEXT")
    private String motivoConsulta;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @OneToMany(mappedBy = "consulta", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Diagnostico> diagnosticos = new ArrayList<>();

    @OneToMany(mappedBy = "consulta", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RecetaMedica> recetas = new ArrayList<>();
}
