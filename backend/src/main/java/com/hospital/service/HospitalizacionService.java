package com.hospital.service;

import com.hospital.dto.HospitalizacionCreateDTO;
import com.hospital.entity.Hospitalizacion;
import com.hospital.entity.Habitacion;
import com.hospital.entity.Paciente;
import com.hospital.repository.HospitalizacionRepository;
import com.hospital.repository.HabitacionRepository;
import com.hospital.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HospitalizacionService {

    @Autowired
    private HospitalizacionRepository hospitalizacionRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Hospitalizacion> listarTodas() {
        return hospitalizacionRepository.findAll();
    }

    public List<Hospitalizacion> listarActivas() {
        return hospitalizacionRepository.findByEstado("activo");
    }

    public List<Hospitalizacion> listarPorPaciente(Long idPaciente) {
        return hospitalizacionRepository.findByPacienteIdPaciente(idPaciente);
    }

    public Optional<Hospitalizacion> buscarPorId(Long id) {
        return hospitalizacionRepository.findById(id);
    }

    public Hospitalizacion guardar(Hospitalizacion hospitalizacion) {
        // Cambiar estado de habitación a ocupada
        Habitacion habitacion = hospitalizacion.getHabitacion();
        habitacion.setEstado("ocupada");
        habitacionRepository.save(habitacion);

        return hospitalizacionRepository.save(hospitalizacion);
    }

    public Hospitalizacion darAlta(Long id) {
        Hospitalizacion hospitalizacion = hospitalizacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospitalización no encontrada"));

        hospitalizacion.setEstado("dado_de_alta");
        hospitalizacion.setFechaAlta(java.time.LocalDate.now());

        // Liberar habitación
        Habitacion habitacion = hospitalizacion.getHabitacion();
        habitacion.setEstado("disponible");
        habitacionRepository.save(habitacion);

        return hospitalizacionRepository.save(hospitalizacion);
    }

    public void eliminar(Long id) {
        hospitalizacionRepository.deleteById(id);
    }

    public Hospitalizacion crearDesdeDTO(HospitalizacionCreateDTO dto) {
        Hospitalizacion hospitalizacion = new Hospitalizacion();

        // Buscar y asignar paciente
        Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        hospitalizacion.setPaciente(paciente);

        // Buscar y asignar habitación si se proporciona un número
        if (dto.getNumeroHabitacion() != null && !dto.getNumeroHabitacion().trim().isEmpty()) {
            Habitacion habitacion = habitacionRepository.findByNumero(dto.getNumeroHabitacion())
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

            // Verificar que la habitación esté disponible
            if (!"disponible".equals(habitacion.getEstado())) {
                throw new RuntimeException("La habitación no está disponible");
            }

            hospitalizacion.setHabitacion(habitacion);
            // Marcar habitación como ocupada
            habitacion.setEstado("ocupada");
            habitacionRepository.save(habitacion);
        }

        // Asignar campos simples
        hospitalizacion.setFechaIngreso(dto.getFechaIngreso());
        hospitalizacion.setFechaAlta(dto.getFechaAlta());
        hospitalizacion.setDiagnosticoIngreso(dto.getDiagnosticoIngreso());
        hospitalizacion.setEstado(dto.getEstado() != null ? dto.getEstado() : "activo");

        return hospitalizacionRepository.save(hospitalizacion);
    }
}
