package com.hospital.repository;

import com.hospital.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByPacienteIdPaciente(Long idPaciente);
    List<Cita> findByMedicoIdMedico(Long idMedico);
    List<Cita> findByEstado(String estado);
    List<Cita> findByFecha(LocalDate fecha);
    List<Cita> findByMedicoIdMedicoAndFecha(Long idMedico, LocalDate fecha);
}
