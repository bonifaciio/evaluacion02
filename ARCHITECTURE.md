# 🏗️ Arquitectura del Sistema

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                     http://localhost:3000                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Components │  │    Pages     │  │   Context    │      │
│  │   (Layout,   │  │  (Dashboard, │  │    (Auth)    │      │
│  │  PrivateRoute)│  │  Pacientes)  │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │   API Service   │                        │
│                   │    (Axios)      │                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    REST API (JSON)
                    JWT Authentication
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                  BACKEND (Spring Boot)                        │
│                   http://localhost:8080                       │
├───────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Controllers  │  │   Services   │  │ Repositories │       │
│  │   (REST)     │──│   (Business  │──│    (JPA)     │       │
│  │              │  │    Logic)    │  │              │       │
│  └──────────────┘  └──────────────┘  └──────┬───────┘       │
│                                              │               │
│  ┌──────────────────────────────────────────┐│               │
│  │        Security Layer (JWT)              ││               │
│  │  ┌────────────┐  ┌────────────────────┐ ││               │
│  │  │JwtProvider │  │ AuthenticationFilter│ ││               │
│  │  └────────────┘  └────────────────────┘ ││               │
│  └──────────────────────────────────────────┘│               │
│                                              │               │
│  ┌──────────────────────────────────────────▼───────┐       │
│  │            Entity Models (JPA)                   │       │
│  │  Paciente | Medico | Cita | Consulta | etc.     │       │
│  └──────────────────────────────────────────────────┘       │
└───────────────────────────────┬───────────────────────────────┘
                                │
                         JDBC Connection
                                │
┌───────────────────────────────▼───────────────────────────────┐
│                    MySQL Database                             │
│                     hospital_db                               │
├───────────────────────────────────────────────────────────────┤
│  Tables:                                                      │
│  • paciente              • medico                             │
│  • historia_clinica      • especialidad                       │
│  • antecedente_medico    • medico_especialidad                │
│  • cita                  • consulta                           │
│  • diagnostico           • receta_medica                      │
│  • detalle_receta        • habitacion                         │
│  • hospitalizacion       • factura                            │
│  • detalle_factura       • usuario                            │
│  • bitacora                                                   │
└───────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

### 1. Autenticación

```
Usuario → Frontend (Login) → POST /api/auth/login → Backend
        ← JWT Token ← AuthController ← AuthenticationManager
```

### 2. Operación CRUD (Ejemplo: Crear Paciente)

```
Usuario → Frontend (Form) → POST /api/pacientes → Backend
                                                    ↓
                                            PacienteController
                                                    ↓
                                             PacienteService
                                                    ↓
                                           PacienteRepository
                                                    ↓
                                            MySQL Database
                                                    ↓
                                    Historia Clínica (Auto-creada)
```

## Patrones de Diseño

### Backend

1. **MVC (Model-View-Controller)**

   - Model: Entidades JPA
   - Controller: Controladores REST
   - Service: Lógica de negocio

2. **Repository Pattern**

   - Interfaces JPA Repository
   - Abstracción de acceso a datos

3. **DTO (Data Transfer Object)**

   - LoginRequest, LoginResponse
   - MessageResponse

4. **Dependency Injection**

   - @Autowired en Spring
   - Inversión de control

5. **Filter Chain**
   - JwtAuthenticationFilter
   - Spring Security Filter Chain

### Frontend

1. **Component-Based Architecture**

   - Componentes reutilizables
   - Props y State

2. **Context API**

   - AuthContext para estado global
   - Manejo de autenticación

3. **Protected Routes**

   - PrivateRoute component
   - Control de acceso por roles

4. **Service Layer**
   - Separación de lógica de API
   - Servicios centralizados (api.js)

## Seguridad

### Backend

```
Request → CORS Filter → JWT Filter → Role Check → Controller
```

1. **CORS**: Configuración de orígenes permitidos
2. **JWT**: Validación de tokens
3. **BCrypt**: Encriptación de contraseñas
4. **Role-Based Access**: @PreAuthorize
5. **Bitácora**: Registro de acciones

### Frontend

```
Request → Token Injection → API Call → Error Handling
```

1. **Token Storage**: LocalStorage
2. **Axios Interceptors**: Auto-inyección de tokens
3. **Protected Routes**: Control de navegación
4. **Error Handling**: Redirección en 401

## Base de Datos

### Relaciones Principales

```
Paciente (1) ──── (1) HistoriaClinica
    │                      │
    │                      └── (M) AntecedenteMedico
    │
    ├── (M) Cita ─── (1) Medico
    │      │
    │      └── (1) Consulta
    │             │
    │             ├── (M) Diagnostico
    │             └── (M) RecetaMedica
    │                       └── (M) DetalleReceta
    │
    ├── (M) Hospitalizacion ── (1) Habitacion
    │
    └── (M) Factura
              └── (M) DetalleFactura

Medico (M) ──── (M) Especialidad
     (Tabla intermedia: MedicoEspecialidad)

Usuario (1) ──── (M) Bitacora
```

## Tecnologías por Capa

### Frontend

- **Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API

### Backend

- **Framework**: Spring Boot 3.2
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT
- **Database Driver**: MySQL Connector
- **Build Tool**: Maven

### Database

- **DBMS**: MySQL 8.0
- **Character Set**: utf8mb4
- **Collation**: utf8mb4_unicode_ci

## Puertos y URLs

| Servicio | Puerto | URL                   |
| -------- | ------ | --------------------- |
| Frontend | 3000   | http://localhost:3000 |
| Backend  | 8080   | http://localhost:8080 |
| MySQL    | 3306   | localhost:3306        |

## Variables de Configuración

### Backend (application.properties)

- `server.port`: Puerto del servidor
- `spring.datasource.*`: Configuración de BD
- `jwt.secret`: Clave secreta JWT
- `jwt.expiration`: Tiempo de expiración
- `cors.allowed-origins`: Orígenes permitidos

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Escalabilidad

### Horizontal

- Backend: Múltiples instancias con balanceador
- Frontend: CDN para archivos estáticos
- Database: Replicación master-slave

### Vertical

- Aumentar recursos del servidor
- Optimización de queries
- Caché (Redis en el futuro)

## Monitoreo

### Backend

- Spring Boot Actuator (futuro)
- Logging con Logback
- Bitácora de acciones

### Frontend

- Console logs en desarrollo
- Error boundaries (futuro)

## Mantenibilidad

- **Código modular**: Separación de responsabilidades
- **Convenciones**: Nombres claros y consistentes
- **Documentación**: README y comentarios
- **Testing**: Estructura preparada para tests
