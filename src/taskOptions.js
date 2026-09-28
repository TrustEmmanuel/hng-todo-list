export const PRIORITIES = ['Low', 'Medium', 'High']
export const CATEGORIES = ['Work', 'Personal', 'HNG Tasks']

/** Fill in fields missing from older saved tasks. */
export function withTaskDefaults(task) {
  return {
    priority: 'Medium',
    dueDate: '',
    category: 'Personal',
    ...task,
  }
}

/** A task is overdue when it has a due date before today and is still open. */
export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${task.dueDate}T00:00:00`)
  return due < today
}

export function formatDueDate(dueDate) {
  if (!dueDate) return ''
  const due = new Date(`${dueDate}T00:00:00`)
  if (Number.isNaN(due.getTime())) return dueDate
  return due.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
