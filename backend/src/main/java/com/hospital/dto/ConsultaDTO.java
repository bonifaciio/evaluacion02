package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaDTO {
    private Long idConsulta;
    private Long idCita;
    private Long idPaciente;
    private String nombrePaciente;
    private Long idMedico;
    private String nombreMedico;
    private LocalDate fecha;
    private LocalTime hora;
    private String motivoConsulta;
    private String observaciones;
}
