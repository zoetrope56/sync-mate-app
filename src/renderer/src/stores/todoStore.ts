import { create } from 'zustand'
import { todosApi, type TodoDTO } from '@renderer/api/todos'

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
  fetchTodos: () => Promise<void>
  addTodo: (text: string, dueDate?: number) => Promise<void>
  toggleTodo: (id: string) => Promise<void>
  editTodo: (id: string, patch: Partial<Pick<Todo, 'text' | 'dueDate' | 'alarmAt'>>) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

function fromDTO(dto: TodoDTO): Todo {
  return {
    id: String(dto.id),
    text: dto.title,
    done: dto.is_completed,
    createdAt: new Date(dto.created_at.replace(' ', 'T')).getTime(),
    dueDate: dto.due_date ? new Date(dto.due_date.replace(' ', 'T')).getTime() : undefined
  }
}

function toServerDueDate(ts: number | undefined): string | null {
  if (!ts) return null
  return new Date(ts).toISOString().split('T')[0]
}

// numeric server id — returns NaN for temp optimistic ids (_tmp_*)
function numericId(id: string): number {
  return Number(id)
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

  fetchTodos: async () => {
    try {
      const dtos = await todosApi.getAll()
      const todos = dtos.map(fromDTO)
      persist(todos)
      set({ todos })
    } catch {
      // keep localStorage data as offline fallback
    }
  },

  addTodo: async (text, dueDate) => {
    const tempId = `_tmp_${crypto.randomUUID()}`
    const optimistic: Todo = { id: tempId, text, done: false, createdAt: Date.now(), dueDate }

    const withTemp = [...get().todos, optimistic]
    persist(withTemp)
    set({ todos: withTemp })

    try {
      const dto = await todosApi.create({ title: text, due_date: toServerDueDate(dueDate) })
      const confirmed = get().todos.map((t) => (t.id === tempId ? fromDTO(dto) : t))
      persist(confirmed)
      set({ todos: confirmed })
    } catch {
      // API 실패 시 낙관적 항목을 로컬에 유지 (오프라인 모드)
    }
  },

  toggleTodo: async (id) => {
    const todos = get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    persist(todos)
    set({ todos })

    const sid = numericId(id)
    if (isNaN(sid)) return

    const updated = todos.find((t) => t.id === id)!
    try {
      await todosApi.update(sid, { is_completed: updated.done })
    } catch {
      // 로컬 상태 유지
    }
  },

  editTodo: async (id, patch) => {
    const todos = get().todos.map((t) => (t.id === id ? { ...t, ...patch } : t))
    persist(todos)
    set({ todos })

    const sid = numericId(id)
    if (isNaN(sid)) return

    try {
      const body: Parameters<typeof todosApi.update>[1] = {}
      if (patch.text !== undefined) body.title = patch.text
      if (patch.dueDate !== undefined) body.due_date = toServerDueDate(patch.dueDate)
      await todosApi.update(sid, body)
    } catch {
      // 로컬 상태 유지
    }
  },

  deleteTodo: async (id) => {
    const previous = get().todos
    const todos = previous.filter((t) => t.id !== id)
    persist(todos)
    set({ todos })

    const sid = numericId(id)
    if (isNaN(sid)) return

    try {
      await todosApi.remove(sid)
    } catch {
      persist(previous)
      set({ todos: previous })
    }
  }
}))
