export function formatDate(d) {
  if (!d) return ""
  const [y, m, day] = d.split("-")
  return `${day}/${m}/${y}`
}

export function isOverdue(deadline, status) {
  if (!deadline || status === "completada") return false
  return new Date(deadline) < new Date()
}