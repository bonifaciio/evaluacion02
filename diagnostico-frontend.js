// ============================================================================
// SCRIPT DE DIAGNÓSTICO - Ejecutar en la consola del navegador (F12)
// ============================================================================

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║         DIAGNÓSTICO DEL SISTEMA DE AUTENTICACIÓN            ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
console.log("");

// 1. Verificar LocalStorage
console.log("1️⃣  VERIFICANDO LOCAL STORAGE:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token) {
  console.log("✅ Token encontrado:");
  console.log("   " + token.substring(0, 50) + "...");
  console.log("   Longitud:", token.length, "caracteres");
} else {
  console.log("❌ NO HAY TOKEN en localStorage");
  console.log("   Solución: Debes iniciar sesión");
}

if (user) {
  console.log("✅ Usuario encontrado:");
  try {
    const userData = JSON.parse(user);
    console.log("   Nombre:", userData.nombreUsuario);
    console.log("   Rol:", userData.rol);
    console.log("   ID:", userData.id);
  } catch (e) {
    console.log("❌ Error al parsear usuario:", e.message);
  }
} else {
  console.log("❌ NO HAY USUARIO en localStorage");
}

console.log("");

// 2. Verificar que axios está configurado
console.log("2️⃣  VERIFICANDO AXIOS:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
if (window.axios) {
  console.log("✅ Axios está disponible");
} else {
  console.log("⚠️  Axios no encontrado en window");
}

console.log("");

// 3. Probar petición manual
console.log("3️⃣  PROBANDO PETICIÓN MANUAL:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

if (token) {
  console.log("Enviando petición GET /api/pacientes...");
  
  fetch('http://localhost:8080/api/pacientes', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log("Status:", response.status, response.statusText);
    if (response.ok) {
      return response.json();
    } else {
      console.log("❌ Error:", response.status);
      return response.text();
    }
  })
  .then(data => {
    if (Array.isArray(data)) {
      console.log("✅ Pacientes obtenidos:", data.length);
      console.log("Primeros 2 pacientes:");
      data.slice(0, 2).forEach(p => {
        console.log("  -", p.nombres, p.apellidos, "(" + p.dni + ")");
      });
    } else {
      console.log("❌ Respuesta no es un array:", data);
    }
  })
  .catch(error => {
    console.log("❌ Error en la petición:", error.message);
  });
} else {
  console.log("⚠️  No se puede probar sin token. Inicia sesión primero.");
}

console.log("");
console.log("════════════════════════════════════════════════════════════════");
console.log("  SOLUCIÓN SI HAY PROBLEMAS:");
console.log("════════════════════════════════════════════════════════════════");
console.log("");
console.log("Si el token o usuario no están:");
console.log("  1. Cierra sesión");
console.log("  2. Vuelve a iniciar sesión");
console.log("");
console.log("Si persiste:");
console.log("  localStorage.clear()");
console.log("  location.reload()");
console.log("");
