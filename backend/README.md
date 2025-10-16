# Sistema de Gestión Hospitalaria - Backend

Backend del Sistema de Gestión Hospitalaria desarrollado con Spring Boot.

## Tecnologías

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security + JWT
- MySQL
- Maven
- Lombok

## Requisitos Previos

- JDK 17 o superior
- Maven 3.6 o superior
- MySQL 8.0 o superior

## Configuración

1. Crear base de datos MySQL:

```bash
mysql -u root -p
CREATE DATABASE hospital_db;
```

2. Configurar credenciales en `application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=tu_contraseña
```

## Ejecutar la Aplicación

```bash
# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

La aplicación se ejecutará en `http://localhost:8080`

## Endpoints API

### Autenticación

- POST `/api/auth/login` - Iniciar sesión
- POST `/api/auth/register` - Registrar usuario

### Pacientes

- GET `/api/pacientes` - Listar todos
- GET `/api/pacientes/{id}` - Buscar por ID
- POST `/api/pacientes` - Crear paciente
- PUT `/api/pacientes/{id}` - Actualizar paciente
- DELETE `/api/pacientes/{id}` - Eliminar paciente

### Citas

- GET `/api/citas` - Listar todas
- GET `/api/citas/paciente/{idPaciente}` - Citas de un paciente
- GET `/api/citas/medico/{idMedico}` - Citas de un médico
- POST `/api/citas` - Crear cita
- PUT `/api/citas/{id}` - Actualizar cita
- PATCH `/api/citas/{id}/estado` - Cambiar estado

### Médicos

- GET `/api/medicos` - Listar todos
- GET `/api/medicos/{id}` - Buscar por ID
- POST `/api/medicos` - Crear médico
- PUT `/api/medicos/{id}` - Actualizar médico

### Consultas

- GET `/api/consultas` - Listar todas
- GET `/api/consultas/paciente/{idPaciente}` - Consultas de un paciente
- POST `/api/consultas` - Crear consulta

### Hospitalizaciones

- GET `/api/hospitalizaciones` - Listar todas
- GET `/api/hospitalizaciones/activas` - Listar activas
- POST `/api/hospitalizaciones` - Crear hospitalización
- PATCH `/api/hospitalizaciones/{id}/alta` - Dar de alta

### Facturas

- GET `/api/facturas` - Listar todas
- GET `/api/facturas/paciente/{idPaciente}` - Facturas de un paciente
- POST `/api/facturas` - Crear factura
- PATCH `/api/facturas/{id}/pagar` - Marcar como pagado

### Usuarios (Admin)

- GET `/api/admin/usuarios` - Listar usuarios
- POST `/api/admin/usuarios` - Crear usuario
- PUT `/api/admin/usuarios/{id}` - Actualizar usuario

## Datos de Prueba

Usuario: `admin`
Contraseña: `password123`

Usuario: `dr.garcia`
Contraseña: `password123`

## Roles de Usuario

- **ADMIN**: Acceso completo
- **MEDICO**: Consultas, diagnósticos, recetas
- **RECEPCIONISTA**: Pacientes, citas, facturas
- **ENFERMERA**: Hospitalizaciones, visualización

## Seguridad

La aplicación usa JWT para autenticación. Incluir el token en el header:

```
Authorization: Bearer <token>
```
