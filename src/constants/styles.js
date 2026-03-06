export const btnBase = "border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200"
export const btnActive = "bg-violet-600 text-white border-violet-600"

export const btnInactive = (dark) =>
  dark
    ? "bg-[#13131f] text-[#a0a0c0] border-[#1e1e30]"
    : "bg-white text-[#555570] border-[#e0dff0]"


export const cardBtnStyle = (dark) => ({
  background: dark ? "#1a1a2e" : "#f0eff5",
  color: dark ? "#a0a0c0" : "#555570"
})

export const cardStyle = (dark) => ({
  background: dark ? "#13131f" : "#fff",
  borderColor: dark ? "#1e1e30" : "#e0dff0",
})

export const checkboxStyle = (done) => ({
  background: done ? "#7c6df0" : "transparent"
})

export const taskTitleStyle = (done) => ({
  fontFamily: "Syne, sans-serif",
  opacity: done ? 0.4 : 1,
  textDecoration: done ? "line-through" : "none"
})

export const checkmarkStyle = { color: "#fff", fontSize: 11 }

export const muted = { opacity: 0.5 }

export const deadlineStyle = (overdue) => ({
  color: overdue ? "#ef4444" : undefined,
  opacity: overdue ? 1 : 0.5,
  fontWeight: overdue ? 600 : 400
})

export const inputStyle = (dark) => ({
  background: dark ? "#0d0d12" : "#f5f4fc",
  color: dark ? "#e8e8f0" : "#1a1a2e",
  border: `1px solid ${dark ? "#2a2a40" : "#e0dff0"}`,
})