import { useState, useEffect, useMemo } from "react"
import { Toaster, toast } from "react-hot-toast"
import Stats from "./components/Stats"
import Filters from "./components/Filters"
import TaskCard from "./components/TaskCard"
import TaskModal from "./components/TaskModal"
import useTaskStore from "./store/taskStore"

function App() {
  const [dark, setDark] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { tasks, filter, priorityFilter, search, addTask, editTask } = useTaskStore()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const filtered = useMemo(() => tasks.filter(t => {
    const matchStatus = filter === "todas" || t.status === filter
    const matchPriority = priorityFilter === "todas" || t.priority === priorityFilter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchPriority && matchSearch
  }), [tasks, filter, priorityFilter, search])

  function handleSave(form) {
    if (editing) {
      editTask(editing.id, form)
      toast.success("Tarea actualizada ✏️")
    } else {
      addTask(form)
      toast.success("Tarea creada 🎉")
    }
    setShowModal(false)
    setEditing(null)
  }

  function handleEdit(task) {
    setEditing(task)
    setShowModal(true)
  }

  function handleClose() {
    setShowModal(false)
    setEditing(null)
  }

  return (
    <div className="min-h-screen" style={{ background: dark ? "#0d0d12" : "#f0eff5", color: dark ? "#e8e8f0" : "#1a1a2e" }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div style={{ padding: "28px 32px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
          task<span style={{ color: "#7c6df0" }}>flow</span>
        </div>
        <button
          onClick={() => setDark(!dark)}
          style={{
            border: "none", cursor: "pointer", borderRadius: 50, padding: "8px 16px",
            fontSize: 13, fontWeight: 500,
            background: dark ? "#1e1e2e" : "#e0dff0",
            color: dark ? "#a0a0c0" : "#555570"
          }}
        >
          {dark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>
      </div>

      {/* Main */}
      <div style={{ padding: "24px 32px", maxWidth: 900, margin: "0 auto" }}>
        <Stats dark={dark} />
        <Filters dark={dark} onNewTask={() => setShowModal(true)} />

        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 opacity-35" style={{ fontFamily: "Syne, sans-serif" }}>
              ✨ No hay tareas que mostrar
            </div>
          )}
          {filtered.map(task => (
            <TaskCard key={task.id} task={task} dark={dark} onEdit={handleEdit} />
          ))}
        </div>
      </div>

      {showModal && (
        <TaskModal
          dark={dark}
          editing={editing}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default App