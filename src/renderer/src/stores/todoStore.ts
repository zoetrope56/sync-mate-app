import { create } from 'zustand'

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: number
  dueDate?: number
  alarmAt?: number
}

interface TodoState {
  todos: Todo[]
  addTodo: (text: string, dueDate?: number) => void
  toggleTodo: (id: string) => void
  editTodo: (id: string, patch: Partial<Pick<Todo, 'text' | 'dueDate' | 'alarmAt'>>) => void
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

  addTodo: (text, dueDate) => {
    const todos = [
      ...get().todos,
      { id: crypto.randomUUID(), text, done: false, createdAt: Date.now(), dueDate }
    ]
    persist(todos)
    set({ todos })
  },

  toggleTodo: (id) => {
    const todos = get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    persist(todos)
    set({ todos })
  },

  editTodo: (id, patch) => {
    const todos = get().todos.map((t) => (t.id === id ? { ...t, ...patch } : t))
    persist(todos)
    set({ todos })
  },

  deleteTodo: (id) => {
    const todos = get().todos.filter((t) => t.id !== id)
    persist(todos)
    set({ todos })
  }
}))
