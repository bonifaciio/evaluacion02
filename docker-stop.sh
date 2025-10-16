#!/bin/bash

# Script para detener el sistema Docker

echo "🛑 Deteniendo Sistema de Gestión Hospitalaria..."
echo "================================================"
echo ""

# Detener contenedores
docker-compose down || docker compose down

echo ""
echo "✅ Sistema detenido exitosamente"
echo ""
echo "💡 Para eliminar también los datos (volúmenes):"
echo "   docker-compose down -v"
echo ""
