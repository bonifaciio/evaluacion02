# 🐳 Guía de Docker - Sistema de Gestión Hospitalaria

Esta guía explica cómo ejecutar todo el sistema usando Docker y Docker Compose.

## 📋 Requisitos Previos

1. **Docker Desktop** instalado:

   - Windows/Mac: [Docker Desktop](https://docs.docker.com/get-docker/)
   - Linux: Docker Engine + Docker Compose

2. **Puertos disponibles**:

   - `3306` - MySQL
   - `8080` - Backend Spring Boot
   - `3000` - Frontend React

3. **Recursos mínimos**:
   - RAM: 4 GB
   - Espacio en disco: 2 GB

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

```bash
# Dar permisos de ejecución
chmod +x docker-start.sh docker-stop.sh

# Iniciar todo el sistema
./docker-start.sh
```

### Opción 2: Comandos Manuales

```bash
# Construir las imágenes
docker-compose build

# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## 📦 Servicios Incluidos

El sistema levanta 3 contenedores:

1. **MySQL** (`hospital-mysql`)

   - Puerto: `3306`
   - Base de datos: `hospital_db`
   - Usuario: `hospital_user`
   - Contraseña: `hospital_password`
   - Datos precargados automáticamente

2. **Backend** (`hospital-backend`)

   - Puerto: `8080`
   - Spring Boot 3.2.0
   - API REST en: `http://localhost:8080/api`

3. **Frontend** (`hospital-frontend`)
   - Puerto: `3000` (servido por Nginx)
   - React 18
   - Interfaz en: `http://localhost:3000`

## 🌐 Acceso a la Aplicación

Una vez iniciado el sistema:

- **Aplicación Web**: http://localhost:3000
- **API Backend**: http://localhost:8080/api
- **MySQL**: `localhost:3306`

### Credenciales de Prueba

| Usuario    | Contraseña  | Rol           |
| ---------- | ----------- | ------------- |
| admin      | password123 | ADMIN         |
| dr.garcia  | password123 | DOCTOR        |
| recepcion1 | password123 | RECEPCIONISTA |
| enfermera1 | password123 | ENFERMERA     |

## 📊 Comandos Útiles

### Ver estado de contenedores

```bash
docker-compose ps
```

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo MySQL
docker-compose logs -f mysql
```

### Reiniciar servicios

```bash
# Reiniciar todos
docker-compose restart

# Reiniciar solo backend
docker-compose restart backend
```

### Detener el sistema

```bash
# Detener contenedores (conserva datos)
docker-compose down

# O usar el script
./docker-stop.sh
```

### Eliminar todo (incluyendo datos)

```bash
# ⚠️ CUIDADO: Esto elimina la base de datos
docker-compose down -v
```

### Reconstruir imágenes

```bash
# Si modificaste código
docker-compose build --no-cache
docker-compose up -d
```

## 🔧 Acceso a MySQL desde el Host

Puedes conectarte a MySQL desde tu máquina local:

```bash
mysql -h localhost -P 3306 -u hospital_user -p
# Contraseña: hospital_password
```

O con cualquier cliente MySQL (DBeaver, MySQL Workbench, etc.):

- Host: `localhost`
- Puerto: `3306`
- Usuario: `hospital_user`
- Contraseña: `hospital_password`
- Base de datos: `hospital_db`

## 🐛 Solución de Problemas

### Error: Puerto ya en uso

Si el puerto 3306, 8080 o 3000 ya está en uso:

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3306
sudo lsof -i :8080
sudo lsof -i :3000

# O cambiar el puerto en docker-compose.yml
# Ejemplo para cambiar MySQL a 3307:
ports:
  - "3307:3306"
```

### Backend no se conecta a MySQL

```bash
# Ver logs del backend
docker-compose logs backend

# Verificar que MySQL esté saludable
docker-compose ps

# Reiniciar backend después de que MySQL esté listo
docker-compose restart backend
```

### Frontend no carga

```bash
# Ver logs del frontend
docker-compose logs frontend

# Verificar que nginx esté corriendo
docker exec -it hospital-frontend nginx -t

# Reconstruir frontend
docker-compose build frontend
docker-compose up -d frontend
```

### Reinicio completo limpio

```bash
# Detener todo
docker-compose down -v

# Limpiar imágenes (opcional)
docker system prune -a

# Reconstruir desde cero
docker-compose build --no-cache
docker-compose up -d
```

### Ver logs de inicialización de MySQL

```bash
docker-compose logs mysql | grep -i "ready for connections"
```

## 🔄 Actualización del Código

Si modificas el código fuente:

### Backend (Java/Spring Boot)

```bash
docker-compose build backend
docker-compose up -d backend
```

### Frontend (React)

```bash
docker-compose build frontend
docker-compose up -d frontend
```

### Base de datos (SQL)

```bash
# Los archivos SQL se cargan solo en la primera inicialización
# Para recargar:
docker-compose down -v
docker-compose up -d
```

## 📈 Monitoreo

### Ver uso de recursos

```bash
docker stats
```

### Inspeccionar contenedor

```bash
docker inspect hospital-backend
docker inspect hospital-mysql
docker inspect hospital-frontend
```

### Ejecutar comandos dentro del contenedor

```bash
# Backend (bash)
docker exec -it hospital-backend sh

# MySQL (cliente mysql)
docker exec -it hospital-mysql mysql -u hospital_user -p

# Frontend (bash)
docker exec -it hospital-frontend sh
```

## 🎯 Arquitectura Docker

```
┌─────────────────────────────────────────────────┐
│                Docker Network                    │
│              (hospital-network)                  │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────┐│
│  │   Frontend   │  │   Backend    │  │ MySQL  ││
│  │   (Nginx)    │◄─┤ (Spring Boot)│◄─┤ 8.0    ││
│  │   Port 80    │  │   Port 8080  │  │Port 3306││
│  └──────┬───────┘  └──────────────┘  └────┬───┘│
│         │                                  │    │
└─────────┼──────────────────────────────────┼────┘
          │                                  │
          │ (Mapped to host)                 │
          ▼                                  ▼
     localhost:3000                    localhost:3306
```

## 🔐 Variables de Entorno

Las variables de entorno están definidas en `docker-compose.yml`. Para cambiarlas:

1. Copia `.env.example` a `.env`
2. Modifica los valores en `.env`
3. Docker Compose las usará automáticamente

## 📚 Archivos Docker

- `docker-compose.yml` - Orquestación de servicios
- `backend/Dockerfile` - Imagen del backend
- `frontend/Dockerfile` - Imagen del frontend
- `frontend/nginx.conf` - Configuración de Nginx
- `.dockerignore` - Archivos excluidos de las imágenes
- `docker-start.sh` - Script de inicio
- `docker-stop.sh` - Script de detención

## 🎓 Siguiente Paso

Una vez que el sistema esté corriendo:

1. Abre http://localhost:3000
2. Inicia sesión con `admin` / `password123`
3. Explora el Dashboard
4. Prueba el módulo de Pacientes

¡Todo está listo para desarrollar! 🚀
