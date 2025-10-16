package com.hospital.service;

import com.hospital.dto.ConsultaCreateDTO;
import com.hospital.entity.Cita;
import com.hospital.entity.Consulta;
import com.hospital.entity.Medico;
import com.hospital.entity.Paciente;
import com.hospital.repository.CitaRepository;
import com.hospital.repository.ConsultaRepository;
import com.hospital.repository.MedicoRepository;
import com.hospital.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private CitaRepository citaRepository;

    public List<Consulta> listarTodas() {
        return consultaRepository.findAll();
    }

    public List<Consulta> listarPorPaciente(Long idPaciente) {
        return consultaRepository.findByPacienteIdPaciente(idPaciente);
    }

    public List<Consulta> listarPorMedico(Long idMedico) {
        return consultaRepository.findByMedicoIdMedico(idMedico);
    }

    public Optional<Consulta> buscarPorId(Long id) {
        return consultaRepository.findById(id);
    }

    public Consulta guardar(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    public Consulta actualizar(Long id, Consulta consulta) {
        if (consultaRepository.existsById(id)) {
            consulta.setIdConsulta(id);
            return consultaRepository.save(consulta);
        }
        throw new RuntimeException("Consulta no encontrada");
    }

    public void eliminar(Long id) {
        consultaRepository.deleteById(id);
    }

    public Consulta crearDesdeDTO(ConsultaCreateDTO dto) {
        Consulta consulta = new Consulta();

        // Buscar y asignar paciente
        Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        consulta.setPaciente(paciente);

        // Buscar y asignar médico
        Medico medico = medicoRepository.findById(dto.getIdMedico())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        consulta.setMedico(medico);

        // Asignar cita si existe
        if (dto.getIdCita() != null) {
            Cita cita = citaRepository.findById(dto.getIdCita())
                    .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
            consulta.setCita(cita);
        }

        // Asignar campos simples
        consulta.setFecha(dto.getFecha());
        consulta.setHora(dto.getHora());
        consulta.setMotivoConsulta(dto.getMotivoConsulta());
        consulta.setObservaciones(dto.getObservaciones());

        return consultaRepository.save(consulta);
    }

    public Consulta actualizarDesdeDTO(Long id, ConsultaCreateDTO dto) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta no encontrada"));

        // Actualizar paciente
        Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        consulta.setPaciente(paciente);

        // Actualizar médico
        Medico medico = medicoRepository.findById(dto.getIdMedico())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        consulta.setMedico(medico);

        // Actualizar cita si existe
        if (dto.getIdCita() != null) {
            Cita cita = citaRepository.findById(dto.getIdCita())
                    .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
            consulta.setCita(cita);
        } else {
            consulta.setCita(null);
        }

        // Actualizar campos simples
        consulta.setFecha(dto.getFecha());
        consulta.setHora(dto.getHora());
        consulta.setMotivoConsulta(dto.getMotivoConsulta());
        consulta.setObservaciones(dto.getObservaciones());

        return consultaRepository.save(consulta);
    }
}
