import useTaskStore from "../store/taskStore"
import { PRIORITIES } from "../constants/priorities"

const FILTERS_ESTADO = ["todas", "pendiente", "completada"]
const FILTERS_PRIORIDAD = ["todas", "alta", "media", "baja"]

function Filters({ dark, onNewTask }) {
  const { filter, priorityFilter, search, setFilter, setPriorityFilter, setSearch } = useTaskStore()

  const btnBase = "border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200"
  const btnInactive = dark ? "bg-[#13131f] text-[#a0a0c0] border-[#1e1e30]" : "bg-white text-[#555570] border-[#e0dff0]"
  const btnActive = "bg-violet-600 text-white border-violet-600"

  return (
    <div className="flex flex-wrap gap-2 items-center mb-5">
      {/* Búsqueda */}
      <input
        className="flex-1 min-w-45 rounded-xl px-4 py-2 text-sm outline-none border transition-all duration-200 dark:bg-[#13131f] bg-white dark:text-[#e8e8f0] text-[#1a1a2e] dark:border-[#1e1e30] border-[#e0dff0] focus:border-violet-500"
        placeholder="🔍 Buscar tarea..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Filtros estado */}
      {FILTERS_ESTADO.map(f => (
        <button
          key={f}
          className={`${btnBase} ${filter === f ? btnActive : btnInactive}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}

      {/* Filtros prioridad */}
      {FILTERS_PRIORIDAD.map(p => (
        <button
          key={p}
          className={`${btnBase} ${priorityFilter === p ? btnActive : btnInactive}`}
          onClick={() => setPriorityFilter(p)}
          style={priorityFilter === p && p !== "todas"
            ? { background: PRIORITIES[p].color, borderColor: PRIORITIES[p].color }
            : {}
          }
        >
          {p === "todas" ? "🏷️ Todas" : p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}

      {/* Botón nueva tarea */}
      <button
        className="rounded-xl px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all duration-200 whitespace-nowrap"
        style={{ fontFamily: "Syne, sans-serif" }}
        onClick={onNewTask}
      >
        + Nueva tarea
      </button>
    </div>
  )
}

export default Filters