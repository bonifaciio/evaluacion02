package com.hospital.service;

import com.hospital.entity.Factura;
import com.hospital.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FacturaService {
    
    @Autowired
    private FacturaRepository facturaRepository;
    
    public List<Factura> listarTodas() {
        return facturaRepository.findAll();
    }
    
    public List<Factura> listarPorPaciente(Long idPaciente) {
        return facturaRepository.findByPacienteIdPaciente(idPaciente);
    }
    
    public List<Factura> listarPorEstado(String estado) {
        return facturaRepository.findByEstado(estado);
    }
    
    public Optional<Factura> buscarPorId(Long id) {
        return facturaRepository.findById(id);
    }
    
    public Factura guardar(Factura factura) {
        // Calcular total
        BigDecimal total = factura.getDetalles().stream()
                .map(detalle -> detalle.getMonto())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        factura.setTotal(total);
        
        return facturaRepository.save(factura);
    }
    
    public Factura marcarComoPagado(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
        factura.setEstado("pagado");
        return facturaRepository.save(factura);
    }
    
    public void eliminar(Long id) {
        facturaRepository.deleteById(id);
    }
}
