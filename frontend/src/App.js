import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Citas from "./pages/Citas";
import Medicos from "./pages/Medicos";
import Consultas from "./pages/Consultas";
import Hospitalizaciones from "./pages/Hospitalizaciones";
import Facturas from "./pages/Facturas";
import Usuarios from "./pages/Usuarios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <PrivateRoute
                  roles={[
                    "ROLE_ADMIN",
                    "ROLE_MEDICO",
                    "ROLE_RECEPCIONISTA",
                    "ROLE_ENFERMERA",
                  ]}
                >
                  <Layout>
                    <Pacientes />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <PrivateRoute
                  roles={["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_RECEPCIONISTA"]}
                >
                  <Layout>
                    <Citas />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/medicos"
              element={
                <PrivateRoute roles={["ROLE_ADMIN", "ROLE_RECEPCIONISTA"]}>
                  <Layout>
                    <Medicos />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/consultas"
              element={
                <PrivateRoute roles={["ROLE_ADMIN", "ROLE_MEDICO"]}>
                  <Layout>
                    <Consultas />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hospitalizaciones"
              element={
                <PrivateRoute
                  roles={["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_ENFERMERA"]}
                >
                  <Layout>
                    <Hospitalizaciones />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/facturas"
              element={
                <PrivateRoute roles={["ROLE_ADMIN", "ROLE_RECEPCIONISTA"]}>
                  <Layout>
                    <Facturas />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <PrivateRoute roles={["ROLE_ADMIN"]}>
                  <Layout>
                    <Usuarios />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
