import { useState, useRef } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTodoStore } from '@renderer/stores/todoStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { widgetBase, widgetTitle, widgetCount, inputBase, inputFocusBorder, inputBlurBorder } from '@styles/common.styles'
import { getTodoStyles } from '@styles/TodoList.styles'

export default function TodoList() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
  const s = getTodoStyles(t, accentColor)
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
      className="rounded-2xl h-full flex flex-col"
      style={{ ...widgetBase(t, widgetOpacity), padding: '24px 20px' }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between" style={{ marginBottom: 18 }}>
        <h3 style={widgetTitle(t)}>할 일</h3>
        <span style={widgetCount(t)}>
          {pending.length > 0 ? `${pending.length}개 남음` : '모두 완료!'}
        </span>
      </div>

      {/* Input row */}
      <div className="flex gap-2" style={{ marginBottom: 14 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="새 할 일 추가..."
          className="flex-1 rounded-xl focus:outline-none transition-colors"
          style={{ ...inputBase(t), ...s.inputRow }}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusBorder(t))}
          onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurBorder(t))}
        />
        <button
          onClick={handleAdd}
          className="rounded-xl flex items-center justify-center shrink-0 text-white transition-opacity hover:opacity-80"
          style={s.addBtn}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-0" style={{ marginRight: -4, paddingRight: 4 }}>
        {sorted.length === 0 ? (
          <p className="text-center py-10" style={s.emptyMsg}>
            할 일이 없어요!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sorted.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 rounded-xl group transition-colors"
                style={s.todoItem}
                onMouseEnter={(e) => (e.currentTarget.style.background = t.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="shrink-0 rounded-full border-2 flex items-center justify-center transition-all"
                  style={{ width: 18, height: 18, ...s.checkbox(todo.done) }}
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

                <span className="flex-1 transition-colors" style={s.todoText(todo.done)}>
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
          </div>
        )}
      </div>
    </div>
  )
}
