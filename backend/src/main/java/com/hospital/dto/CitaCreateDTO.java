package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaCreateDTO {
    private Long idPaciente;
    private Long idMedico;
    private LocalDate fecha;
    private LocalTime hora;
    private String motivo;
    private String estado;
}
