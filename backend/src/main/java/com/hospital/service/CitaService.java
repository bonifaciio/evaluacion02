package com.hospital.service;

import com.hospital.entity.Cita;
import com.hospital.repository.CitaRepository;
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
}
