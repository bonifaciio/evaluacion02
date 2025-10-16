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
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { citaService, pacienteService, medicoService } from "../services/api";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    estado: "programada",
    idPaciente: "",
    idMedico: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [citasRes, pacientesRes, medicosRes] = await Promise.all([
        citaService.getAll(),
        pacienteService.getAll(),
        medicoService.getAll(),
      ]);
      setCitas(citasRes.data);
      setPacientes(pacientesRes.data);
      setMedicos(medicosRes.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (cita = null) => {
    if (cita) {
      setEditingCita(cita);
      setFormData({
        fecha: cita.fecha || "",
        hora: cita.hora || "",
        motivo: cita.motivo || "",
        estado: cita.estado || "programada",
        idPaciente: cita.idPaciente || "",
        idMedico: cita.idMedico || "",
      });
    } else {
      setEditingCita(null);
      setFormData({
        fecha: new Date().toISOString().split("T")[0],
        hora: "09:00",
        motivo: "",
        estado: "programada",
        idPaciente: "",
        idMedico: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCita(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const citaData = {
        idPaciente: parseInt(formData.idPaciente),
        idMedico: parseInt(formData.idMedico),
        fecha: formData.fecha,
        hora: formData.hora,
        motivo: formData.motivo,
        estado: formData.estado,
      };

      if (editingCita) {
        await citaService.update(editingCita.idCita, citaData);
      } else {
        await citaService.create(citaData);
      }

      handleCloseDialog();
      loadData();
    } catch (err) {
      setError("Error al guardar la cita");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta cita?")) {
      try {
        await citaService.delete(id);
        loadData();
      } catch (err) {
        setError("Error al eliminar la cita");
        console.error(err);
      }
    }
  };

  const handleChangeEstado = async (id, nuevoEstado) => {
    try {
      await citaService.updateEstado(id, nuevoEstado);
      loadData();
    } catch (err) {
      setError("Error al actualizar el estado");
      console.error(err);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "programada":
        return "info";
      case "confirmada":
        return "success";
      case "atendida":
        return "default";
      case "cancelada":
        return "error";
      default:
        return "default";
    }
  };

  const getPacienteNombre = (paciente) => {
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : "N/A";
  };

  const getMedicoNombre = (medico) => {
    return medico ? `Dr(a). ${medico.nombres} ${medico.apellidos}` : "N/A";
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
            Gestión de Citas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nueva Cita
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
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.idCita}>
                  <TableCell>{cita.idCita}</TableCell>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.nombrePaciente}</TableCell>
                  <TableCell>{cita.nombreMedico}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                  <TableCell>
                    <Chip
                      label={cita.estado}
                      color={getEstadoColor(cita.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(cita)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    {cita.estado === "programada" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeEstado(cita.idCita, "confirmada")
                        }
                        color="success"
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                    {cita.estado !== "cancelada" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeEstado(cita.idCita, "cancelada")
                        }
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(cita.idCita)}
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
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingCita ? "Editar Cita" : "Nueva Cita"}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="fecha"
              label="Fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              name="hora"
              label="Hora"
              type="time"
              value={formData.hora}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
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
            <FormControl fullWidth required>
              <InputLabel>Médico</InputLabel>
              <Select
                name="idMedico"
                value={formData.idMedico}
                onChange={handleChange}
                label="Médico"
              >
                {medicos.map((m) => (
                  <MenuItem key={m.idMedico} value={m.idMedico}>
                    Dr(a). {m.nombres} {m.apellidos}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="motivo"
              label="Motivo de la Cita"
              value={formData.motivo}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                label="Estado"
              >
                <MenuItem value="programada">Programada</MenuItem>
                <MenuItem value="confirmada">Confirmada</MenuItem>
                <MenuItem value="atendida">Atendida</MenuItem>
                <MenuItem value="cancelada">Cancelada</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCita ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Citas;
