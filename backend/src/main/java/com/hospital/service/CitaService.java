package com.hospital.service;

import com.hospital.dto.CitaCreateDTO;
import com.hospital.entity.Cita;
import com.hospital.entity.Paciente;
import com.hospital.entity.Medico;
import com.hospital.repository.CitaRepository;
import com.hospital.repository.PacienteRepository;
import com.hospital.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    public List<Cita> listarTodas() {
        return citaRepository.findAll();
    }
    
    public List<Cita> listarPorPaciente(Long idPaciente) {
        return citaRepository.findByPacienteIdPaciente(idPaciente);
    }
    
    public List<Cita> listarPorMedico(Long idMedico) {
        return citaRepository.findByMedicoIdMedico(idMedico);
    }
    
    public List<Cita> listarPorEstado(String estado) {
        return citaRepository.findByEstado(estado);
    }
    
    public List<Cita> listarPorMedicoYFecha(Long idMedico, LocalDate fecha) {
        return citaRepository.findByMedicoIdMedicoAndFecha(idMedico, fecha);
    }
    
    public Optional<Cita> buscarPorId(Long id) {
        return citaRepository.findById(id);
    }
    
    public Cita guardar(Cita cita) {
        return citaRepository.save(cita);
    }
    
    public Cita actualizar(Long id, Cita cita) {
        if (citaRepository.existsById(id)) {
            cita.setIdCita(id);
            return citaRepository.save(cita);
        }
        throw new RuntimeException("Cita no encontrada");
    }
    
    public Cita cambiarEstado(Long id, String estado) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setEstado(estado);
        return citaRepository.save(cita);
    }
    
    public void eliminar(Long id) {
        citaRepository.deleteById(id);
    }
    
    public Cita crearDesdeDTO(CitaCreateDTO dto) {
        Cita cita = new Cita();
        
        // Buscar y asignar paciente
        Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        cita.setPaciente(paciente);
        
        // Buscar y asignar médico
        Medico medico = medicoRepository.findById(dto.getIdMedico())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        cita.setMedico(medico);
        
        // Asignar campos simples
        cita.setFecha(dto.getFecha());
        cita.setHora(dto.getHora());
        cita.setMotivo(dto.getMotivo());
        cita.setEstado(dto.getEstado() != null ? dto.getEstado() : "programada");
        
        return citaRepository.save(cita);
    }
    
    public Cita actualizarDesdeDTO(Long id, CitaCreateDTO dto) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        
        // Actualizar paciente si cambió
        if (!cita.getPaciente().getIdPaciente().equals(dto.getIdPaciente())) {
            Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                    .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
            cita.setPaciente(paciente);
        }
        
        // Actualizar médico si cambió
        if (!cita.getMedico().getIdMedico().equals(dto.getIdMedico())) {
            Medico medico = medicoRepository.findById(dto.getIdMedico())
                    .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
            cita.setMedico(medico);
        }
        
        // Actualizar campos simples
        cita.setFecha(dto.getFecha());
        cita.setHora(dto.getHora());
        cita.setMotivo(dto.getMotivo());
        if (dto.getEstado() != null) {
            cita.setEstado(dto.getEstado());
        }
        
        return citaRepository.save(cita);
    }
}
