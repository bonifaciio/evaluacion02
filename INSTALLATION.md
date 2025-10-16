# 🚀 Guía de Instalación - Sistema de Gestión Hospitalaria

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

### Requisitos Obligatorios

- **Docker**: v20.10 o superior
- **Docker Compose**: v2.0 o superior
- **Git**: Para clonar el repositorio

### Verificar Instalación

```bash
# Verificar Docker
docker --version

# Verificar Docker Compose
docker compose version

# Verificar Git
git --version
```

---

## 📦 Paso 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/rafaelchuco/evaluacion02.git

# Entrar al directorio
cd evaluacion02
```

---

## ⚙️ Paso 2: Configurar Variables de Entorno

### Backend - Base de Datos

Edita el archivo `backend/src/main/resources/application.properties`:

```properties
# Configuración de la base de datos
spring.datasource.url=jdbc:mysql://mysql:3306/hospital_db?createDatabaseIfNotExist=true
spring.datasource.username=hospital_user
spring.datasource.password=hospital_password_2024

# Si quieres cambiar las credenciales de la BD, edita estas líneas
```

**IMPORTANTE**: Las credenciales por defecto son:

- Usuario BD: `hospital_user`
- Contraseña BD: `hospital_password_2024`
- Base de datos: `hospital_db`

Si cambias estas credenciales, también debes cambiarlas en `docker-compose.yml`.

---

## 🐳 Paso 3: Levantar los Contenedores Docker

### Opción A: Inicio Rápido (Recomendado)

```bash
# Dar permisos de ejecución al script
chmod +x docker-start.sh

# Ejecutar el script
./docker-start.sh
```

Este script:

- ✅ Construye las imágenes de Docker
- ✅ Inicia todos los servicios (MySQL, Backend, Frontend)
- ✅ Espera a que los servicios estén listos
- ✅ Muestra el estado final

**Tiempo estimado**: 2-3 minutos en la primera ejecución

### Opción B: Manual

```bash
# Construir e iniciar todos los servicios
docker compose up -d --build

# Ver logs en tiempo real
docker compose logs -f
```

---

## ✅ Paso 4: Verificar la Instalación

### Verificar Estado de Contenedores

```bash
docker compose ps
```

Deberías ver 3 contenedores corriendo:

- `hospital-mysql` (puerto 3306)
- `hospital-backend` (puerto 8080)
- `hospital-frontend` (puerto 3000)

### Verificar Salud del Backend

```bash
# Esperar 40 segundos después del inicio, luego:
curl http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario":"admin","contrasena":"admin123"}'
```

Si ves un JSON con un `token`, ¡el backend está funcionando! ✅

### Verificar Frontend

Abre tu navegador y ve a: **http://localhost:3000**

---

## 🔐 Paso 5: Acceder al Sistema

### Credenciales por Defecto

**Usuario**: `admin`  
**Contraseña**: `admin123`

### URLs del Sistema

| Servicio        | URL                                   | Descripción                            |
| --------------- | ------------------------------------- | -------------------------------------- |
| **Frontend**    | http://localhost:3000                 | Interfaz web del usuario               |
| **Backend API** | http://localhost:8080                 | API REST                               |
| **Swagger UI**  | http://localhost:8080/swagger-ui.html | Documentación API (si está habilitado) |
| **MySQL**       | localhost:3306                        | Base de datos (acceso directo)         |

---

## 📊 Paso 6: Datos Iniciales

El sistema se inicializa automáticamente con:

- ✅ 1 usuario admin
- ✅ 4 pacientes de ejemplo
- ✅ 4 médicos de ejemplo
- ✅ Múltiples citas programadas
- ✅ Especialidades médicas
- ✅ Habitaciones del hospital

Estos datos se cargan desde:

- `backend/src/main/resources/data.sql`
- `backend/src/main/resources/datos-adicionales.sql`

---

## 🛠️ Comandos Útiles

### Ver Logs

```bash
# Logs de todos los servicios
docker compose logs -f

# Logs solo del backend
docker compose logs -f backend

# Logs solo del frontend
docker compose logs -f frontend

# Últimas 50 líneas del backend
docker compose logs backend --tail=50
```

### Reiniciar Servicios

```bash
# Reiniciar todos
docker compose restart

# Reiniciar solo el backend
docker compose restart backend

# Reiniciar solo el frontend
docker compose restart frontend
```

### Detener el Sistema

```bash
# Opción 1: Con script
./docker-stop.sh

# Opción 2: Manual
docker compose down

# Opción 3: Eliminar también los volúmenes (datos)
docker compose down -v
```

### Reconstruir desde Cero

```bash
# Detener y eliminar todo
docker compose down -v

# Reconstruir sin caché
docker compose build --no-cache

# Iniciar de nuevo
docker compose up -d
```

---

## 🔧 Solución de Problemas

### Problema 1: Puerto ya en uso

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solución**:

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3000

# Matar el proceso (reemplaza PID)
kill -9 <PID>

# O cambiar el puerto en docker-compose.yml
```

### Problema 2: Backend no inicia

**Síntomas**: Backend se reinicia constantemente

**Solución**:

```bash
# Ver logs detallados
docker compose logs backend --tail=100

# Verificar que MySQL esté listo
docker compose logs mysql | grep "ready for connections"

# Esperar 60 segundos y reintentar
```

### Problema 3: Error de conexión a la base de datos

**Error**: `Communications link failure`

**Solución**:

```bash
# Verificar que MySQL esté corriendo
docker compose ps mysql

# Reiniciar MySQL
docker compose restart mysql

# Esperar 30 segundos
sleep 30

# Reiniciar backend
docker compose restart backend
```

### Problema 4: Frontend muestra página en blanco

**Solución**:

```bash
# Verificar logs del frontend
docker compose logs frontend

# Reconstruir solo el frontend
docker compose up -d --build frontend

# Limpiar caché del navegador
# Presiona Ctrl+Shift+R en Chrome/Firefox
```

### Problema 5: Permisos denegados en Linux

```bash
# Dar permisos a los scripts
chmod +x docker-start.sh
chmod +x docker-stop.sh
chmod +x mysql-docker.sh
chmod +x setup.sh

# Agregar tu usuario al grupo docker (reiniciar sesión después)
sudo usermod -aG docker $USER
```

---

## 🔒 Configuración de Seguridad (Producción)

⚠️ **IMPORTANTE**: Antes de subir a producción:

1. **Cambiar Contraseñas**:

   ```bash
   # Editar docker-compose.yml
   vim docker-compose.yml

   # Cambiar:
   # MYSQL_ROOT_PASSWORD
   # MYSQL_PASSWORD
   ```

2. **Actualizar application.properties**:

   ```bash
   vim backend/src/main/resources/application.properties

   # Actualizar:
   # spring.datasource.password
   # jwt.secret (clave secreta)
   ```

3. **Cambiar Contraseña del Admin**:

   ```bash
   # Editar data.sql
   vim backend/src/main/resources/data.sql

   # Generar nuevo hash BCrypt para la contraseña
   ```

4. **Habilitar HTTPS** (recomendado)

5. **Configurar CORS** para dominios específicos

---

## 📚 Documentación Adicional

- [README.md](README.md) - Descripción general del proyecto
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitectura del sistema
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Documentación de endpoints
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solución de problemas detallada
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Guía de Docker

---

## 💡 Próximos Pasos

Después de la instalación exitosa:

1. ✅ Explorar el frontend en http://localhost:3000
2. ✅ Revisar la documentación de la API
3. ✅ Modificar datos de ejemplo según necesites
4. ✅ Personalizar estilos y configuraciones
5. ✅ Realizar pruebas con tus propios datos

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Consulta [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Revisa los logs: `docker compose logs -f`
4. Abre un issue en GitHub

---

## 📝 Licencia

[Especificar tu licencia aquí]

---

**¡Listo! Tu Sistema de Gestión Hospitalaria está corriendo.** 🎉
