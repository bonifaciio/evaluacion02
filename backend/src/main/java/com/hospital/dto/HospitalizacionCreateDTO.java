package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalizacionCreateDTO {
    private Long idPaciente;
    private String numeroHabitacion;
    private LocalDate fechaIngreso;
    private LocalDate fechaAlta;
    private String diagnosticoIngreso;
    private String estado;
}
