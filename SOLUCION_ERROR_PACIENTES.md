# 🔧 SOLUCIÓN: Error al cargar pacientes

## 🐛 Problema Identificado

El error "Error al cargar pacientes" ocurre porque **NO estás autenticado** o tu **token JWT expiró**.

### Evidencia del Error

```
Failed to authorize ReflectiveMethodInvocation... 
ExpressionAuthorizationDecision [granted=false]
```

Esto significa que el backend rechazó la petición porque no tiene un token válido.

---

## ✅ SOLUCIÓN RÁPIDA

### Paso 1: Cerrar Sesión

Si estás en el sistema, cierra sesión haciendo clic en tu nombre de usuario → "Cerrar Sesión"

### Paso 2: Volver a Iniciar Sesión

1. Ve a `http://localhost:3000/login`
2. Ingresa las credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `admin123`
3. Haz clic en "Iniciar Sesión"

### Paso 3: Navegar a Pacientes

Una vez logueado, el módulo de pacientes debería cargar correctamente.

---

## 🔍 VERIFICACIÓN MANUAL

### Verificar que el backend funciona:

```bash
# 1. Obtener token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario":"admin","contrasena":"admin123"}' | jq -r '.token')

# 2. Probar endpoint de pacientes
curl -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $TOKEN"
```

Si esto devuelve JSON con datos, el backend está funcionando correctamente.

---

## 🛠️ PROBLEMAS COMUNES

### 1. Token Expirado

**Síntoma:** Funcionaba antes pero ahora falla  
**Solución:** Cerrar sesión y volver a iniciar

### 2. LocalStorage Corrupto

**Síntoma:** No puedes iniciar sesión  
**Solución:**
1. Abre DevTools (F12)
2. Ve a Application → Storage → Local Storage
3. Elimina `token` y `user`
4. Recarga la página
5. Vuelve a iniciar sesión

### 3. CORS Error

**Síntoma:** Error en consola del navegador  
**Solución:** Verifica que el backend esté corriendo en `http://localhost:8080`

```bash
curl http://localhost:8080/api/test/hello
```

### 4. Backend No Responde

**Síntoma:** Error de conexión  
**Solución:**

```bash
# Verificar contenedores
docker compose ps

# Ver logs
docker compose logs backend --tail=50

# Reiniciar backend si es necesario
docker compose restart backend
```

---

## 🔐 USUARIOS DISPONIBLES

Todos usan la contraseña: `admin123`

| Usuario | Rol | Permisos |
|---------|-----|----------|
| `admin` | Administrador | Acceso total |
| `dr.garcia` | Médico | Consultas, pacientes, citas |
| `recepcion1` | Recepcionista | Citas, pacientes |
| `enfermera1` | Enfermera | Consultas, pacientes |

---

## 📊 ENDPOINTS PROTEGIDOS

Los siguientes endpoints **requieren autenticación**:

- `GET /api/pacientes` → Requiere token JWT
- `POST /api/pacientes` → Requiere token JWT + rol ADMIN/RECEPCIONISTA
- `PUT /api/pacientes/{id}` → Requiere token JWT + rol ADMIN/RECEPCIONISTA
- `DELETE /api/pacientes/{id}` → Requiere token JWT + rol ADMIN

**Roles con acceso a pacientes:**
- `ROLE_ADMIN`
- `ROLE_MEDICO`
- `ROLE_RECEPCIONISTA`
- `ROLE_ENFERMERA`

---

## 🧪 VERIFICACIÓN PASO A PASO

### 1. Verificar que el sistema está corriendo

```bash
docker compose ps
```

Deberías ver 3 contenedores `Up`:
- `hospital-mysql`
- `hospital-backend`
- `hospital-frontend`

### 2. Verificar logs del backend

```bash
docker compose logs backend --tail=20
```

Busca errores o excepciones.

### 3. Probar login manualmente

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario":"admin","contrasena":"admin123"}'
```

Debería devolver:
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "tipo": "Bearer",
  "id": 60,
  "nombreUsuario": "admin",
  "rol": "ROLE_ADMIN"
}
```

### 4. Verificar en el navegador

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Navega a Pacientes
4. Busca la petición a `/api/pacientes`
5. Verifica que tenga el header `Authorization: Bearer ...`

---

## 💡 SOLUCIÓN DEFINITIVA

Si el problema persiste después de volver a loguearte:

### Opción 1: Limpiar Caché del Navegador

```
Ctrl + Shift + Delete
→ Marcar "Caché" y "Cookies"
→ Limpiar datos
```

### Opción 2: Reiniciar Todo el Sistema

```bash
# Detener todo
./docker-stop.sh

# Esperar 5 segundos
sleep 5

# Iniciar todo de nuevo
./docker-start.sh

# Esperar a que cargue (30 segundos)
sleep 30

# Probar
curl http://localhost:8080/api/test/hello
curl http://localhost:3000
```

### Opción 3: Modo Incógnito

Abre el navegador en modo incógnito/privado:
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

Luego ve a `http://localhost:3000` e inicia sesión.

---

## 📋 CHECKLIST DE SOLUCIÓN

- [ ] Sistema corriendo (`docker compose ps`)
- [ ] Backend responde (`curl http://localhost:8080/api/test/hello`)
- [ ] Frontend carga (`curl http://localhost:3000`)
- [ ] Cerrar sesión si estabas logueado
- [ ] Limpiar Local Storage
- [ ] Iniciar sesión con `admin/admin123`
- [ ] Navegar a Pacientes
- [ ] Verificar que carga la lista

---

## 🎯 RESUMEN

**Causa raíz:** Falta de autenticación o token expirado  
**Solución:** Volver a iniciar sesión con `admin/admin123`  
**Prevención:** El token JWT expira después de 24 horas, es normal tener que re-loguearse

---

¿Necesitas más ayuda? Revisa:
- `TROUBLESHOOTING.md` para otros problemas
- `CAMBIOS_LIMPIEZA.md` para cambios recientes
- Logs del backend: `docker compose logs backend`

