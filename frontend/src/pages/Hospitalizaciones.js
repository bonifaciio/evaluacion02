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
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { hospitalizacionService, pacienteService } from "../services/api";

const Hospitalizaciones = () => {
  const [hospitalizaciones, setHospitalizaciones] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHospitalizacion, setEditingHospitalizacion] = useState(null);
  const [formData, setFormData] = useState({
    fechaIngreso: "",
    fechaAlta: "",
    diagnosticoIngreso: "",
    estado: "activo",
    numeroHabitacion: "",
    idPaciente: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [hospitalizacionesRes, pacientesRes] = await Promise.all([
        hospitalizacionService.getAll(),
        pacienteService.getAll(),
      ]);
      setHospitalizaciones(hospitalizacionesRes.data);
      setPacientes(pacientesRes.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (hospitalizacion = null) => {
    if (hospitalizacion) {
      setEditingHospitalizacion(hospitalizacion);
      setFormData({
        fechaIngreso: hospitalizacion.fechaIngreso || "",
        fechaAlta: hospitalizacion.fechaAlta || "",
        diagnosticoIngreso: hospitalizacion.diagnosticoIngreso || "",
        estado: hospitalizacion.estado || "activo",
        numeroHabitacion: hospitalizacion.numeroHabitacion || "",
        idPaciente: hospitalizacion.idPaciente || "",
      });
    } else {
      setEditingHospitalizacion(null);
      setFormData({
        fechaIngreso: new Date().toISOString().split("T")[0],
        fechaAlta: "",
        diagnosticoIngreso: "",
        estado: "activo",
        numeroHabitacion: "",
        idPaciente: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHospitalizacion(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const hospitalizacionData = {
        idPaciente: parseInt(formData.idPaciente),
        numeroHabitacion: formData.numeroHabitacion || null,
        fechaIngreso: formData.fechaIngreso,
        fechaAlta: formData.fechaAlta || null,
        diagnosticoIngreso: formData.diagnosticoIngreso,
        estado: formData.estado,
      };

      if (editingHospitalizacion) {
        await hospitalizacionService.update(
          editingHospitalizacion.idHosp,
          hospitalizacionData
        );
      } else {
        await hospitalizacionService.create(hospitalizacionData);
      }

      handleCloseDialog();
      loadData();
    } catch (err) {
      setError("Error al guardar la hospitalización");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta hospitalización?")) {
      try {
        await hospitalizacionService.delete(id);
        loadData();
      } catch (err) {
        setError("Error al eliminar la hospitalización");
        console.error(err);
      }
    }
  };

  const handleAlta = async (id) => {
    if (window.confirm("¿Dar de alta a este paciente?")) {
      try {
        await hospitalizacionService.darAlta(id);
        loadData();
      } catch (err) {
        setError("Error al dar de alta");
        console.error(err);
      }
    }
  };

  const getEstadoColor = (estado) => {
    return estado === "activo" ? "success" : "default";
  };

  const calcularDias = (fechaIngreso, fechaAlta) => {
    const ingreso = new Date(fechaIngreso);
    const alta = fechaAlta ? new Date(fechaAlta) : new Date();
    const diff = Math.ceil((alta - ingreso) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
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
            Gestión de Hospitalizaciones
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nueva Hospitalización
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
                <TableCell>Paciente</TableCell>
                <TableCell>Habitación</TableCell>
                <TableCell>Fecha Ingreso</TableCell>
                <TableCell>Fecha Alta</TableCell>
                <TableCell>Días</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitalizaciones.map((hosp) => (
                <TableRow key={hosp.idHosp}>
                  <TableCell>{hosp.idHosp}</TableCell>
                  <TableCell>{hosp.nombrePaciente || "N/A"}</TableCell>
                  <TableCell>{hosp.numeroHabitacion || "N/A"}</TableCell>
                  <TableCell>
                    {hosp.fechaIngreso &&
                      new Date(
                        hosp.fechaIngreso + "T00:00:00"
                      ).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    {hosp.fechaAlta
                      ? new Date(
                          hosp.fechaAlta + "T00:00:00"
                        ).toLocaleDateString("es-ES")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {calcularDias(hosp.fechaIngreso, hosp.fechaAlta)} días
                  </TableCell>
                  <TableCell>
                    {hosp.diagnosticoIngreso?.substring(0, 30) || "N/A"}
                    {hosp.diagnosticoIngreso?.length > 30 ? "..." : ""}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={hosp.estado === "activo" ? "Activo" : "Alta"}
                      color={getEstadoColor(hosp.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(hosp)}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                    {hosp.estado === "activo" && (
                      <IconButton
                        size="small"
                        onClick={() => handleAlta(hosp.idHosp)}
                        color="success"
                        title="Dar de alta"
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(hosp.idHosp)}
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
          {editingHospitalizacion
            ? "Ver/Editar Hospitalización"
            : "Nueva Hospitalización"}
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
                name="fechaIngreso"
                label="Fecha de Ingreso"
                type="date"
                value={formData.fechaIngreso}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                name="fechaAlta"
                label="Fecha de Alta"
                type="date"
                value={formData.fechaAlta}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              name="numeroHabitacion"
              label="Número de Habitación (ej: 101, 202)"
              value={formData.numeroHabitacion}
              onChange={handleChange}
              fullWidth
              placeholder="101"
            />
            <TextField
              name="diagnosticoIngreso"
              label="Diagnóstico de Ingreso"
              value={formData.diagnosticoIngreso}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
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
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="dado_de_alta">Alta</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingHospitalizacion ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Hospitalizaciones;
