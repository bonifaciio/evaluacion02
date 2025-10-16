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
} from "@mui/icons-material";
import { usuarioService } from "../services/api";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contrasena: "",
    rol: "ROLE_RECEPCIONISTA",
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuarioService.getAll();
      setUsuarios(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (usuario = null) => {
    if (usuario) {
      setEditingUsuario(usuario);
      setFormData({
        nombreUsuario: usuario.nombreUsuario,
        contrasena: "",
        rol: usuario.rol,
      });
    } else {
      setEditingUsuario(null);
      setFormData({
        nombreUsuario: "",
        contrasena: "",
        rol: "ROLE_RECEPCIONISTA",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUsuario(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingUsuario) {
        // Solo enviar contraseña si se está cambiando
        const updateData = {
          nombreUsuario: formData.nombreUsuario,
          rol: formData.rol,
        };
        if (formData.contrasena) {
          updateData.contrasena = formData.contrasena;
        }
        await usuarioService.update(editingUsuario.idUsuario, updateData);
      } else {
        await usuarioService.create(formData);
      }

      handleCloseDialog();
      loadUsuarios();
    } catch (err) {
      setError("Error al guardar el usuario");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        await usuarioService.delete(id);
        loadUsuarios();
      } catch (err) {
        setError("Error al eliminar el usuario");
        console.error(err);
      }
    }
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "error";
      case "ROLE_MEDICO":
        return "primary";
      case "ROLE_ENFERMERA":
        return "success";
      case "ROLE_RECEPCIONISTA":
        return "info";
      default:
        return "default";
    }
  };

  const getRolLabel = (rol) => {
    return rol?.replace("ROLE_", "") || "N/A";
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
            Gestión de Usuarios
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nuevo Usuario
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Alert severity="info" sx={{ mb: 2 }}>
          Total de usuarios: {usuarios.length}
        </Alert>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.idUsuario}>
                  <TableCell>{usuario.idUsuario}</TableCell>
                  <TableCell>{usuario.nombreUsuario}</TableCell>
                  <TableCell>
                    <Chip
                      label={getRolLabel(usuario.rol)}
                      color={getRolColor(usuario.rol)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(usuario)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(usuario.idUsuario)}
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
        <DialogTitle>
          {editingUsuario ? "Editar Usuario" : "Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="nombreUsuario"
              label="Nombre de Usuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              fullWidth
              required
              disabled={editingUsuario !== null}
              helperText={
                editingUsuario ? "El nombre de usuario no se puede cambiar" : ""
              }
            />
            <TextField
              name="contrasena"
              label={
                editingUsuario
                  ? "Nueva Contraseña (dejar vacío para no cambiar)"
                  : "Contraseña"
              }
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              fullWidth
              required={!editingUsuario}
            />
            <FormControl fullWidth required>
              <InputLabel>Rol</InputLabel>
              <Select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                label="Rol"
              >
                <MenuItem value="ROLE_ADMIN">Administrador</MenuItem>
                <MenuItem value="ROLE_MEDICO">Médico</MenuItem>
                <MenuItem value="ROLE_ENFERMERA">Enfermera</MenuItem>
                <MenuItem value="ROLE_RECEPCIONISTA">Recepcionista</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUsuario ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Usuarios;
