import { create } from "zustand"

// Helper interno para guardar en localStorage
const save = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks))

const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filter: "todas",
  priorityFilter: "todas",
  search: "",

  addTask: (task) => set((state) => {
    const updated = [...state.tasks, { ...task, id: Date.now(), status: "pendiente" }]
    save(updated)
    return { tasks: updated }
  }),

  editTask: (id, data) => set((state) => {
    const updated = state.tasks.map(t => t.id === id ? { ...t, ...data } : t)
    save(updated)
    return { tasks: updated }
  }),

  deleteTask: (id) => set((state) => {
    const updated = state.tasks.filter(t => t.id !== id)
    save(updated)
    return { tasks: updated }
  }),

  toggleTask: (id) => set((state) => {
    const updated = state.tasks.map(t =>
      t.id === id ? { ...t, status: t.status === "completada" ? "pendiente" : "completada" } : t
    )
    save(updated)
    return { tasks: updated }
  }),

  setFilter: (filter) => set({ filter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setSearch: (search) => set({ search }),
}))

export default useTaskStore