import TodoItem from './TodoItem'

/**
 * Renders the visible list of tasks, or an empty-state message.
 */
function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="todo-list__empty">No tasks to show.</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default TodoList
