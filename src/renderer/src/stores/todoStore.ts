import { create } from 'zustand'

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: number
}

interface TodoState {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const load = (): Todo[] => {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  } catch {
    return []
  }
}

const persist = (todos: Todo[]) => localStorage.setItem('todos', JSON.stringify(todos))

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: load(),

  addTodo: (text) => {
    const todos = [
      ...get().todos,
      { id: crypto.randomUUID(), text, done: false, createdAt: Date.now() }
    ]
    persist(todos)
    set({ todos })
  },

  toggleTodo: (id) => {
    const todos = get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    persist(todos)
    set({ todos })
  },

  deleteTodo: (id) => {
    const todos = get().todos.filter((t) => t.id !== id)
    persist(todos)
    set({ todos })
  }
}))
