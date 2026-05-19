import client from './client'

export interface TodoDTO {
  id: number
  title: string
  is_completed: boolean
  due_date: string | null
  created_at: string
}

interface CreateBody {
  title: string
  due_date?: string | null
}

interface UpdateBody {
  title?: string
  is_completed?: boolean
  due_date?: string | null
}

export const todosApi = {
  getAll: (): Promise<TodoDTO[]> =>
    client.get<TodoDTO[]>('/todos').then((r) => r.data),

  create: (body: CreateBody): Promise<TodoDTO> =>
    client.post<TodoDTO>('/todos', body).then((r) => r.data),

  update: (id: number, body: UpdateBody): Promise<TodoDTO> =>
    client.patch<TodoDTO>(`/todos/${id}`, body).then((r) => r.data),

  remove: (id: number): Promise<void> =>
    client.delete(`/todos/${id}`).then(() => undefined),
}
