package com.hospital.controller;

import com.hospital.dto.MedicoDTO;
import com.hospital.entity.Medico;
import com.hospital.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<MedicoDTO>> listarTodos() {
        List<MedicoDTO> medicos = medicoService.listarTodos().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(medicos);
    }

    private MedicoDTO convertirADTO(Medico m) {
        return new MedicoDTO(m.getIdMedico(), m.getNombres(), m.getApellidos(), m.getColegiatura(),
                m.getTelefono(), m.getCorreo(), m.getEstado());
    }

    @GetMapping("/activos")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<List<MedicoDTO>> listarActivos() {
        List<MedicoDTO> medicos = medicoService.listarActivos().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(medicos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA')")
    public ResponseEntity<MedicoDTO> buscarPorId(@PathVariable Long id) {
        return medicoService.buscarPorId(id)
                .map(this::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MedicoDTO> crear(@RequestBody Medico medico) {
        Medico guardado = medicoService.guardar(medico);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertirADTO(guardado));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MedicoDTO> actualizar(@PathVariable Long id, @RequestBody Medico medico) {
        try {
            Medico actualizado = medicoService.actualizar(id, medico);
            return ResponseEntity.ok(convertirADTO(actualizado));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/desactivar")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {
        try {
            medicoService.desactivar(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        medicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
