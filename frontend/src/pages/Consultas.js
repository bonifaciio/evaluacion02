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
} from "@mui/icons-material";
import {
  consultaService,
  pacienteService,
  medicoService,
  citaService,
} from "../services/api";

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingConsulta, setEditingConsulta] = useState(null);
  const [formData, setFormData] = useState({
    fechaConsulta: "",
    motivoConsulta: "",
    observaciones: "",
    idPaciente: "",
    idMedico: "",
    idCita: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [consultasRes, pacientesRes, medicosRes, citasRes] =
        await Promise.all([
          consultaService.getAll(),
          pacienteService.getAll(),
          medicoService.getAll(),
          citaService.getAll(),
        ]);
      setConsultas(consultasRes.data);
      setPacientes(pacientesRes.data);
      setMedicos(medicosRes.data);
      setCitas(citasRes.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (consulta = null) => {
    if (consulta) {
      setEditingConsulta(consulta);
      // Combinar fecha y hora para el input datetime-local
      const fechaHora = consulta.hora
        ? `${consulta.fecha}T${consulta.hora.substring(0, 5)}`
        : consulta.fecha;

      setFormData({
        fechaConsulta: fechaHora,
        motivoConsulta: consulta.motivoConsulta || "",
        observaciones: consulta.observaciones || "",
        idPaciente: consulta.idPaciente || "",
        idMedico: consulta.idMedico || "",
        idCita: consulta.idCita || "",
      });
    } else {
      setEditingConsulta(null);
      const now = new Date();
      const fechaHora = now.toISOString().substring(0, 16); // YYYY-MM-DDTHH:MM
      setFormData({
        fechaConsulta: fechaHora,
        motivoConsulta: "",
        observaciones: "",
        idPaciente: "",
        idMedico: "",
        idCita: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingConsulta(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Dividir fecha y hora del datetime-local
      const [fecha, hora] = formData.fechaConsulta.includes("T")
        ? formData.fechaConsulta.split("T")
        : [formData.fechaConsulta, "00:00"];

      const consultaData = {
        idPaciente: parseInt(formData.idPaciente),
        idMedico: parseInt(formData.idMedico),
        idCita: formData.idCita ? parseInt(formData.idCita) : null,
        fecha: fecha,
        hora: hora,
        motivoConsulta: formData.motivoConsulta,
        observaciones: formData.observaciones,
      };

      if (editingConsulta) {
        await consultaService.update(editingConsulta.idConsulta, consultaData);
      } else {
        await consultaService.create(consultaData);
      }

      handleCloseDialog();
      loadData();
    } catch (err) {
      setError("Error al guardar la consulta");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta consulta?")) {
      try {
        await consultaService.delete(id);
        loadData();
      } catch (err) {
        setError("Error al eliminar la consulta");
        console.error(err);
      }
    }
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
            Gestión de Consultas Médicas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nueva Consulta
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
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultas.map((consulta) => (
                <TableRow key={consulta.idConsulta}>
                  <TableCell>{consulta.idConsulta}</TableCell>
                  <TableCell>
                    {consulta.fecha &&
                      new Date(consulta.fecha + "T00:00:00").toLocaleDateString(
                        "es-ES"
                      )}
                    {consulta.hora && ` ${consulta.hora.substring(0, 5)}`}
                  </TableCell>
                  <TableCell>{consulta.nombrePaciente || "N/A"}</TableCell>
                  <TableCell>
                    {consulta.nombreMedico
                      ? `Dr(a). ${consulta.nombreMedico}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {consulta.motivoConsulta?.substring(0, 50) || "N/A"}
                    {consulta.motivoConsulta?.length > 50 ? "..." : ""}
                  </TableCell>
                  <TableCell>
                    {consulta.observaciones?.substring(0, 50) || "N/A"}
                    {consulta.observaciones?.length > 50 ? "..." : ""}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(consulta)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(consulta.idConsulta)}
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingConsulta ? "Ver/Editar Consulta" : "Nueva Consulta"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="fechaConsulta"
              label="Fecha y Hora de Consulta"
              type="datetime-local"
              value={formData.fechaConsulta}
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
            <FormControl fullWidth>
              <InputLabel>Cita (opcional)</InputLabel>
              <Select
                name="idCita"
                value={formData.idCita}
                onChange={handleChange}
                label="Cita (opcional)"
              >
                <MenuItem value="">Sin cita</MenuItem>
                {citas.map((c) => (
                  <MenuItem key={c.idCita} value={c.idCita}>
                    Cita #{c.idCita} - {c.fecha} {c.hora}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="motivoConsulta"
              label="Motivo de Consulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              name="observaciones"
              label="Observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingConsulta ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Consultas;
