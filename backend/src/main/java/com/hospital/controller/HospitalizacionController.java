package com.hospital.controller;

import com.hospital.dto.HospitalizacionCreateDTO;
import com.hospital.dto.HospitalizacionDTO;
import com.hospital.entity.Hospitalizacion;
import com.hospital.service.HospitalizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hospitalizaciones")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HospitalizacionController {

    @Autowired
    private HospitalizacionService hospitalizacionService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_ENFERMERA')")
    public ResponseEntity<List<HospitalizacionDTO>> listarTodas() {
        List<HospitalizacionDTO> hospitalizaciones = hospitalizacionService.listarTodas().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalizaciones);
    }

    private HospitalizacionDTO convertirADTO(Hospitalizacion h) {
        String nombrePaciente = h.getPaciente().getNombres() + " " + h.getPaciente().getApellidos();
        String numeroHabitacion = h.getHabitacion() != null ? h.getHabitacion().getNumero() : "N/A";
        return new HospitalizacionDTO(h.getIdHosp(), h.getPaciente().getIdPaciente(), nombrePaciente,
                numeroHabitacion, h.getFechaIngreso(), h.getFechaAlta(), h.getDiagnosticoIngreso(), h.getEstado());
    }

    @GetMapping("/activas")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_ENFERMERA')")
    public ResponseEntity<List<HospitalizacionDTO>> listarActivas() {
        List<HospitalizacionDTO> hospitalizaciones = hospitalizacionService.listarActivas().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalizaciones);
    }

    @GetMapping("/paciente/{idPaciente}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_ENFERMERA')")
    public ResponseEntity<List<HospitalizacionDTO>> listarPorPaciente(@PathVariable Long idPaciente) {
        List<HospitalizacionDTO> hospitalizaciones = hospitalizacionService.listarPorPaciente(idPaciente).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalizaciones);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_ENFERMERA')")
    public ResponseEntity<HospitalizacionDTO> buscarPorId(@PathVariable Long id) {
        return hospitalizacionService.buscarPorId(id)
                .map(this::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<HospitalizacionDTO> crear(@RequestBody HospitalizacionCreateDTO dto) {
        Hospitalizacion hospitalizacion = hospitalizacionService.crearDesdeDTO(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertirADTO(hospitalizacion));
    }

    @PatchMapping("/{id}/alta")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<HospitalizacionDTO> darAlta(@PathVariable Long id) {
        try {
            Hospitalizacion hospitalizacion = hospitalizacionService.darAlta(id);
            return ResponseEntity.ok(convertirADTO(hospitalizacion));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        hospitalizacionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
