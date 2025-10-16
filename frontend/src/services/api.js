import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Servicio de autenticación
export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getCurrentUser: () => JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: () => !!localStorage.getItem("token"),
};

// Servicio de pacientes
export const pacienteService = {
  getAll: () => api.get("/pacientes"),
  getById: (id) => api.get(`/pacientes/${id}`),
  getActivos: () => api.get("/pacientes/activos"),
  create: (data) => api.post("/pacientes", data),
  update: (id, data) => api.put(`/pacientes/${id}`, data),
  delete: (id) => api.delete(`/pacientes/${id}`),
  desactivar: (id) => api.patch(`/pacientes/${id}/desactivar`),
};

// Servicio de citas
export const citaService = {
  getAll: () => api.get("/citas"),
  getById: (id) => api.get(`/citas/${id}`),
  getByPaciente: (idPaciente) => api.get(`/citas/paciente/${idPaciente}`),
  getByMedico: (idMedico) => api.get(`/citas/medico/${idMedico}`),
  create: (data) => api.post("/citas", data),
  update: (id, data) => api.put(`/citas/${id}`, data),
  cambiarEstado: (id, estado) =>
    api.patch(`/citas/${id}/estado?estado=${estado}`),
  delete: (id) => api.delete(`/citas/${id}`),
};

// Servicio de médicos
export const medicoService = {
  getAll: () => api.get("/medicos"),
  getById: (id) => api.get(`/medicos/${id}`),
  getActivos: () => api.get("/medicos/activos"),
  create: (data) => api.post("/medicos", data),
  update: (id, data) => api.put(`/medicos/${id}`, data),
  delete: (id) => api.delete(`/medicos/${id}`),
  desactivar: (id) => api.patch(`/medicos/${id}/desactivar`),
};

// Servicio de consultas
export const consultaService = {
  getAll: () => api.get("/consultas"),
  getById: (id) => api.get(`/consultas/${id}`),
  getByPaciente: (idPaciente) => api.get(`/consultas/paciente/${idPaciente}`),
  getByMedico: (idMedico) => api.get(`/consultas/medico/${idMedico}`),
  create: (data) => api.post("/consultas", data),
  update: (id, data) => api.put(`/consultas/${id}`, data),
  delete: (id) => api.delete(`/consultas/${id}`),
};

// Servicio de hospitalizaciones
export const hospitalizacionService = {
  getAll: () => api.get("/hospitalizaciones"),
  getById: (id) => api.get(`/hospitalizaciones/${id}`),
  getActivas: () => api.get("/hospitalizaciones/activas"),
  getByPaciente: (idPaciente) =>
    api.get(`/hospitalizaciones/paciente/${idPaciente}`),
  create: (data) => api.post("/hospitalizaciones", data),
  darAlta: (id) => api.patch(`/hospitalizaciones/${id}/alta`),
  delete: (id) => api.delete(`/hospitalizaciones/${id}`),
};

// Servicio de facturas
export const facturaService = {
  getAll: () => api.get("/facturas"),
  getById: (id) => api.get(`/facturas/${id}`),
  getByPaciente: (idPaciente) => api.get(`/facturas/paciente/${idPaciente}`),
  getByEstado: (estado) => api.get(`/facturas/estado/${estado}`),
  create: (data) => api.post("/facturas", data),
  marcarComoPagado: (id) => api.patch(`/facturas/${id}/pagar`),
  delete: (id) => api.delete(`/facturas/${id}`),
};

// Servicio de usuarios
export const usuarioService = {
  getAll: () => api.get("/admin/usuarios"),
  getById: (id) => api.get(`/admin/usuarios/${id}`),
  create: (data) => api.post("/admin/usuarios", data),
  update: (id, data) => api.put(`/admin/usuarios/${id}`, data),
  delete: (id) => api.delete(`/admin/usuarios/${id}`),
};

export default api;
