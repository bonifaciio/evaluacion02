package com.hospital.repository;

import com.hospital.entity.Hospitalizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HospitalizacionRepository extends JpaRepository<Hospitalizacion, Long> {
    List<Hospitalizacion> findByPacienteIdPaciente(Long idPaciente);
    List<Hospitalizacion> findByEstado(String estado);
    List<Hospitalizacion> findByHabitacionIdHabitacion(Long idHabitacion);
}
