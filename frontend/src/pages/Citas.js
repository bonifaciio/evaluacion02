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
    fechaCita: "",
    horaCita: "",
    motivo: "",
    estado: "PROGRAMADA",
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
        fechaCita: cita.fechaCita,
        horaCita: cita.horaCita,
        motivo: cita.motivo,
        estado: cita.estado,
        idPaciente: cita.paciente?.idPaciente || "",
        idMedico: cita.medico?.idMedico || "",
      });
    } else {
      setEditingCita(null);
      setFormData({
        fechaCita: new Date().toISOString().split("T")[0],
        horaCita: "09:00",
        motivo: "",
        estado: "PROGRAMADA",
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
        ...formData,
        paciente: { idPaciente: formData.idPaciente },
        medico: { idMedico: formData.idMedico },
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
    switch (estado) {
      case "PROGRAMADA":
        return "info";
      case "CONFIRMADA":
        return "success";
      case "ATENDIDA":
        return "default";
      case "CANCELADA":
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
                  <TableCell>{cita.fechaCita}</TableCell>
                  <TableCell>{cita.horaCita}</TableCell>
                  <TableCell>{getPacienteNombre(cita.paciente)}</TableCell>
                  <TableCell>{getMedicoNombre(cita.medico)}</TableCell>
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
                    {cita.estado === "PROGRAMADA" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeEstado(cita.idCita, "CONFIRMADA")
                        }
                        color="success"
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                    {cita.estado !== "CANCELADA" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeEstado(cita.idCita, "CANCELADA")
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
              name="fechaCita"
              label="Fecha"
              type="date"
              value={formData.fechaCita}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              name="horaCita"
              label="Hora"
              type="time"
              value={formData.horaCita}
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
                <MenuItem value="PROGRAMADA">Programada</MenuItem>
                <MenuItem value="CONFIRMADA">Confirmada</MenuItem>
                <MenuItem value="ATENDIDA">Atendida</MenuItem>
                <MenuItem value="CANCELADA">Cancelada</MenuItem>
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
