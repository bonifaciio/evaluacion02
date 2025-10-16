#!/bin/bash

# Script para iniciar el sistema con Docker

echo "🏥 Sistema de Gestión Hospitalaria - Docker Setup"
echo "=================================================="
echo ""

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker primero."
    echo "   Visita: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar que Docker Compose esté instalado
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose no está instalado."
    exit 1
fi

echo "✅ Docker está instalado"
echo ""

# Detener contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down 2>/dev/null || docker compose down 2>/dev/null
echo ""

# Limpiar volúmenes (opcional, comentado por seguridad)
# echo "🧹 Limpiando volúmenes antiguos..."
# docker-compose down -v
# echo ""

# Construir las imágenes
echo "🔨 Construyendo imágenes Docker..."
docker-compose build || docker compose build
echo ""

# Iniciar los contenedores
echo "🚀 Iniciando contenedores..."
docker-compose up -d || docker compose up -d
echo ""

# Esperar a que MySQL esté listo
echo "⏳ Esperando a que MySQL esté listo..."
sleep 10

# Verificar el estado de los contenedores
echo "📊 Estado de los contenedores:"
docker-compose ps || docker compose ps
echo ""

# Mostrar logs de inicialización
echo "📝 Logs de inicialización (últimas 20 líneas):"
docker-compose logs --tail=20 || docker compose logs --tail=20
echo ""

echo "✅ ¡Sistema iniciado exitosamente!"
echo ""
echo "🌐 Accede a la aplicación:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   MySQL:    localhost:3306"
echo ""
echo "👤 Credenciales de prueba:"
echo "   Usuario: admin"
echo "   Contraseña: password123"
echo ""
echo "📊 Comandos útiles:"
echo "   Ver logs:           docker-compose logs -f"
echo "   Detener sistema:    docker-compose down"
echo "   Reiniciar:          docker-compose restart"
echo "   Ver contenedores:   docker-compose ps"
echo ""
