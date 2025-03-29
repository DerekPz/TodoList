const express = require("express");
const sequelize = require("./db"); // Conexión a la base de datos
const taskRoutes = require("./routes/tasks"); // Rutas de tareas

const app = express(); // Creamos la app de Express
const PORT = 3000;     // Puerto donde correrá el servidor

// Configuración de la app
app.use(express.static("public"));

// Middleware
app.use(express.json()); // Permite leer JSON en el cuerpo de las peticiones

// Rutas
app.use("/tasks", taskRoutes); // Todas las rutas comenzarán con /tasks

// Sincronizamos Sequelize (crear tablas si no existen)
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌ Error al conectar la base de datos:", error);
});
