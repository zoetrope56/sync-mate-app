import { useState, useRef } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTodoStore } from '@renderer/stores/todoStore'

interface Props {
  accentColor: string
  opacity: number
}

export default function TodoList({ accentColor, opacity }: Props) {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const text = input.trim()
    if (!text) return
    addTodo(text)
    setInput('')
    inputRef.current?.focus()
  }

  const pending = todos.filter((t) => !t.done)
  const done = todos.filter((t) => t.done)
  const sorted = [...pending, ...done]

  return (
    <div
      className="rounded-2xl p-6 h-full flex flex-col"
      style={{
        background: `rgba(28, 28, 36, ${opacity / 100})`,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white">할 일</h3>
        <span className="text-xs text-[rgba(235,235,245,0.35)]">
          {pending.length > 0 ? `${pending.length}개 남음` : '모두 완료!'}
        </span>
      </div>

      {/* Input row */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="새 할 일 추가..."
          className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-[rgba(235,235,245,0.22)] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] focus:outline-none focus:border-[rgba(255,255,255,0.18)] transition-colors"
        />
        <button
          onClick={handleAdd}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white transition-opacity hover:opacity-80"
          style={{ background: accentColor }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
        {sorted.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.04)] group transition-colors"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className="w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
              style={
                todo.done
                  ? { background: accentColor, borderColor: accentColor }
                  : { background: 'transparent', borderColor: 'rgba(235,235,245,0.28)' }
              }
            >
              {todo.done && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path
                    d="M1 3L3 5L7 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <span
              className={`flex-1 text-sm leading-snug transition-colors ${
                todo.done
                  ? 'text-[rgba(235,235,245,0.28)] line-through'
                  : 'text-[rgba(235,235,245,0.82)]'
              }`}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[rgba(235,235,245,0.28)] hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-[rgba(235,235,245,0.2)] text-sm py-10">할 일이 없어요!</p>
        )}
      </div>
    </div>
  )
}
