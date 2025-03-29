const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Definimos el modelo "Task"
const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,         // No se permite un título vacío
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,      // Por defecto, una tarea no está completada
  },
});

module.exports = Task;
