import { useEffect, useState } from 'react'

/**
 * Persist a piece of state in localStorage.
 * Reads the saved value on first render, then writes whenever it changes.
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      // If storage is unavailable or JSON is invalid, fall back to the default.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write errors (private mode, quota, etc.).
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
