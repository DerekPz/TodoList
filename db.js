const { Sequelize } = require("sequelize");

// Creamos la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: "sqlite",           // Tipo de base de datos: SQLite
  storage: "database.sqlite"   // Archivo físico donde se guardarán los datos
});

module.exports = sequelize;
// Exportamos la conexión para usarla en otros archivos