package com.hospital.service;

import com.hospital.entity.Paciente;
import com.hospital.entity.HistoriaClinica;
import com.hospital.repository.PacienteRepository;
import com.hospital.repository.HistoriaClinicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PacienteService {
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private HistoriaClinicaRepository historiaClinicaRepository;
    
    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }
    
    public List<Paciente> listarActivos() {
        return pacienteRepository.findByEstado("activo");
    }
    
    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }
    
    public Optional<Paciente> buscarPorDni(String dni) {
        return pacienteRepository.findByDni(dni);
    }
    
    public List<Paciente> buscarPorNombre(String busqueda) {
        return pacienteRepository.findByNombresContainingOrApellidosContaining(busqueda, busqueda);
    }
    
    public Paciente guardar(Paciente paciente) {
        // Guardar paciente
        Paciente pacienteGuardado = pacienteRepository.save(paciente);
        
        // Crear historia clínica automáticamente
        if (pacienteGuardado.getHistoriaClinica() == null) {
            HistoriaClinica historiaClinica = new HistoriaClinica();
            historiaClinica.setPaciente(pacienteGuardado);
            historiaClinica.setFechaApertura(LocalDate.now());
            historiaClinica.setObservaciones("Historia clínica creada automáticamente");
            historiaClinicaRepository.save(historiaClinica);
        }
        
        return pacienteGuardado;
    }
    
    public Paciente actualizar(Long id, Paciente paciente) {
        if (pacienteRepository.existsById(id)) {
            paciente.setIdPaciente(id);
            return pacienteRepository.save(paciente);
        }
        throw new RuntimeException("Paciente no encontrado");
    }
    
    public void desactivar(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        paciente.setEstado("inactivo");
        pacienteRepository.save(paciente);
    }
    
    public void eliminar(Long id) {
        pacienteRepository.deleteById(id);
    }
}
