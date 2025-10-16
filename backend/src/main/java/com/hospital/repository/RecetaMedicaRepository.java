package com.hospital.repository;

import com.hospital.entity.RecetaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecetaMedicaRepository extends JpaRepository<RecetaMedica, Long> {
    List<RecetaMedica> findByConsultaIdConsulta(Long idConsulta);
}
