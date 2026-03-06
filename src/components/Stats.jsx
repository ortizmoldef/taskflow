import useTaskStore from "../store/taskStore"
import { isOverdue } from "../utils/helpers"

function Stats({ dark }) {
  const tasks = useTaskStore(state => state.tasks)

  const total = tasks.length
  const completadas = tasks.filter(t => t.status === "completada").length
  const pendientes = tasks.filter(t => t.status === "pendiente").length
  const vencidas = tasks.filter(t => isOverdue(t.deadline, t.status)).length
  const progress = total ? Math.round((completadas / total) * 100) : 0

  const stats = [
    { label: "Total", value: total, color: "text-violet-500" },
    { label: "Pendientes", value: pendientes, color: "text-amber-400" },
    { label: "Completadas", value: completadas, color: "text-green-500" },
    { label: "Vencidas", value: vencidas, color: "text-red-500" },
  ]

  return (
    <div>
      {/* Tarjetas */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-2xl px-5 py-4 border dark:bg-[#13131f] bg-white dark:border-[#1e1e30] border-[#e0dff0]"
          >
            <div className="text-[11px] font-medium uppercase tracking-wide opacity-50 mb-2">
              {s.label}
            </div>
            <div
              className={`text-2xl font-bold leading-none ${s.color}`}
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="rounded-2xl p-5 border dark:bg-[#13131f] bg-white dark:border-[#1e1e30] border-[#e0dff0] flex items-center gap-4 mb-5">
        <div className="text-sm font-bold whitespace-nowrap" style={{ fontFamily: "Syne, sans-serif" }}>
          Progreso general
        </div>
        <div className="flex-1 h-2 rounded-full dark:bg-[#1e1e30] bg-[#e8e7f5] overflow-hidden">
          <div
            className="h-full rounded-full bg-linear-to-r from-violet-500 to-violet-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-base font-bold text-violet-500 min-w-10 text-right leading-none" style={{ fontFamily: "DM Sans, sans-serif" }}>
          {progress}%
        </div>
      </div>
    </div>
  )
}

export default Stats