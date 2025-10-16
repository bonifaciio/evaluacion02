package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaCreateDTO {
    private Long idCita;
    private Long idPaciente;
    private Long idMedico;
    private LocalDate fecha;
    private LocalTime hora;
    private String motivoConsulta;
    private String observaciones;
}
