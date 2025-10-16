import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import {
  People,
  CalendarToday,
  LocalHospital,
  Receipt,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const StatCard = ({ title, value, icon, color }) => (
  <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      {React.cloneElement(icon, { sx: { fontSize: 48, color } })}
    </Box>
    <Typography variant="h4" gutterBottom>
      {value}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.nombreUsuario}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Rol: {user?.rol}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pacientes"
            value="150"
            icon={<People />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Citas Hoy"
            value="25"
            icon={<CalendarToday />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hospitalizados"
            value="12"
            icon={<LocalHospital />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Facturas Pendientes"
            value="8"
            icon={<Receipt />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Acceso Rápido
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Utiliza el menú lateral para navegar entre los diferentes módulos del
          sistema.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            • <strong>Pacientes:</strong> Gestión de pacientes e historias
            clínicas
          </Typography>
          <Typography variant="body2">
            • <strong>Citas:</strong> Programación y seguimiento de citas
            médicas
          </Typography>
          <Typography variant="body2">
            • <strong>Médicos:</strong> Administración del personal médico
          </Typography>
          <Typography variant="body2">
            • <strong>Consultas:</strong> Registro de atenciones y diagnósticos
          </Typography>
          <Typography variant="body2">
            • <strong>Hospitalizaciones:</strong> Control de pacientes
            internados
          </Typography>
          <Typography variant="body2">
            • <strong>Facturas:</strong> Gestión de facturación y pagos
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
