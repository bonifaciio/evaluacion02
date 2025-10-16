import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Chip,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { facturaService, pacienteService } from "../services/api";

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFactura, setEditingFactura] = useState(null);
  const [formData, setFormData] = useState({
    fechaEmision: "",
    fechaVencimiento: "",
    subtotal: 0,
    igv: 0,
    total: 0,
    estado: "PENDIENTE",
    metodoPago: "",
    idPaciente: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [facturasRes, pacientesRes] = await Promise.all([
        facturaService.getAll(),
        pacienteService.getAll(),
      ]);
      setFacturas(facturasRes.data);
      setPacientes(pacientesRes.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (factura = null) => {
    if (factura) {
      setEditingFactura(factura);
      setFormData({
        fechaEmision: factura.fechaEmision,
        fechaVencimiento: factura.fechaVencimiento,
        subtotal: factura.subtotal,
        igv: factura.igv,
        total: factura.total,
        estado: factura.estado,
        metodoPago: factura.metodoPago || "",
        idPaciente: factura.paciente?.idPaciente || "",
      });
    } else {
      const today = new Date().toISOString().split("T")[0];
      const vencimiento = new Date();
      vencimiento.setDate(vencimiento.getDate() + 30);

      setEditingFactura(null);
      setFormData({
        fechaEmision: today,
        fechaVencimiento: vencimiento.toISOString().split("T")[0],
        subtotal: 0,
        igv: 0,
        total: 0,
        estado: "PENDIENTE",
        metodoPago: "",
        idPaciente: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFactura(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };

    // Calcular IGV y total automáticamente
    if (name === "subtotal") {
      const subtotal = parseFloat(value) || 0;
      const igv = subtotal * 0.18;
      const total = subtotal + igv;
      newFormData.igv = igv.toFixed(2);
      newFormData.total = total.toFixed(2);
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    try {
      const facturaData = {
        ...formData,
        paciente: { idPaciente: formData.idPaciente },
      };

      if (editingFactura) {
        await facturaService.update(editingFactura.idFactura, facturaData);
      } else {
        await facturaService.create(facturaData);
      }

      handleCloseDialog();
      loadData();
    } catch (err) {
      setError("Error al guardar la factura");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta factura?")) {
      try {
        await facturaService.delete(id);
        loadData();
      } catch (err) {
        setError("Error al eliminar la factura");
        console.error(err);
      }
    }
  };

  const handlePagar = async (id, metodoPago) => {
    if (window.confirm("¿Marcar esta factura como pagada?")) {
      try {
        await facturaService.pagar(id, metodoPago || "EFECTIVO");
        loadData();
      } catch (err) {
        setError("Error al procesar el pago");
        console.error(err);
      }
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "warning";
      case "PAGADA":
        return "success";
      case "VENCIDA":
        return "error";
      case "ANULADA":
        return "default";
      default:
        return "default";
    }
  };

  const getPacienteNombre = (paciente) => {
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : "N/A";
  };

  if (loading)
    return (
      <Container>
        <Typography>Cargando...</Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" component="h1">
            Gestión de Facturas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nueva Factura
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N° Factura</TableCell>
                <TableCell>Fecha Emisión</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>IGV (18%)</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Método Pago</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow key={factura.idFactura}>
                  <TableCell>
                    {String(factura.idFactura).padStart(6, "0")}
                  </TableCell>
                  <TableCell>{factura.fechaEmision}</TableCell>
                  <TableCell>{getPacienteNombre(factura.paciente)}</TableCell>
                  <TableCell>
                    S/ {Number(factura.subtotal).toFixed(2)}
                  </TableCell>
                  <TableCell>S/ {Number(factura.igv).toFixed(2)}</TableCell>
                  <TableCell>
                    <strong>S/ {Number(factura.total).toFixed(2)}</strong>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={factura.estado}
                      color={getEstadoColor(factura.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{factura.metodoPago || "-"}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(factura)}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                    {factura.estado === "PENDIENTE" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handlePagar(factura.idFactura, "EFECTIVO")
                        }
                        color="success"
                        title="Pagar"
                      >
                        <PaymentIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(factura.idFactura)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Paper sx={{ p: 2, bgcolor: "warning.light" }}>
            <Typography variant="subtitle2">Pendiente</Typography>
            <Typography variant="h6">
              S/{" "}
              {facturas
                .filter((f) => f.estado === "PENDIENTE")
                .reduce((sum, f) => sum + Number(f.total), 0)
                .toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: "success.light" }}>
            <Typography variant="subtitle2">Pagado</Typography>
            <Typography variant="h6">
              S/{" "}
              {facturas
                .filter((f) => f.estado === "PAGADA")
                .reduce((sum, f) => sum + Number(f.total), 0)
                .toFixed(2)}
            </Typography>
          </Paper>
        </Box>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingFactura ? "Ver/Editar Factura" : "Nueva Factura"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Paciente</InputLabel>
              <Select
                name="idPaciente"
                value={formData.idPaciente}
                onChange={handleChange}
                label="Paciente"
              >
                {pacientes.map((p) => (
                  <MenuItem key={p.idPaciente} value={p.idPaciente}>
                    {p.nombres} {p.apellidos} - DNI: {p.dni}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" gap={2}>
              <TextField
                name="fechaEmision"
                label="Fecha Emisión"
                type="date"
                value={formData.fechaEmision}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                name="fechaVencimiento"
                label="Fecha Vencimiento"
                type="date"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            <TextField
              name="subtotal"
              label="Subtotal (S/)"
              type="number"
              value={formData.subtotal}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: "0.01", min: "0" }}
            />
            <TextField
              name="igv"
              label="IGV 18% (S/)"
              type="number"
              value={formData.igv}
              fullWidth
              disabled
              InputProps={{ readOnly: true }}
            />
            <TextField
              name="total"
              label="Total (S/)"
              type="number"
              value={formData.total}
              fullWidth
              disabled
              InputProps={{ readOnly: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                label="Estado"
              >
                <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                <MenuItem value="PAGADA">Pagada</MenuItem>
                <MenuItem value="VENCIDA">Vencida</MenuItem>
                <MenuItem value="ANULADA">Anulada</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Método de Pago</InputLabel>
              <Select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                label="Método de Pago"
              >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="EFECTIVO">Efectivo</MenuItem>
                <MenuItem value="TARJETA">Tarjeta</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
                <MenuItem value="SEGURO">Seguro</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingFactura ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Facturas;
