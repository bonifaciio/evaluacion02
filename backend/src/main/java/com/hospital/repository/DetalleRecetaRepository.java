package com.hospital.repository;

import com.hospital.entity.DetalleReceta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetalleRecetaRepository extends JpaRepository<DetalleReceta, Long> {
    List<DetalleReceta> findByRecetaIdReceta(Long idReceta);
}
