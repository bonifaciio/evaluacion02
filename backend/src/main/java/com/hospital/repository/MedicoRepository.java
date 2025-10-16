package com.hospital.repository;

import com.hospital.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Optional<Medico> findByColegiatura(String colegiatura);
    List<Medico> findByEstado(String estado);
    List<Medico> findByNombresContainingOrApellidosContaining(String nombres, String apellidos);
}
