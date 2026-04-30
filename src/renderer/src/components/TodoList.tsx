import { useState, useRef } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTodoStore } from '@renderer/stores/todoStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'

export default function TodoList() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
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

  const pending = todos.filter((todo) => !todo.done)
  const done = todos.filter((todo) => todo.done)
  const sorted = [...pending, ...done]

  return (
    <div
      className="rounded-2xl p-6 h-full flex flex-col"
      style={{
        background: t.widgetBg(widgetOpacity),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${t.widgetBorder}`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium" style={{ color: t.text }}>
          할 일
        </h3>
        <span className="text-xs" style={{ color: t.textMuted }}>
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
          className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none transition-colors"
          style={{
            color: t.text,
            background: t.inputBg,
            border: `1px solid ${t.inputBorder}`,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = t.inputHoverBorder)}
          onBlur={(e) => (e.currentTarget.style.borderColor = t.inputBorder)}
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl group transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.background = t.hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className="w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
              style={
                todo.done
                  ? { background: accentColor, borderColor: accentColor }
                  : { background: 'transparent', borderColor: t.textSubtle }
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
              className="flex-1 text-sm leading-snug transition-colors"
              style={{
                color: todo.done ? t.textSubtle : t.textSecondary,
                textDecoration: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
              style={{ color: t.textSubtle }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-sm py-10" style={{ color: t.textSubtle }}>
            할 일이 없어요!
          </p>
        )}
      </div>
    </div>
  )
}
