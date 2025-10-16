# 📚 ÍNDICE DE DOCUMENTACIÓN

## Sistema de Gestión Hospitalaria

Bienvenido a la documentación completa del proyecto. Aquí encontrarás toda la información necesaria para usar, instalar y desarrollar el sistema.

---

## 🎯 Comienza Aquí

### Para Usuarios Nuevos (¡Empieza aquí!)

1. **[COMO_COMPARTIR.md](COMO_COMPARTIR.md)** ⭐ RECOMENDADO

   - Guía paso a paso para clonar e instalar
   - Requisitos mínimos
   - Solución de problemas comunes
   - **Tiempo de lectura: 5 minutos**

2. **[QUICKSTART.md](QUICKSTART.md)**
   - Inicio rápido en 3 pasos
   - Capturas de pantalla
   - Primeros pasos en el sistema
   - **Tiempo de lectura: 2 minutos**

### Para Instalación Detallada

3. **[INSTALLATION.md](INSTALLATION.md)**
   - Guía completa de instalación
   - Configuración avanzada
   - Variables de entorno
   - Opciones de despliegue
   - **Tiempo de lectura: 10 minutos**

---

## 📖 Documentación General

### Información del Proyecto

4. **[README.md](README.md)**

   - Descripción general del sistema
   - Stack tecnológico
   - Características principales
   - Estructura del proyecto
   - **Tiempo de lectura: 8 minutos**

5. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**
   - Resumen ejecutivo
   - Métricas del sistema
   - Módulos implementados
   - Casos de uso
   - **Tiempo de lectura: 7 minutos**

---

## 🏗️ Documentación Técnica

### Arquitectura y Diseño

6. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - Arquitectura del sistema
   - Diagramas de componentes
   - Flujo de datos
   - Patrones de diseño
   - **Tiempo de lectura: 15 minutos**

### API y Endpoints

7. **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**
   - Documentación completa de la API
   - Todos los endpoints REST
   - Ejemplos de requests/responses
   - Códigos de error
   - Autenticación JWT
   - **Tiempo de lectura: 20 minutos**
   - **Referencia: Consulta frecuente**

---

## 🐳 Docker y Despliegue

### Guías de Docker

8. **[DOCKER_GUIDE.md](DOCKER_GUIDE.md)**

   - Uso de Docker Compose
   - Construcción de imágenes
   - Gestión de contenedores
   - Volúmenes y redes
   - **Tiempo de lectura: 12 minutos**

9. **[DOCKER_SETUP_SUMMARY.md](DOCKER_SETUP_SUMMARY.md)**
   - Resumen de configuración Docker
   - Scripts disponibles
   - Comandos esenciales
   - **Tiempo de lectura: 5 minutos**

---

## 🔧 Solución de Problemas

### Troubleshooting

10. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**
    - Problemas comunes y soluciones
    - Errores de Docker
    - Errores de conexión
    - Problemas de permisos
    - Logs y debugging
    - **Referencia: Consulta cuando tengas problemas**

---

## 📂 Archivos de Configuración

### Scripts y Configuración

11. **docker-compose.yml**

    - Orquestación de servicios
    - Configuración de MySQL, Backend, Frontend
    - Variables de entorno
    - Puertos y volúmenes

12. **docker-start.sh**

    - Script automatizado de inicio
    - Construye e inicia todos los servicios
    - Verifica el estado

13. **docker-stop.sh**

    - Script para detener servicios
    - Limpieza de contenedores

14. **setup.sh**

    - Setup manual sin Docker
    - Instalación de dependencias
    - Configuración de base de datos

15. **mysql-docker.sh**
    - Script específico para MySQL
    - Inicialización de la base de datos

---

## 🎓 Guías por Rol

### Para Desarrolladores

**Ruta de aprendizaje recomendada:**

1. Lee [README.md](README.md) - Visión general
2. Instala con [COMO_COMPARTIR.md](COMO_COMPARTIR.md)
3. Estudia [ARCHITECTURE.md](ARCHITECTURE.md) - Entiende la estructura
4. Revisa [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Conoce los endpoints
5. Explora el código fuente en `backend/` y `frontend/`
6. Consulta [DOCKER_GUIDE.md](DOCKER_GUIDE.md) para desarrollo

**Archivos clave para editar:**

```
backend/src/main/java/com/hospital/
├── controller/  # Endpoints REST
├── service/     # Lógica de negocio
├── repository/  # Acceso a datos
└── entity/      # Modelos de datos

frontend/src/
├── pages/       # Vistas principales
├── components/  # Componentes reutilizables
└── services/    # Llamadas API
```

### Para Administradores de Sistemas

**Ruta recomendada:**

1. [INSTALLATION.md](INSTALLATION.md) - Instalación completa
2. [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Gestión de contenedores
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solución de problemas
4. Configurar `docker-compose.yml` - Ajustar puertos y recursos
5. Backup y restauración de datos

**Tareas comunes:**

- Monitorear logs: `docker compose logs -f`
- Reiniciar servicios: `docker compose restart`
- Backup de BD: Exportar volumen MySQL
- Actualizar sistema: `git pull && docker compose up -d --build`

### Para Usuarios Finales

**Ruta recomendada:**

1. [QUICKSTART.md](QUICKSTART.md) - Inicio rápido
2. [COMO_COMPARTIR.md](COMO_COMPARTIR.md) - Instalación paso a paso
3. Accede a http://localhost:3000
4. Usuario: `admin` / Contraseña: `admin123`
5. Explora cada módulo del sistema

**Módulos disponibles:**

- Dashboard
- Pacientes
- Citas
- Médicos
- Consultas
- Hospitalizaciones
- Facturas
- Usuarios

---

## 🔍 Búsqueda Rápida

### ¿Qué estás buscando?

| Necesito...                  | Consulta                                           |
| ---------------------------- | -------------------------------------------------- |
| **Instalar el sistema**      | [COMO_COMPARTIR.md](COMO_COMPARTIR.md)             |
| **Solucionar un error**      | [TROUBLESHOOTING.md](TROUBLESHOOTING.md)           |
| **Entender la arquitectura** | [ARCHITECTURE.md](ARCHITECTURE.md)                 |
| **Ver los endpoints API**    | [API_DOCUMENTATION.md](API_DOCUMENTATION.md)       |
| **Configurar Docker**        | [DOCKER_GUIDE.md](DOCKER_GUIDE.md)                 |
| **Inicio rápido**            | [QUICKSTART.md](QUICKSTART.md)                     |
| **Información general**      | [README.md](README.md)                             |
| **Comandos útiles**          | [DOCKER_SETUP_SUMMARY.md](DOCKER_SETUP_SUMMARY.md) |

---

## ❓ Preguntas Frecuentes

### ¿Por dónde empiezo?

👉 Lee [COMO_COMPARTIR.md](COMO_COMPARTIR.md) - Es la guía más completa para empezar.

### ¿Cómo instalo el sistema?

👉 Necesitas Docker y Git. Sigue [INSTALLATION.md](INSTALLATION.md).

### ¿Qué tecnologías usa?

👉 Java 17, Spring Boot 3.2, React 18, MySQL 8.0. Ver [README.md](README.md).

### ¿Cómo accedo al sistema?

👉 http://localhost:3000 con usuario `admin` y contraseña `admin123`.

### ¿Dónde están los endpoints de la API?

👉 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) tiene todos los detalles.

### ¿Qué hago si algo falla?

👉 Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md) primero.

### ¿Cómo contribuyo al proyecto?

👉 Fork el repo, haz cambios, abre un Pull Request. Ver [README.md](README.md).

### ¿Puedo cambiar los puertos?

👉 Sí, edita `docker-compose.yml`. Ver [DOCKER_GUIDE.md](DOCKER_GUIDE.md).

### ¿Cómo veo los logs?

👉 `docker compose logs -f`. Más comandos en [DOCKER_SETUP_SUMMARY.md](DOCKER_SETUP_SUMMARY.md).

### ¿Dónde está el código fuente?

👉 Backend: `backend/src/`, Frontend: `frontend/src/`.

---

## 📊 Estructura de la Documentación

```
Documentación/
│
├── 🚀 Inicio Rápido
│   ├── COMO_COMPARTIR.md      ⭐ Comienza aquí
│   ├── QUICKSTART.md
│   └── INSTALLATION.md
│
├── 📖 General
│   ├── README.md
│   └── PROJECT_SUMMARY.md
│
├── 🏗️ Técnica
│   ├── ARCHITECTURE.md
│   └── API_DOCUMENTATION.md
│
├── 🐳 Docker
│   ├── DOCKER_GUIDE.md
│   └── DOCKER_SETUP_SUMMARY.md
│
└── 🔧 Soporte
    └── TROUBLESHOOTING.md
```

---

## 📝 Convenciones

### Iconos Usados

- ⭐ **Recomendado** - Empieza por aquí
- 🚀 **Inicio Rápido** - Para empezar rápido
- 📖 **Referencia** - Para consultar
- 🔧 **Técnico** - Para desarrolladores
- 🐳 **Docker** - Relacionado con contenedores
- ❗ **Importante** - Presta atención
- ✅ **Completado** - Paso realizado
- ❌ **Error** - Algo salió mal
- 💡 **Consejo** - Sugerencia útil

---

## 🔄 Actualizaciones

Esta documentación se actualiza constantemente. Última actualización: **Octubre 2025**

Para ver cambios recientes:

```bash
git log --oneline -- *.md
```

---

## 🆘 ¿Necesitas Ayuda?

Si no encuentras lo que buscas:

1. **Busca en los archivos**: Usa Ctrl+F en tu navegador
2. **Revisa Issues**: https://github.com/rafaelchuco/evaluacion02/issues
3. **Abre un Issue nuevo**: Describe tu problema
4. **Contacta al autor**: Ver [README.md](README.md)

---

## 📞 Contacto

- 🐙 GitHub: [@rafaelchuco](https://github.com/rafaelchuco)
- 📧 Email: [Contacto]
- 🔗 Repositorio: https://github.com/rafaelchuco/evaluacion02

---

**¡Feliz lectura!** 📚

Si esta documentación te ayudó, considera dar una ⭐ en GitHub.
