package com.hospital.controller;

import com.hospital.dto.ConsultaCreateDTO;
import com.hospital.dto.ConsultaDTO;
import com.hospital.entity.Consulta;
import com.hospital.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MEDICO')")
    public ResponseEntity<List<ConsultaDTO>> listarTodas() {
        List<ConsultaDTO> consultas = consultaService.listarTodas().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(consultas);
    }

    private ConsultaDTO convertirADTO(Consulta c) {
        String nombrePaciente = c.getPaciente().getNombres() + " " + c.getPaciente().getApellidos();
        String nombreMedico = c.getMedico().getNombres() + " " + c.getMedico().getApellidos();
        Long idCita = c.getCita() != null ? c.getCita().getIdCita() : null;
        return new ConsultaDTO(c.getIdConsulta(), idCita, c.getPaciente().getIdPaciente(), nombrePaciente,
                c.getMedico().getIdMedico(), nombreMedico, c.getFecha(), c.getHora(),
                c.getMotivoConsulta(), c.getObservaciones());
    }

    @GetMapping("/paciente/{idPaciente}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<List<ConsultaDTO>> listarPorPaciente(@PathVariable Long idPaciente) {
        List<ConsultaDTO> consultas = consultaService.listarPorPaciente(idPaciente).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/medico/{idMedico}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<List<ConsultaDTO>> listarPorMedico(@PathVariable Long idMedico) {
        List<ConsultaDTO> consultas = consultaService.listarPorMedico(idMedico).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<ConsultaDTO> buscarPorId(@PathVariable Long id) {
        return consultaService.buscarPorId(id)
                .map(this::convertirADTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<ConsultaDTO> crear(@RequestBody ConsultaCreateDTO dto) {
        Consulta consulta = consultaService.crearDesdeDTO(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertirADTO(consulta));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MEDICO')")
    public ResponseEntity<ConsultaDTO> actualizar(@PathVariable Long id, @RequestBody ConsultaCreateDTO dto) {
        try {
            Consulta consulta = consultaService.actualizarDesdeDTO(id, dto);
            return ResponseEntity.ok(convertirADTO(consulta));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        consultaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
