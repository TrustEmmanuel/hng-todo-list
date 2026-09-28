import { useEffect, useRef, useState } from 'react'
import {
  CATEGORIES,
  PRIORITIES,
  formatDueDate,
  isOverdue,
  withTaskDefaults,
} from '../taskOptions'

/**
 * A single task: checkbox, text, priority, due date, category, edit, and delete.
 */
function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const item = withTaskDefaults(task)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    text: item.text,
    priority: item.priority,
    dueDate: item.dueDate,
    category: item.category,
  })
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing() {
    setDraft({
      text: item.text,
      priority: item.priority,
      dueDate: item.dueDate,
      category: item.category,
    })
    setIsEditing(true)
  }

  function saveEdit() {
    const trimmed = draft.text.trim()
    if (!trimmed) {
      setDraft((current) => ({ ...current, text: item.text }))
      setIsEditing(false)
      return
    }

    onEdit(item.id, {
      text: trimmed,
      priority: draft.priority,
      dueDate: draft.dueDate,
      category: draft.category,
    })
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraft({
      text: item.text,
      priority: item.priority,
      dueDate: item.dueDate,
      category: item.category,
    })
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveEdit()
    }
    if (event.key === 'Escape') {
      cancelEdit()
    }
  }

  const overdue = isOverdue(item)
  const priorityClass = item.priority.toLowerCase()

  return (
    <li
      className={`todo-item${item.completed ? ' is-completed' : ''}${overdue ? ' is-overdue' : ''}`}
    >
      <label className="todo-item__check">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          aria-label={`Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`}
        />
      </label>

      <div className="todo-item__body">
        {isEditing ? (
          <div className="todo-item__editor">
            <input
              ref={inputRef}
              type="text"
              className="todo-item__edit"
              value={draft.text}
              onChange={(event) =>
                setDraft((current) => ({ ...current, text: event.target.value }))
              }
              onKeyDown={handleKeyDown}
              aria-label="Edit task"
            />
            <div className="todo-form__meta">
              <label className="todo-form__field">
                <span>Priority</span>
                <select
                  value={draft.priority}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      priority: event.target.value,
                    }))
                  }
                >
                  {PRIORITIES.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
              <label className="todo-form__field">
                <span>Due date</span>
                <input
                  type="date"
                  value={draft.dueDate}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      dueDate: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="todo-form__field">
                <span>Category</span>
                <select
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  {CATEGORIES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ) : (
          <>
            <span className="todo-item__text" onDoubleClick={startEditing}>
              {item.text}
            </span>
            <div className="todo-item__meta">
              <span className={`priority-badge priority-badge--${priorityClass}`}>
                {item.priority}
              </span>
              <span className="category-label">{item.category}</span>
              {item.dueDate && (
                <span className={`due-date${overdue ? ' is-overdue' : ''}`}>
                  {formatDueDate(item.dueDate)}
                </span>
              )}
              {overdue && <span className="overdue-label">Overdue</span>}
            </div>
          </>
        )}
      </div>

      <div className="todo-item__actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="todo-item__btn todo-item__btn--edit"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="todo-item__btn todo-item__btn--delete"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="todo-item__btn todo-item__btn--edit"
              onClick={startEditing}
            >
              Edit
            </button>
            <button
              type="button"
              className="todo-item__btn todo-item__btn--delete"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
