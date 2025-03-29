const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// 🔹 Crear tarea
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Obtener una tarea por ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    task ? res.json(task) : res.status(404).send("No encontrada");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).send("No encontrada");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.send("Eliminada");
    } else {
      res.status(404).send("No encontrada");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
