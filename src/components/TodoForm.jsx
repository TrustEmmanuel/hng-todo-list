import { useState } from 'react'
import { CATEGORIES, PRIORITIES } from '../taskOptions'

/**
 * Form for creating a task: text, priority, due date, and category.
 * Submits on the Add button or when the user presses Enter in the text field.
 */
function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('Personal')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    onAdd({ text: trimmed, priority, dueDate, category })
    setText('')
    setPriority('Medium')
    setDueDate('')
    setCategory('Personal')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <label className="sr-only" htmlFor="new-task">
          New task
        </label>
        <input
          id="new-task"
          type="text"
          className="todo-form__input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(event) => setText(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="todo-form__submit">
          Add
        </button>
      </div>

      <div className="todo-form__meta">
        <label className="todo-form__field">
          <span>Priority</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
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
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>

        <label className="todo-form__field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  )
}

export default TodoForm
