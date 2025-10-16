package com.hospital.controller;

import com.hospital.dto.FacturaDTO;
import com.hospital.entity.Factura;
import com.hospital.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<List<FacturaDTO>> listarTodas() {
        List<FacturaDTO> facturas = facturaService.listarTodas().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(facturas);
    }

    private FacturaDTO convertirADTO(Factura f) {
        String nombrePaciente = f.getPaciente().getNombres() + " " + f.getPaciente().getApellidos();
        return new FacturaDTO(f.getIdFactura(), f.getPaciente().getIdPaciente(), nombrePaciente,
                f.getFechaEmision(), f.getTotal(), f.getEstado());
    }

    @GetMapping("/paciente/{idPaciente}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<List<Factura>> listarPorPaciente(@PathVariable Long idPaciente) {
        return ResponseEntity.ok(facturaService.listarPorPaciente(idPaciente));
    }

    @GetMapping("/estado/{estado}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<List<Factura>> listarPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(facturaService.listarPorEstado(estado));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<Factura> buscarPorId(@PathVariable Long id) {
        return facturaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<Factura> crear(@RequestBody Factura factura) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(facturaService.guardar(factura));
    }

    @PatchMapping("/{id}/pagar")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public ResponseEntity<Factura> marcarComoPagado(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(facturaService.marcarComoPagado(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        facturaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
