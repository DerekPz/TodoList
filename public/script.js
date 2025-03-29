// Elementos del DOM (HTML)
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterSelect = document.getElementById("filter-select");
let currentFilter = "all"; // valor por defecto

// Función para cargar tareas desde el backend
async function loadTasks() {
  taskList.innerHTML = ""; // Limpiar lista antes de volver a cargar

  const res = await fetch("/tasks");
  const tasks = await res.json();

  // 🔍 Filtrar tareas según el filtro actual
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true; // "all"
  });

  // ✅ Actualizar los contadores
  document.getElementById("total-count").textContent = tasks.length;
  document.getElementById("pending-count").textContent = tasks.filter(t => !t.completed).length;

  // Mostrar tareas
  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // 🔹 Texto de la tarea (editable)
    const span = document.createElement("span");
    span.textContent = task.title;
    span.style.cursor = "pointer";

    // Doble clic para editar
    span.ondblclick = () => {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = task.title;

      inputEdit.onblur = async () => {
        const newTitle = inputEdit.value.trim();
        if (newTitle && newTitle !== task.title) {
          await fetch(`/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
          });
          loadTasks();
        } else {
          span.textContent = task.title;
        }
      };

      li.replaceChild(inputEdit, span);
      inputEdit.focus();
    };

    // 🔹 Botón para marcar como completada
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.className = "complete";
    completeBtn.onclick = async () => {
      await fetch(`/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      loadTasks();
    };

    // 🔹 Botón para eliminar tarea
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete";
    deleteBtn.onclick = async () => {
      await fetch(`/tasks/${task.id}`, {
        method: "DELETE",
      });
      loadTasks();
    };

    // ✅ Agrupar botones a la derecha
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";
    buttonGroup.appendChild(completeBtn);
    buttonGroup.appendChild(deleteBtn);

    // ✅ Añadir texto y botones al <li>
    li.appendChild(span);
    li.appendChild(buttonGroup);
    taskList.appendChild(li);
  });
}

// Evento para agregar nueva tarea
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskInput.value.trim();
  if (!title) return;

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  taskInput.value = "";
  loadTasks();
});

// Evento para cambiar filtro
filterSelect.addEventListener("change", (e) => {
  currentFilter = e.target.value;
  loadTasks();
});

// Cargar tareas al iniciar
loadTasks();
