import { useLayoutEffect, useState } from 'react'
import FilterBar from './components/FilterBar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import useLocalStorage from './hooks/useLocalStorage'
import hngLogo from './assets/hng-logo.svg'
import internIcon from './assets/hng-intern-white.svg'
import { withTaskDefaults } from './taskOptions'
import './App.css'

/**
 * Root component: owns tasks, filters, search, and theme,
 * then passes handlers down to focused child components.
 */
function App() {
  const [tasks, setTasks] = useLocalStorage('todo-app.tasks', [])
  const [theme, setTheme] = useLocalStorage('taskforge.theme', 'light')
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [query, setQuery] = useState('')

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function addTask({ text, priority, dueDate, category }) {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      dueDate,
      category,
    }
    setTasks((current) => [...current, newTask])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function editTask(id, updates) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    )
  }

  function clearCompleted() {
    const confirmed = window.confirm('Remove all completed tasks?')
    if (!confirmed) return
    setTasks((current) => current.filter((task) => !task.completed))
  }

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleTasks = tasks.filter((rawTask) => {
    const task = withTaskDefaults(rawTask)

    if (filter === 'active' && task.completed) return false
    if (filter === 'completed' && !task.completed) return false
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false
    if (normalizedQuery && !task.text.toLowerCase().includes(normalizedQuery)) {
      return false
    }
    return true
  })

  const activeCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length
  const remainingLabel = `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left`
  const isDark = theme === 'dark'

  return (
    <div className="app">
      <header className="app__header">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 14.3A8.5 8.5 0 1 1 9.7 3a7 7 0 0 0 11.3 11.3z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <div className="app__brand">
          <img src={hngLogo} alt="HNG" className="app__logo" />
          <span className="app__badge">
            <img src={internIcon} alt="" />
            Internship
          </span>
        </div>
        <h1>
          TaskForge
          <span className="app__subtitle">the HNG Powered To-Do List</span>
        </h1>
      </header>

      <main className="app__card">
        <TodoForm onAdd={addTask} />
        <FilterBar
          currentFilter={filter}
          onChange={setFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />
        <label className="search-field">
          <span className="sr-only">Search tasks</span>
          <input
            type="search"
            placeholder="Search tasks..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <TodoList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
        <div className="app__footer">
          <p className="app__counter" aria-live="polite">
            {remainingLabel}
          </p>
          {completedCount > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
