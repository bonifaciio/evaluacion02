# 🐳 Resumen de Configuración Docker

## ✅ Archivos Creados

### Archivos Docker Principales

- **docker-compose.yml** - Orquestación completa del sistema (MySQL + Backend + Frontend)
- **backend/Dockerfile** - Imagen del backend Spring Boot (multi-stage build con Maven)
- **frontend/Dockerfile** - Imagen del frontend React (multi-stage build con nginx)
- **frontend/nginx.conf** - Configuración de nginx para servir React
- **.dockerignore** - Archivos excluidos de las imágenes Docker

### Scripts de Automatización

- **docker-start.sh** ⭐ - Script principal para iniciar todo el sistema
- **docker-stop.sh** - Script para detener el sistema
- **mysql-docker.sh** - Script para iniciar solo MySQL (útil para desarrollo local)

### Configuración

- **.env.example** - Plantilla de variables de entorno
- **backend/application.properties** - Actualizado para soportar Docker y local

### Documentación

- **DOCKER_GUIDE.md** - Guía completa de uso de Docker
- **README.md** - Actualizado con instrucciones Docker
- **QUICKSTART.md** - Actualizado con inicio rápido Docker

## 🚀 Formas de Iniciar el Sistema

### 1️⃣ Todo el Sistema con Docker (Recomendado)

```bash
./docker-start.sh
```

Esto inicia:

- MySQL en puerto 3306
- Backend en puerto 8080
- Frontend en puerto 3000

### 2️⃣ Solo MySQL con Docker (para desarrollo)

```bash
./mysql-docker.sh
```

Luego ejecuta backend y frontend manualmente:

```bash
# Terminal 1: Backend
cd backend && mvn spring-boot:run

# Terminal 2: Frontend
cd frontend && npm start
```

### 3️⃣ Usando Docker Compose directamente

```bash
# Iniciar todo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### 4️⃣ Solo MySQL con Docker Compose

```bash
docker-compose up -d mysql
```

## 🔑 Credenciales de Base de Datos

### En Docker

- **Host**: `mysql` (desde contenedores) o `localhost` (desde host)
- **Puerto**: `3306`
- **Base de datos**: `hospital_db`
- **Usuario**: `hospital_user`
- **Contraseña**: `hospital_password`
- **Root password**: `rootpassword`

### Configuración en application.properties

El archivo está configurado para funcionar tanto con Docker como sin él:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/hospital_db...}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:hospital_user}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:hospital_password}
```

## 📊 Arquitectura Docker

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                  (hospital-network)                      │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────┐│
│  │   Frontend     │  │    Backend     │  │   MySQL    ││
│  │   (nginx)      │◄─┤  (Spring Boot) │◄─┤    8.0     ││
│  │   Port 80      │  │   Port 8080    │  │  Port 3306 ││
│  └────────┬───────┘  └────────────────┘  └──────┬─────┘│
│           │                                      │      │
│           │      ┌──────────────┐               │      │
│           └─────►│  Data Volume │◄──────────────┘      │
│                  │ mysql_data   │                       │
│                  └──────────────┘                       │
└──────────────────────────────────────────────────────────┘
           │                                      │
           │ (Port Mapping)                       │
           ▼                                      ▼
    localhost:3000                         localhost:3306
```

## 🔍 Características Implementadas

### Multi-Stage Builds

- **Backend**: Compila con Maven en stage 1, ejecuta con JRE ligero en stage 2
- **Frontend**: Construye con Node en stage 1, sirve con nginx en stage 2

### Health Checks

- MySQL tiene healthcheck para asegurar que esté listo antes de iniciar backend

### Volumes

- `mysql_data`: Persiste la base de datos entre reinicios
- Datos iniciales se cargan automáticamente desde `data.sql`

### Networks

- Red dedicada `hospital-network` para comunicación entre contenedores

### Variables de Entorno

- Configuradas en docker-compose.yml
- Sobrescribibles con archivo .env

## 📝 Notas Importantes

1. **Primera ejecución**: Toma más tiempo porque construye las imágenes
2. **Datos iniciales**: Se cargan automáticamente en la primera ejecución de MySQL
3. **Persistencia**: Los datos de MySQL se guardan en un volumen Docker
4. **Puertos**: Asegúrate de que 3000, 3306 y 8080 estén libres

## 🆘 Comandos Útiles

```bash
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f [servicio]

# Reiniciar un servicio
docker-compose restart backend

# Entrar a un contenedor
docker exec -it hospital-backend sh
docker exec -it hospital-mysql mysql -u hospital_user -p

# Eliminar todo (incluye volúmenes)
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Ver uso de recursos
docker stats
```

## ✨ Ventajas de esta Configuración

✅ **Fácil inicio**: Un solo comando (`./docker-start.sh`)  
✅ **Sin dependencias**: No necesitas instalar MySQL, Maven, etc.  
✅ **Consistente**: Funciona igual en todos los sistemas  
✅ **Aislado**: No afecta otras instalaciones  
✅ **Datos precargados**: Usuarios y datos de prueba listos  
✅ **Desarrollo rápido**: Puedes usar solo MySQL con Docker  
✅ **Producción listo**: Las imágenes son optimizadas

## 🎯 Próximos Pasos

1. Ejecuta `./docker-start.sh`
2. Abre http://localhost:3000
3. Inicia sesión con `admin` / `password123`
4. ¡Empieza a desarrollar! 🚀

Para más detalles, consulta [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
