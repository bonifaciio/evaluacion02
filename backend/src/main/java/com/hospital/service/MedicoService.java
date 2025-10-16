package com.hospital.service;

import com.hospital.entity.Medico;
import com.hospital.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicoService {
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }
    
    public List<Medico> listarActivos() {
        return medicoRepository.findByEstado("activo");
    }
    
    public Optional<Medico> buscarPorId(Long id) {
        return medicoRepository.findById(id);
    }
    
    public Optional<Medico> buscarPorColegiatura(String colegiatura) {
        return medicoRepository.findByColegiatura(colegiatura);
    }
    
    public List<Medico> buscarPorNombre(String busqueda) {
        return medicoRepository.findByNombresContainingOrApellidosContaining(busqueda, busqueda);
    }
    
    public Medico guardar(Medico medico) {
        return medicoRepository.save(medico);
    }
    
    public Medico actualizar(Long id, Medico medico) {
        if (medicoRepository.existsById(id)) {
            medico.setIdMedico(id);
            return medicoRepository.save(medico);
        }
        throw new RuntimeException("Médico no encontrado");
    }
    
    public void desactivar(Long id) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        medico.setEstado("inactivo");
        medicoRepository.save(medico);
    }
    
    public void eliminar(Long id) {
        medicoRepository.deleteById(id);
    }
}
