#!/bin/bash

# Script para iniciar solo MySQL con Docker

echo "🐳 Iniciando MySQL con Docker..."
echo "================================="
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

# Detener contenedor existente
docker stop hospital-mysql 2>/dev/null
docker rm hospital-mysql 2>/dev/null

# Iniciar MySQL
echo "🚀 Levantando contenedor MySQL..."
docker run -d \
  --name hospital-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=hospital_db \
  -e MYSQL_USER=hospital_user \
  -e MYSQL_PASSWORD=hospital_password \
  -p 3306:3306 \
  -v hospital_mysql_data:/var/lib/mysql \
  -v "$(pwd)/backend/src/main/resources/data.sql:/docker-entrypoint-initdb.d/01-data.sql:ro" \
  -v "$(pwd)/backend/src/main/resources/datos-adicionales.sql:/docker-entrypoint-initdb.d/02-datos-adicionales.sql:ro" \
  mysql:8.0

echo ""
echo "⏳ Esperando a que MySQL esté listo..."
sleep 15

echo ""
echo "✅ MySQL está listo!"
echo ""
echo "📊 Información de conexión:"
echo "   Host: localhost"
echo "   Puerto: 3306"
echo "   Base de datos: hospital_db"
echo "   Usuario: hospital_user"
echo "   Contraseña: hospital_password"
echo ""
echo "🔗 Conectar desde terminal:"
echo "   mysql -h localhost -P 3306 -u hospital_user -p"
echo ""
echo "💡 Para detener:"
echo "   docker stop hospital-mysql"
echo ""
