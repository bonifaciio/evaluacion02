package com.hospital.controller;

import com.hospital.dto.CitaCreateDTO;
import com.hospital.dto.CitaDTO;
import com.hospital.entity.Cita;
import com.hospital.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CitaController {

    @Autowired
    private CitaService citaService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> listarTodas() {
        List<CitaDTO> citas = citaService.listarTodas().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(citas);
    }

    private CitaDTO convertirADTO(Cita c) {
        String nombrePaciente = c.getPaciente().getNombres() + " " + c.getPaciente().getApellidos();
        String nombreMedico = c.getMedico().getNombres() + " " + c.getMedico().getApellidos();
        return new CitaDTO(c.getIdCita(), c.getPaciente().getIdPaciente(), nombrePaciente,
                c.getMedico().getIdMedico(), nombreMedico, c.getFecha(), c.getHora(), c.getMotivo(), c.getEstado());
    }

    @GetMapping("/paciente/{idPaciente}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<Cita>> listarPorPaciente(@PathVariable Long idPaciente) {
        return ResponseEntity.ok(citaService.listarPorPaciente(idPaciente));
    }

    @GetMapping("/medico/{idMedico}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<Cita>> listarPorMedico(@PathVariable Long idMedico) {
        return ResponseEntity.ok(citaService.listarPorMedico(idMedico));
    }

    @GetMapping("/medico/{idMedico}/fecha/{fecha}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<Cita>> listarPorMedicoYFecha(
            @PathVariable Long idMedico,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(citaService.listarPorMedicoYFecha(idMedico, fecha));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<Cita> buscarPorId(@PathVariable Long id) {
        return citaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<CitaDTO> crear(@RequestBody CitaCreateDTO dto) {
        Cita cita = citaService.crearDesdeDTO(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertirADTO(cita));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<CitaDTO> actualizar(@PathVariable Long id, @RequestBody CitaCreateDTO dto) {
        try {
            Cita cita = citaService.actualizarDesdeDTO(id, dto);
            return ResponseEntity.ok(convertirADTO(cita));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<Cita> cambiarEstado(@PathVariable Long id, @RequestParam String estado) {
        try {
            return ResponseEntity.ok(citaService.cambiarEstado(id, estado));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        citaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
