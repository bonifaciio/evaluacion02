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
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { pacienteService } from "../services/api";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "M",
    direccion: "",
    telefono: "",
    correo: "",
    estado: "activo",
  });

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const response = await pacienteService.getAll();
      setPacientes(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar pacientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (paciente = null) => {
    if (paciente) {
      setCurrentPaciente(paciente);
      setFormData(paciente);
    } else {
      setCurrentPaciente(null);
      setFormData({
        dni: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        sexo: "M",
        direccion: "",
        telefono: "",
        correo: "",
        estado: "activo",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPaciente(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPaciente) {
        await pacienteService.update(currentPaciente.idPaciente, formData);
      } else {
        await pacienteService.create(formData);
      }
      loadPacientes();
      handleCloseDialog();
      setError("");
    } catch (err) {
      setError("Error al guardar paciente");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este paciente?")) {
      try {
        await pacienteService.delete(id);
        loadPacientes();
        setError("");
      } catch (err) {
        setError("Error al eliminar paciente");
        console.error(err);
      }
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Gestión de Pacientes</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Paciente
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Fecha Nac.</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.idPaciente}>
                <TableCell>{paciente.dni}</TableCell>
                <TableCell>{paciente.nombres}</TableCell>
                <TableCell>{paciente.apellidos}</TableCell>
                <TableCell>{paciente.fechaNacimiento}</TableCell>
                <TableCell>{paciente.telefono}</TableCell>
                <TableCell>{paciente.estado}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(paciente)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(paciente.idPaciente)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentPaciente ? "Editar Paciente" : "Nuevo Paciente"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Sexo"
              name="sexo"
              select
              SelectProps={{ native: true }}
              value={formData.sexo}
              onChange={handleChange}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Pacientes;
