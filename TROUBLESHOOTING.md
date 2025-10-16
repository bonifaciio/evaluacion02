# 🔧 Guía de Solución de Problemas

## Problemas Comunes y Soluciones

### 🚫 Backend: No se puede conectar a MySQL

**Error:** `Unable to connect to database`

**Soluciones:**

1. Verificar que MySQL esté corriendo:

```bash
# Linux/Mac
sudo systemctl status mysql
# o
sudo service mysql status

# Windows
net start MySQL80
```

2. Verificar credenciales en `application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=tu_contraseña
```

3. Crear base de datos manualmente:

```bash
mysql -u root -p
CREATE DATABASE hospital_db;
exit;
```

4. Verificar puerto MySQL:

```bash
mysql -u root -p -P 3306
```

---

### 🚫 Backend: Puerto 8080 ya en uso

**Error:** `Port 8080 is already in use`

**Soluciones:**

1. Cambiar puerto en `application.properties`:

```properties
server.port=8081
```

2. Matar proceso en el puerto:

```bash
# Linux/Mac
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

### 🚫 Backend: Error de compilación Maven

**Error:** `Failed to execute goal`

**Soluciones:**

1. Limpiar proyecto:

```bash
mvn clean
```

2. Verificar versión de Java:

```bash
java -version
# Debe ser Java 17 o superior
```

3. Actualizar Maven:

```bash
mvn --version
```

4. Eliminar .m2 corrupto:

```bash
rm -rf ~/.m2/repository
mvn clean install
```

---

### 🚫 Frontend: Error al instalar dependencias

**Error:** `npm ERR!`

**Soluciones:**

1. Limpiar caché:

```bash
npm cache clean --force
```

2. Eliminar node_modules y reinstalar:

```bash
rm -rf node_modules package-lock.json
npm install
```

3. Usar npm con flags:

```bash
npm install --legacy-peer-deps
```

---

### 🚫 Frontend: Puerto 3000 ya en uso

**Error:** `Port 3000 is already in use`

**Soluciones:**

1. Cambiar puerto (Linux/Mac):

```bash
PORT=3001 npm start
```

2. Cambiar puerto (Windows):

```bash
set PORT=3001 && npm start
```

3. Matar proceso:

```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### 🚫 Error de CORS

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Soluciones:**

1. Verificar que backend esté corriendo en puerto 8080

2. Verificar configuración en `application.properties`:

```properties
cors.allowed-origins=http://localhost:3000
```

3. Verificar URL en frontend (`api.js`):

```javascript
const API_URL = "http://localhost:8080/api";
```

4. Reiniciar ambos servidores

---

### 🚫 Error de Autenticación JWT

**Error:** `401 Unauthorized`

**Soluciones:**

1. Verificar que el token sea válido:

```javascript
// En DevTools Console
localStorage.getItem("token");
```

2. Limpiar localStorage:

```javascript
localStorage.clear();
```

3. Iniciar sesión nuevamente

4. Verificar que el secret JWT no haya cambiado en `application.properties`

---

### 🚫 Error al crear Paciente

**Error:** `Historia clínica duplicada`

**Soluciones:**

1. Verificar que el método `guardar` en `PacienteService` esté correcto

2. Limpiar base de datos:

```sql
DELETE FROM historia_clinica WHERE id_paciente NOT IN (SELECT id_paciente FROM paciente);
```

---

### 🚫 Contraseña no funciona

**Error:** `Credenciales inválidas`

**Soluciones:**

1. Usar contraseña de prueba: `password123`

2. Regenerar hash BCrypt:

```bash
# En backend, usar BCryptPasswordEncoder
```

3. Actualizar usuario en BD:

```sql
UPDATE usuario SET contrasena = '$2a$10$8.Un4YHKNnbQQPuLRU2qAOp2Qo2fBN8MYnSPfQJLEI.T8yZUQwxIq' WHERE nombre_usuario = 'admin';
```

---

### 🚫 Error al ejecutar Maven

**Error:** `mvn: command not found`

**Soluciones:**

1. Instalar Maven:

```bash
# Ubuntu/Debian
sudo apt install maven

# Mac
brew install maven

# Windows
# Descargar desde https://maven.apache.org/download.cgi
```

2. Verificar instalación:

```bash
mvn --version
```

---

### 🚫 Error al ejecutar npm

**Error:** `npm: command not found`

**Soluciones:**

1. Instalar Node.js:

```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# Mac
brew install node

# Windows
# Descargar desde https://nodejs.org/
```

2. Verificar instalación:

```bash
node --version
npm --version
```

---

### 🚫 Base de datos no se crea automáticamente

**Soluciones:**

1. Crear manualmente:

```bash
mysql -u root -p
CREATE DATABASE hospital_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

2. Ejecutar script de datos:

```bash
mysql -u root -p hospital_db < backend/src/main/resources/data.sql
```

---

### 🚫 Tablas no se crean automáticamente

**Soluciones:**

1. Verificar configuración JPA en `application.properties`:

```properties
spring.jpa.hibernate.ddl-auto=update
```

2. Forzar recreación (¡CUIDADO! Borra datos):

```properties
spring.jpa.hibernate.ddl-auto=create-drop
```

3. Crear tablas manualmente desde log de Hibernate

---

### 🚫 Error al cargar datos iniciales

**Soluciones:**

1. Verificar que `data.sql` esté en `src/main/resources/`

2. Agregar configuración:

```properties
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always
```

3. Ejecutar script manualmente:

```bash
mysql -u root -p hospital_db < backend/src/main/resources/data.sql
```

---

## 🐛 Debug Mode

### Backend

```properties
# En application.properties
logging.level.com.hospital=DEBUG
logging.level.org.springframework.security=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### Frontend

```javascript
// En api.js, agregar interceptor
api.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

api.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});
```

---

## 📊 Verificar Estado del Sistema

### Backend

```bash
# Verificar que esté corriendo
curl http://localhost:8080/api/auth/login

# Ver logs
tail -f backend/logs/spring-boot-logger.log
```

### Frontend

```bash
# Ver proceso
ps aux | grep node

# Ver logs en navegador
# Abrir DevTools (F12) → Console
```

### MySQL

```bash
# Conectar y verificar
mysql -u root -p
USE hospital_db;
SHOW TABLES;
SELECT COUNT(*) FROM usuario;
```

---

## 🔄 Reiniciar Todo

```bash
# 1. Detener procesos
# Ctrl+C en ambos terminales

# 2. Limpiar caché
cd backend
mvn clean

cd frontend
rm -rf node_modules
npm install

# 3. Reiniciar MySQL
sudo systemctl restart mysql

# 4. Iniciar backend
cd backend
mvn spring-boot:run

# 5. Iniciar frontend (nueva terminal)
cd frontend
npm start
```

---

## 📞 Soporte Adicional

Si los problemas persisten:

1. Revisar logs completos
2. Verificar versiones de software
3. Revisar documentación oficial:
   - [Spring Boot](https://spring.io/projects/spring-boot)
   - [React](https://react.dev/)
   - [MySQL](https://dev.mysql.com/doc/)

---

## ✅ Checklist de Verificación

- [ ] MySQL está corriendo
- [ ] Base de datos `hospital_db` existe
- [ ] Java 17+ instalado
- [ ] Maven instalado
- [ ] Node.js instalado
- [ ] Puerto 8080 libre
- [ ] Puerto 3000 libre
- [ ] Credenciales correctas en `application.properties`
- [ ] Backend compila sin errores
- [ ] Frontend instala dependencias sin errores
- [ ] Puedo hacer login con `admin/password123`
