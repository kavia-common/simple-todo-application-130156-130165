const KEY = 'rn_todos_v1';

/**
 * PUBLIC_INTERFACE
 * Load todos from localStorage (web) to simulate device persistence.
 * @returns {Array} List of todo objects.
 */
export function loadTodos() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Save todos to localStorage.
 * @param {Array} todos - List of todo objects to persist.
 */
export function saveTodos(todos) {
  try {
    localStorage.setItem(KEY, JSON.stringify(todos));
  } catch {
    // ignore
  }
}
