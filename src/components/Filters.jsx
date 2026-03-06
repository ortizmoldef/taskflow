import useTaskStore from "../store/taskStore"
import { PRIORITIES, FILTERS_ESTADO, FILTERS_PRIORIDAD } from "../constants/priorities"
import { capitalize } from "../utils/helpers"
import FilterButton from "./FilterButton"

function Filters({ dark, onNewTask }) {
  const { filter, priorityFilter, search, setFilter, setPriorityFilter, setSearch } = useTaskStore()

  return (
    <div className="flex flex-wrap gap-2 items-center mb-5">
      <input
        className="flex-1 min-w-45 rounded-xl px-4 py-2 text-sm outline-none border transition-all duration-200 dark:bg-[#13131f] bg-white dark:text-[#e8e8f0] text-[#1a1a2e] dark:border-[#1e1e30] border-[#e0dff0] focus:border-violet-500"
        placeholder="🔍 Buscar tarea..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {FILTERS_ESTADO.map(f => (
        <FilterButton
          key={f}
          label={capitalize(f)}
          isActive={filter === f}
          onClick={() => setFilter(f)}
        />
      ))}

      {FILTERS_PRIORIDAD.map(p => (
        <FilterButton
          key={p}
          label={p === "todas" ? "🏷️ Todas" : capitalize(p)}
          isActive={priorityFilter === p}
          onClick={() => setPriorityFilter(p)}
          style={priorityFilter === p && p !== "todas"
            ? { background: PRIORITIES[p].color, borderColor: PRIORITIES[p].color }
            : {}
          }
        />
      ))}

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