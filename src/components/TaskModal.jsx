import { useState, useEffect } from "react"

function TaskModal({ dark, editing, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    priority: "media",
    deadline: ""
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        desc: editing.desc || "",
        priority: editing.priority,
        deadline: editing.deadline || ""
      })
    } else {
      setForm({ title: "", desc: "", priority: "media", deadline: "" })
    }
    setError(false) 
  }, [editing])

  // Función helper para actualizar campos
  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  function handleSave() {
    if (!form.title.trim()) {
      setError(true)
      return
    }
    onSave(form)
  }

  const inputStyle = {
    background: dark ? "#0d0d12" : "#f5f4fc",
    color: dark ? "#e8e8f0" : "#1a1a2e",
    border: `1px solid ${dark ? "#2a2a40" : "#e0dff0"}`,
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-7 w-full max-w-md border"
        style={{ background: dark ? "#13131f" : "#fff", borderColor: dark ? "#2a2a40" : "#e0dff0" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-lg font-extrabold mb-5" style={{ fontFamily: "Syne, sans-serif" }}>
          {editing ? "Editar tarea" : "Nueva tarea"}
        </div>

        {/* Título */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Título</label>
          <input
            className="w-full rounded-xl px-4 py-2 text-sm outline-none"
            style={{ ...inputStyle, borderColor: error ? "#ef4444" : inputStyle.border }}
            placeholder="¿Qué hay que hacer?"
            value={form.title}
            onChange={e => { updateField("title", e.target.value); setError(false) }}
          />
          {error && <p className="text-red-500 text-xs mt-1">El título es obligatorio</p>}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Descripción</label>
          <textarea
            className="w-full rounded-xl px-4 py-2 text-sm outline-none resize-y"
            style={{ ...inputStyle, minHeight: 70 }}
            placeholder="Detalles opcionales..."
            value={form.desc}
            onChange={e => updateField("desc", e.target.value)}
          />
        </div>

        {/* Prioridad */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Prioridad</label>
          <select
            className="w-full rounded-xl px-4 py-2 text-sm outline-none"
            style={inputStyle}
            value={form.priority}
            onChange={e => updateField("priority", e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        {/* Fecha límite */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Fecha límite</label>
          <input
            type="date"
            className="w-full rounded-xl px-4 py-2 text-sm outline-none"
            style={{ ...inputStyle, colorScheme: dark ? "dark" : "light" }}
            value={form.deadline}
            onChange={e => updateField("deadline", e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-3 justify-end">
          <button
            className="rounded-xl px-5 py-2 text-sm cursor-pointer border-none"
            style={{ background: dark ? "#1a1a2e" : "#f0eff5", color: dark ? "#a0a0c0" : "#555570" }}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rounded-xl px-5 py-2 text-sm font-bold cursor-pointer border-none bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
            onClick={handleSave}
          >
            {editing ? "Guardar cambios" : "Crear tarea"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal