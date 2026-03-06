import toast from "react-hot-toast"
import useTaskStore from "../store/taskStore"
import { formatDate, isOverdue } from "../utils/helpers"
import { PRIORITIES } from "../constants/priorities"

function TaskCard({ task, dark, onEdit }) {
  const { toggleTask, deleteTask } = useTaskStore()

  const done = task.status === "completada"
  const overdue = isOverdue(task.deadline, task.status)
  const p = PRIORITIES[task.priority]

  const btnStyle = {
    background: dark ? "#1a1a2e" : "#f0eff5",
    color: dark ? "#a0a0c0" : "#555570"
  }

  function handleDelete() {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>¿Eliminar esta tarea?</span>
        <button
          className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg"
          onClick={() => {
            deleteTask(task.id)
            toast.dismiss(t.id)
            toast.success("Tarea eliminada 🗑️")
          }}
        >
          Eliminar
        </button>
        <button
          className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-lg"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>
      </div>
    ), { duration: 5000 })
  }

  return (
    <div
      className="rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 border"
      style={{
        background: dark ? "#13131f" : "#fff",
        borderColor: dark ? "#1e1e30" : "#e0dff0",
      }}
    >
      {/* Checkbox */}
      <div
        className="w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center shrink-0 mt-1 cursor-pointer transition-all duration-200"
        style={{ background: done ? "#7c6df0" : "transparent" }}
        onClick={() => toggleTask(task.id)}
      >
        {done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div
          className="text-base font-bold mb-1"
          style={{
            fontFamily: "Syne, sans-serif",
            opacity: done ? 0.4 : 1,
            textDecoration: done ? "line-through" : "none"
          }}
        >
          {task.title}
        </div>

        {task.desc && (
          <div className="text-sm mb-2" style={{ opacity: 0.5 }}>
            {task.desc}
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-semibold rounded-md px-2 py-1"
            style={{ color: p.color, background: p.bg }}
          >
            ● {p.label}
          </span>

          {task.deadline && (
            <span
              className="text-xs"
              style={{ color: overdue ? "#ef4444" : undefined, opacity: overdue ? 1 : 0.5, fontWeight: overdue ? 600 : 400 }}
            >
              {overdue ? "⚠️" : "📅"} {formatDate(task.deadline)}{overdue ? " · Vencida" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-2 shrink-0">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer border-none transition-all duration-200 hover:bg-violet-600"
          style={btnStyle}
          onClick={() => onEdit(task)}
        >
          ✏️
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer border-none transition-all duration-200 hover:bg-red-500"
          style={btnStyle}
          onClick={handleDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskCard