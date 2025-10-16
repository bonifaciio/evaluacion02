# Sistema de Gestión Hospitalaria - Frontend

Frontend del Sistema de Gestión Hospitalaria desarrollado con React.

## Tecnologías

- React 18
- Material-UI (MUI)
- React Router
- Axios
- Context API

## Requisitos Previos

- Node.js 16 o superior
- npm o yarn

## Instalación

```bash
cd frontend
npm install
```

## Ejecutar en Desarrollo

```bash
npm start
```

La aplicación se ejecutará en `http://localhost:3000`

## Build para Producción

```bash
npm run build
```

## Características

- ✅ Autenticación JWT
- ✅ Gestión de roles y permisos
- ✅ Interfaz responsiva con Material-UI
- ✅ Módulo de Pacientes (CRUD completo)
- ✅ Dashboard con estadísticas
- ✅ Navegación protegida por roles
- ✅ Menú lateral dinámico

## Módulos Disponibles

1. **Dashboard**: Panel principal con estadísticas
2. **Pacientes**: Gestión completa de pacientes
3. **Citas**: Programación de citas médicas
4. **Médicos**: Administración del personal médico
5. **Consultas**: Registro de atenciones
6. **Hospitalizaciones**: Control de internados
7. **Facturas**: Gestión de facturación
8. **Usuarios**: Administración de usuarios (solo Admin)

## Credenciales de Prueba

- **Administrador**: admin / password123
- **Médico**: dr.garcia / password123
- **Recepcionista**: recepcion1 / password123
- **Enfermera**: enfermera1 / password123

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js
│   │   └── PrivateRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   └── Pacientes.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Conexión con Backend

El frontend se conecta al backend en `http://localhost:8080/api`

Asegúrate de que el backend esté corriendo antes de iniciar el frontend.
