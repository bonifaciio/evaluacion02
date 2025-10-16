# 📤 CÓMO COMPARTIR Y CLONAR ESTE PROYECTO

## Para el Desarrollador que SUBE el proyecto a GitHub

### 1️⃣ Preparar el Repositorio

```bash
# Asegúrate de estar en la carpeta del proyecto
cd evaluacion02

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Sistema de Gestión Hospitalaria - Version inicial"

# Crear repositorio en GitHub (manual)
# Ve a https://github.com/new
# Nombre: evaluacion02
# Descripción: Sistema de Gestión Hospitalaria con Spring Boot y React
# Público/Privado: según prefieras

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/evaluacion02.git

# Subir los archivos
git branch -M main
git push -u origin main
```

### 2️⃣ Agregar Archivo .gitignore (importante)

Crea o verifica que existe `.gitignore` en la raíz:

```gitignore
# Backend
backend/target/
backend/.mvn/
backend/mvnw
backend/mvnw.cmd
backend/.idea/
backend/*.iml
backend/.DS_Store

# Frontend
frontend/node_modules/
frontend/build/
frontend/.env.local
frontend/.env.development.local
frontend/.env.test.local
frontend/.env.production.local
frontend/npm-debug.log*
frontend/yarn-debug.log*
frontend/yarn-error.log*

# Docker
.docker/

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

### 3️⃣ Documentar Bien el README

Asegúrate de que `README.md` tenga:

- ✅ Descripción clara del proyecto
- ✅ Requisitos (Docker, Git)
- ✅ Pasos de instalación
- ✅ Capturas de pantalla (opcional pero recomendado)
- ✅ Credenciales de acceso por defecto

---

## Para la Persona que DESCARGA el proyecto

### 🚀 INICIO RÁPIDO (3 Pasos)

#### **Paso 1: Instalar Requisitos**

Necesitas solo **2 herramientas**:

1. **Docker Desktop** (incluye Docker Compose)

   - Windows/Mac: https://www.docker.com/products/docker-desktop
   - Linux:
     ```bash
     sudo apt update
     sudo apt install docker.io docker-compose-plugin
     sudo usermod -aG docker $USER
     # Cerrar sesión y volver a entrar
     ```

2. **Git**
   - Windows: https://git-scm.com/download/win
   - Mac: `brew install git`
   - Linux: `sudo apt install git`

**Verificar instalación:**

```bash
docker --version
docker compose version
git --version
```

#### **Paso 2: Clonar y Configurar**

```bash
# Clonar el repositorio
git clone https://github.com/rafaelchuco/evaluacion02.git

# Entrar al directorio
cd evaluacion02

# Dar permisos a los scripts (Linux/Mac)
chmod +x docker-start.sh docker-stop.sh

# Windows: no necesitas este paso
```

#### **Paso 3: Iniciar el Sistema**

**Opción A: Con Script (Recomendado)**

```bash
# Linux/Mac
./docker-start.sh

# Windows (Git Bash)
bash docker-start.sh

# Windows (PowerShell)
.\docker-start.sh
```

**Opción B: Manual**

```bash
docker compose up -d --build
```

**⏱️ Tiempo de espera:**

- Primera vez: 3-5 minutos (descarga imágenes y construye)
- Siguientes veces: 1-2 minutos

### ✅ Verificar que Funciona

**1. Ver estado de los contenedores:**

```bash
docker compose ps
```

Debes ver 3 contenedores:

- `hospital-mysql` (puerto 3306) - ✅ healthy
- `hospital-backend` (puerto 8080) - ✅ Up
- `hospital-frontend` (puerto 3000) - ✅ Up

**2. Probar el backend:**

```bash
curl http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario":"admin","contrasena":"admin123"}'
```

Si ves un JSON con un `token`, ¡funciona! ✅

**3. Abrir el frontend:**
Abre tu navegador y ve a: **http://localhost:3000**

### 🔐 Credenciales de Acceso

- **Usuario**: `admin`
- **Contraseña**: `admin123`

---

## 📱 Usar el Sistema

Una vez iniciado sesión en http://localhost:3000, verás:

### Módulos Disponibles

1. **Dashboard** - Vista general del sistema
2. **Pacientes** - Gestión de pacientes
3. **Citas** - Programación de citas médicas
4. **Médicos** - Administración de médicos
5. **Consultas** - Registro de consultas
6. **Hospitalizaciones** - Control de internaciones
7. **Facturas** - Sistema de facturación
8. **Usuarios** - Gestión de usuarios del sistema

### Datos de Prueba

El sistema incluye datos iniciales:

- 👤 4 pacientes de ejemplo
- 👨‍⚕️ 4 médicos
- 📅 Múltiples citas programadas
- 🏥 Especialidades médicas
- 🛏️ Habitaciones de hospital

---

## 🛑 Detener el Sistema

```bash
# Con script
./docker-stop.sh

# Manual
docker compose down

# Detener Y eliminar los datos
docker compose down -v
```

---

## 🔧 Comandos Útiles

### Ver Logs (Errores, Actividad)

```bash
# Ver todos los logs
docker compose logs -f

# Solo backend
docker compose logs -f backend

# Solo frontend
docker compose logs -f frontend

# Últimas 50 líneas del backend
docker compose logs backend --tail=50
```

### Reiniciar un Servicio

```bash
# Reiniciar solo el backend
docker compose restart backend

# Reiniciar solo el frontend
docker compose restart frontend

# Reiniciar todo
docker compose restart
```

### Reconstruir (después de cambios en código)

```bash
# Reconstruir todo
docker compose up -d --build

# Reconstruir solo backend
docker compose up -d --build backend

# Reconstruir solo frontend
docker compose up -d --build frontend
```

### Limpiar Todo y Empezar de Nuevo

```bash
# Detener y eliminar contenedores
docker compose down

# Eliminar también volúmenes (datos de BD)
docker compose down -v

# Eliminar imágenes
docker compose down --rmi all -v

# Reconstruir desde cero
docker compose up -d --build
```

---

## ❌ Solución de Problemas Comunes

### Problema 1: "Puerto ya en uso"

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solución:**

```bash
# Opción A: Detener lo que usa el puerto
# En Linux/Mac
sudo lsof -i :3000
kill -9 <PID>

# En Windows (PowerShell como admin)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Opción B: Cambiar puerto en docker-compose.yml
# Editar la línea:
    ports:
      - "3001:80"  # Cambiar 3000 por 3001
```

### Problema 2: Backend no inicia

**Síntomas**: Backend se reinicia constantemente

**Solución:**

```bash
# 1. Ver logs
docker compose logs backend --tail=100

# 2. Esperar a que MySQL esté listo (40-60 segundos)
docker compose logs mysql | grep "ready for connections"

# 3. Si ya pasó 1 minuto, reiniciar backend
docker compose restart backend
```

### Problema 3: "Cannot connect to Docker daemon"

**Error**: `Cannot connect to the Docker daemon`

**Solución:**

```bash
# Iniciar Docker Desktop (Windows/Mac)
# O en Linux:
sudo systemctl start docker
sudo systemctl enable docker

# Agregar tu usuario al grupo docker
sudo usermod -aG docker $USER
# Cerrar sesión y volver a entrar
```

### Problema 4: Página en blanco en el frontend

**Solución:**

```bash
# 1. Limpiar caché del navegador
# Presiona Ctrl+Shift+R (o Cmd+Shift+R en Mac)

# 2. Ver logs del frontend
docker compose logs frontend --tail=50

# 3. Reconstruir el frontend
docker compose up -d --build frontend

# 4. Esperar 1-2 minutos y recargar
```

### Problema 5: Error de permisos (Linux)

```bash
# Dar permisos a scripts
chmod +x docker-start.sh
chmod +x docker-stop.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar
```

---

## 🔐 Cambiar Contraseñas (Opcional)

### Cambiar contraseña de la base de datos

**1. Editar `docker-compose.yml`:**

```yaml
environment:
  MYSQL_ROOT_PASSWORD: tu_nueva_contraseña
  MYSQL_PASSWORD: tu_nueva_contraseña
```

**2. Editar `backend/src/main/resources/application.properties`:**

```properties
spring.datasource.password=tu_nueva_contraseña
```

**3. Reconstruir:**

```bash
docker compose down -v
docker compose up -d --build
```

### Cambiar contraseña del admin

El usuario admin se crea en `backend/src/main/resources/data.sql`

Para cambiar la contraseña, necesitas generar un nuevo hash BCrypt.

---

## 📚 Documentación Completa

- 📖 [Guía de Instalación Detallada](INSTALLATION.md)
- 🏗️ [Arquitectura del Sistema](ARCHITECTURE.md)
- 📡 [Documentación de API](API_DOCUMENTATION.md)
- 🔧 [Solución de Problemas](TROUBLESHOOTING.md)
- 🐳 [Guía de Docker](DOCKER_GUIDE.md)

---

## 💡 Próximos Pasos

Después de que el sistema esté corriendo:

1. ✅ Explora cada módulo del sistema
2. ✅ Prueba crear pacientes, citas, consultas
3. ✅ Revisa el código fuente para personalizarlo
4. ✅ Modifica estilos y configuraciones
5. ✅ Lee la documentación de la API

---

## 🤝 Contribuir al Proyecto

Si quieres mejorar el sistema:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-mejora`
3. Haz commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/mi-mejora`
5. Abre un Pull Request

---

## 📞 Contacto y Soporte

- 🐛 [Reportar un problema](https://github.com/rafaelchuco/evaluacion02/issues)
- 💬 [Hacer una pregunta](https://github.com/rafaelchuco/evaluacion02/discussions)
- 📧 Email: [tu-email@example.com]

---

## ⭐ ¿Te gusta el proyecto?

Si este proyecto te ayudó, ¡dale una estrella en GitHub! ⭐

---

**¡Listo para usar!** 🚀

Si sigues estos pasos, en menos de 5 minutos tendrás el sistema completo funcionando en tu computadora.
