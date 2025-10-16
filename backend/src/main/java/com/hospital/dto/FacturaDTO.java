package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaDTO {
    private Long idFactura;
    private Long idPaciente;
    private String nombrePaciente;
    private LocalDate fechaEmision;
    private BigDecimal total;
    private String estado;
}
