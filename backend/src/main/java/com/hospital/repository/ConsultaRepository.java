package com.hospital.repository;

import com.hospital.entity.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findByPacienteIdPaciente(Long idPaciente);
    List<Consulta> findByMedicoIdMedico(Long idMedico);
}
