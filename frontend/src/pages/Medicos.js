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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { medicoService } from "../services/api";

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMedico, setEditingMedico] = useState(null);
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    especialidad: "",
    telefono: "",
    email: "",
    numeroLicencia: "",
    estado: "ACTIVO",
  });

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      setLoading(true);
      const response = await medicoService.getAll();
      setMedicos(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los médicos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (medico = null) => {
    if (medico) {
      setEditingMedico(medico);
      setFormData({
        dni: medico.dni,
        nombres: medico.nombres,
        apellidos: medico.apellidos,
        especialidad: medico.especialidad,
        telefono: medico.telefono,
        email: medico.email,
        numeroLicencia: medico.numeroLicencia,
        estado: medico.estado,
      });
    } else {
      setEditingMedico(null);
      setFormData({
        dni: "",
        nombres: "",
        apellidos: "",
        especialidad: "",
        telefono: "",
        email: "",
        numeroLicencia: "",
        estado: "ACTIVO",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMedico(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingMedico) {
        await medicoService.update(editingMedico.idMedico, formData);
      } else {
        await medicoService.create(formData);
      }

      handleCloseDialog();
      loadMedicos();
    } catch (err) {
      setError("Error al guardar el médico");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este médico?")) {
      try {
        await medicoService.delete(id);
        loadMedicos();
      } catch (err) {
        setError("Error al eliminar el médico");
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
            Gestión de Médicos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nuevo Médico
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
                <TableCell>DNI</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Licencia</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicos.map((medico) => (
                <TableRow key={medico.idMedico}>
                  <TableCell>{medico.idMedico}</TableCell>
                  <TableCell>{medico.dni}</TableCell>
                  <TableCell>{medico.nombres}</TableCell>
                  <TableCell>{medico.apellidos}</TableCell>
                  <TableCell>{medico.especialidad}</TableCell>
                  <TableCell>{medico.numeroLicencia}</TableCell>
                  <TableCell>{medico.telefono}</TableCell>
                  <TableCell>{medico.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={medico.estado}
                      color={medico.estado === "ACTIVO" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(medico)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(medico.idMedico)}
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
          {editingMedico ? "Editar Médico" : "Nuevo Médico"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box display="flex" gap={2}>
              <TextField
                name="dni"
                label="DNI"
                value={formData.dni}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="numeroLicencia"
                label="Número de Licencia"
                value={formData.numeroLicencia}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <Box display="flex" gap={2}>
              <TextField
                name="nombres"
                label="Nombres"
                value={formData.nombres}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="apellidos"
                label="Apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <TextField
              name="especialidad"
              label="Especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              fullWidth
              required
            />
            <Box display="flex" gap={2}>
              <TextField
                name="telefono"
                label="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <TextField
              name="estado"
              label="Estado"
              select
              value={formData.estado}
              onChange={handleChange}
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="ACTIVO">Activo</option>
              <option value="INACTIVO">Inactivo</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMedico ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Medicos;
