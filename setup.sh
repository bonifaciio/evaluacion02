#!/bin/bash

echo "================================================"
echo "  Sistema de Gestión Hospitalaria - Inicio"
echo "================================================"
echo ""

# Verificar si MySQL está corriendo
echo "⏳ Verificando MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar si Java está instalado
echo "⏳ Verificando Java..."
if ! command -v java &> /dev/null; then
    echo "❌ Java no está instalado. Por favor instala JDK 17."
    exit 1
fi

# Verificar si Maven está instalado
echo "⏳ Verificando Maven..."
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar si Node.js está instalado
echo "⏳ Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

echo ""
echo "✅ Todos los requisitos están instalados"
echo ""

# Crear base de datos si no existe
echo "⏳ Configurando base de datos..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;
SELECT 'Base de datos configurada correctamente' AS mensaje;
EOF

echo ""
echo "✅ Base de datos configurada"
echo ""

# Compilar backend
echo "⏳ Compilando backend (Spring Boot)..."
cd backend
mvn clean install -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Error al compilar el backend"
    exit 1
fi
echo "✅ Backend compilado exitosamente"
echo ""

# Instalar dependencias del frontend si es necesario
if [ ! -d "frontend/node_modules" ]; then
    echo "⏳ Instalando dependencias del frontend..."
    cd ../frontend
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error al instalar dependencias del frontend"
        exit 1
    fi
    echo "✅ Dependencias instaladas"
    cd ..
fi

echo ""
echo "================================================"
echo "  🎉 ¡Todo listo para comenzar!"
echo "================================================"
echo ""
echo "Para iniciar el sistema:"
echo ""
echo "1️⃣  Backend (Spring Boot):"
echo "   cd backend && mvn spring-boot:run"
echo "   URL: http://localhost:8080"
echo ""
echo "2️⃣  Frontend (React):"
echo "   cd frontend && npm start"
echo "   URL: http://localhost:3000"
echo ""
echo "📝 Usuarios de prueba:"
echo "   admin / password123"
echo "   dr.garcia / password123"
echo ""
echo "================================================"
