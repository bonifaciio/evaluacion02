# 🚀 Guía de Inicio Rápido

## 🐳 Opción 1: Docker (Más Rápido - Recomendado)

Si tienes Docker instalado, esta es la forma más fácil:

```bash
# 1. Dar permisos de ejecución
chmod +x docker-start.sh

# 2. Ejecutar el script
./docker-start.sh

# 3. Acceder a la aplicación
# http://localhost:3000
# Usuario: admin / Contraseña: password123
```

¡Eso es todo! Todo está configurado automáticamente.

📖 **[Ver Guía Completa de Docker](DOCKER_GUIDE.md)** para más comandos y troubleshooting.

---

## 💻 Opción 2: Instalación Manual

### Requisitos Previos

✅ JDK 17 o superior  
✅ Maven 3.6+  
✅ Node.js 18+  
✅ MySQL 8.0+ (o usar Docker solo para MySQL)

### 1. Configurar Base de Datos

#### Opción A: MySQL con Docker (Recomendado)

```bash
# Solo levantar MySQL
docker-compose up -d mysql

# Verificar que esté listo
docker-compose logs -f mysql
```

#### Opción B: MySQL Local

```bash
# Iniciar sesión en MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE hospital_db;
exit;

# Cargar datos iniciales
mysql -u root -p hospital_db < backend/src/main/resources/data.sql
```

### 2. Configurar Backend

```bash
# Ir al directorio backend
cd backend

# Editar application.properties si es necesario
# Cambiar usuario/contraseña de MySQL

# Compilar el proyecto
mvn clean install

# Ejecutar
mvn spring-boot:run
```

**Backend corriendo en:** `http://localhost:8080`

### 3. Configurar Frontend

```bash
# Ir al directorio frontend
cd frontend

# Las dependencias ya están instaladas
# Si necesitas reinstalar: npm install

# Ejecutar
npm start
```

**Frontend corriendo en:** `http://localhost:3000`

## 🎯 Probar el Sistema

1. Abre tu navegador en `http://localhost:3000`
2. Inicia sesión con:
   - Usuario: `admin`
   - Contraseña: `password123`
3. Explora los módulos desde el menú lateral

## 🔧 Configuración Rápida con Script

También puedes usar el script automático:

```bash
./setup.sh
```

## 📋 Usuarios de Prueba

| Usuario    | Contraseña  | Rol           |
| ---------- | ----------- | ------------- |
| admin      | password123 | Administrador |
| dr.garcia  | password123 | Médico        |
| recepcion1 | password123 | Recepcionista |
| enfermera1 | password123 | Enfermera     |

## 🐛 Problemas Comunes

### Backend no inicia

- Verificar que MySQL esté corriendo
- Verificar credenciales en `backend/src/main/resources/application.properties`
- Verificar que el puerto 8080 esté libre

### Frontend no inicia

- Verificar que el puerto 3000 esté libre
- Ejecutar `npm install` si falta alguna dependencia

### Error de CORS

- Verificar que el backend esté corriendo en el puerto 8080
- Verificar configuración CORS en `application.properties`

## 📚 Documentación Completa

Ver [README.md](./README.md) para documentación completa.

## 🎨 Módulos Disponibles

- ✅ **Dashboard**: Resumen y estadísticas
- ✅ **Pacientes**: CRUD completo con historias clínicas
- ✅ **Citas**: Programación y seguimiento
- ✅ **Médicos**: Gestión del personal
- ✅ **Consultas**: Registro de atenciones
- ✅ **Hospitalizaciones**: Control de internados
- ✅ **Facturas**: Sistema de facturación
- ✅ **Usuarios**: Administración (solo Admin)

## 🚀 Próximos Pasos

1. Explora cada módulo
2. Crea nuevos pacientes
3. Agenda citas médicas
4. Registra consultas
5. Genera facturas

¡Disfruta del sistema! 🎉
