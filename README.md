# 🏥 Sistema de Gestión Hospitalaria

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Material-UI](https://img.shields.io/badge/Material--UI-5-blue?style=for-the-badge&logo=mui)

Sistema integral de gestión hospitalaria desarrollado con **Spring Boot** (backend) y **React** (frontend)

[Inicio Rápido](./QUICKSTART.md) • [API Docs](./API_DOCUMENTATION.md) • [Arquitectura](./ARCHITECTURE.md)

</div>

---

## 🏥 Descripción

Sistema completo para la administración de hospitales que incluye:

- ✅ Gestión de pacientes e historias clínicas
- ✅ Programación de citas médicas
- ✅ Administración de médicos y especialidades
- ✅ Registro de consultas y diagnósticos
- ✅ Control de hospitalizaciones
- ✅ Sistema de facturación
- ✅ Módulo de seguridad con JWT
- ✅ Gestión de usuarios y roles
- ✅ Bitácora de acciones

## 🏗️ Arquitectura

```
evaluacion02/
├── backend/          # API REST Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/hospital/
│   │       │   ├── entity/         # Entidades JPA
│   │       │   ├── repository/     # Repositorios
│   │       │   ├── service/        # Servicios
│   │       │   ├── controller/     # Controladores REST
│   │       │   ├── security/       # JWT y Seguridad
│   │       │   ├── dto/            # DTOs
│   │       │   └── config/         # Configuración
│   │       └── resources/
│   │           ├── application.properties
│   │           └── data.sql        # Datos iniciales
│   └── pom.xml
│
├── frontend/         # React + Material-UI
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas
│   │   ├── services/      # API services
│   │   ├── context/       # Context API
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🛠️ Tecnologías

### Backend

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT (JSON Web Tokens)
- MySQL 8.0
- Maven
- Lombok

### Frontend

- React 18
- Material-UI (MUI)
- React Router v6
- Axios
- Context API

## � Instalación y Configuración

### Opción 1: Docker (Recomendado) 🐳

La forma más rápida de ejecutar el sistema completo:

```bash
# Dar permisos y ejecutar
chmod +x docker-start.sh
./docker-start.sh
```

¡Eso es todo! El sistema estará disponible en:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- MySQL: localhost:3306

📖 [Ver Guía Completa de Docker](DOCKER_GUIDE.md)

### Opción 2: Instalación Manual

#### Requisitos Previos

- Java 17 o superior
- Maven 3.6+
- Node.js 18+ y npm
- MySQL 8.0+ (o usar Docker solo para MySQL)
- Git

## 🚀 Instalación y Configuración

### 1. Configurar Base de Datos

```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE hospital_db;
exit
```

### 2. Configurar Backend

```bash
cd backend

# Editar application.properties si es necesario
# Cambiar usuario/contraseña de MySQL

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

El backend se ejecutará en `http://localhost:8080`

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

El frontend se ejecutará en `http://localhost:3000`

## 👥 Usuarios de Prueba

| Usuario    | Contraseña  | Rol           |
| ---------- | ----------- | ------------- |
| admin      | password123 | Administrador |
| dr.garcia  | password123 | Médico        |
| recepcion1 | password123 | Recepcionista |
| enfermera1 | password123 | Enfermera     |

## 📊 Modelo de Datos

El sistema implementa las siguientes entidades principales:

1. **Paciente**: Información personal y médica
2. **HistoriaClinica**: Expediente médico del paciente
3. **AntecedenteMedico**: Alergias, enfermedades previas
4. **Medico**: Personal médico del hospital
5. **Especialidad**: Áreas médicas
6. **Cita**: Programación de atenciones
7. **Consulta**: Registro de atenciones médicas
8. **Diagnostico**: Diagnósticos médicos
9. **RecetaMedica**: Prescripciones
10. **Hospitalizacion**: Control de internados
11. **Habitacion**: Camas y espacios
12. **Factura**: Sistema de facturación
13. **Usuario**: Gestión de accesos
14. **Bitacora**: Auditoría del sistema

## 🔒 Roles y Permisos

### Administrador

- Acceso completo al sistema
- Gestión de usuarios
- Todas las operaciones CRUD

### Médico

- Ver y gestionar consultas
- Ver pacientes
- Ver y actualizar citas
- Registrar diagnósticos y recetas
- Gestionar hospitalizaciones

### Recepcionista

- Gestionar pacientes
- Gestionar citas
- Gestionar facturas
- Ver médicos

### Enfermera

- Ver pacientes
- Ver y gestionar hospitalizaciones

## 📡 API Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Pacientes

- `GET /api/pacientes` - Listar todos
- `GET /api/pacientes/{id}` - Buscar por ID
- `POST /api/pacientes` - Crear
- `PUT /api/pacientes/{id}` - Actualizar
- `DELETE /api/pacientes/{id}` - Eliminar

### Citas

- `GET /api/citas` - Listar todas
- `GET /api/citas/paciente/{id}` - Por paciente
- `GET /api/citas/medico/{id}` - Por médico
- `POST /api/citas` - Crear
- `PUT /api/citas/{id}` - Actualizar
- `PATCH /api/citas/{id}/estado` - Cambiar estado

### Médicos

- `GET /api/medicos` - Listar todos
- `POST /api/medicos` - Crear
- `PUT /api/medicos/{id}` - Actualizar

### Consultas

- `GET /api/consultas` - Listar todas
- `POST /api/consultas` - Crear

### Hospitalizaciones

- `GET /api/hospitalizaciones` - Listar todas
- `POST /api/hospitalizaciones` - Crear
- `PATCH /api/hospitalizaciones/{id}/alta` - Dar de alta

### Facturas

- `GET /api/facturas` - Listar todas
- `POST /api/facturas` - Crear
- `PATCH /api/facturas/{id}/pagar` - Marcar como pagado

## 🎯 Características Principales

### Módulo de Pacientes (RF1-RF3)

- ✅ CRUD completo de pacientes
- ✅ Generación automática de historia clínica
- ✅ Registro de antecedentes médicos

### Módulo de Citas (RF4-RF6)

- ✅ Agendar citas con médico y especialidad
- ✅ Reprogramar y cancelar citas
- ✅ Control de estados

### Módulo de Médicos (RF7-RF9)

- ✅ Gestión de médicos
- ✅ Asociación con especialidades (N:N)
- ✅ Control de disponibilidad

### Módulo de Consultas (RF10-RF12)

- ✅ Registro de consultas médicas
- ✅ Generación de diagnósticos
- ✅ Emisión de recetas médicas

### Módulo de Hospitalización (RF13-RF15)

- ✅ Asignación de habitaciones
- ✅ Control de estados de habitaciones
- ✅ Registro de ingresos y altas

### Módulo de Facturación (RF16-RF18)

- ✅ Generación de facturas
- ✅ Detalle de servicios
- ✅ Control de pagos

### Administración y Seguridad (RF19-RF21)

- ✅ Gestión de usuarios y roles
- ✅ Bitácora de acciones
- ✅ Control de acceso por rol

## 📝 Requerimientos No Funcionales

- **RNF1-RNF3**: Seguridad con JWT, encriptación BCrypt, bitácora
- **RNF4-RNF5**: Alta disponibilidad y recuperación
- **RNF6-RNF7**: Rendimiento optimizado, concurrencia
- **RNF8-RNF9**: Interfaz intuitiva en español
- **RNF10-RNF12**: Arquitectura modular y escalable

## 🐛 Solución de Problemas

### Error de conexión a MySQL

```properties
# Verificar credenciales en application.properties
spring.datasource.username=root
spring.datasource.password=tu_contraseña
```

### Error CORS

```properties
# Verificar configuración en application.properties
cors.allowed-origins=http://localhost:3000
```

### Error JWT

```properties
# Verificar secret key en application.properties
jwt.secret=tu_clave_secreta
```

## 📖 Documentación Adicional

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 👨‍💻 Desarrollo

Para agregar nuevos módulos:

1. Crear entidad JPA en `backend/src/main/java/com/hospital/entity/`
2. Crear repositorio en `backend/src/main/java/com/hospital/repository/`
3. Crear servicio en `backend/src/main/java/com/hospital/service/`
4. Crear controlador en `backend/src/main/java/com/hospital/controller/`
5. Crear página en `frontend/src/pages/`
6. Agregar rutas en `frontend/src/App.js`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## ✨ Autor

Rafael Chuco

---

**¡Sistema listo para usar!** 🚀
