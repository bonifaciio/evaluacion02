package com.hospital.repository;

import com.hospital.entity.MedicoEspecialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicoEspecialidadRepository extends JpaRepository<MedicoEspecialidad, Long> {
    List<MedicoEspecialidad> findByMedicoIdMedico(Long idMedico);
    List<MedicoEspecialidad> findByEspecialidadIdEspecialidad(Long idEspecialidad);
}
