import { useState, useRef } from 'react'
import { Plus, Trash2, Calendar, Check, X } from 'lucide-react'
import { format, isToday, isTomorrow, startOfDay, isBefore } from 'date-fns'
import { useTodoStore } from '@renderer/stores/todoStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { widgetBase, widgetTitle, widgetCount, inputBase, inputFocusBorder, inputBlurBorder } from '@styles/Common.styles'
import { getTodoStyles } from '@styles/widgets/TodoList.styles'

function formatDueDate(ts: number): { label: string; overdue: boolean } {
  const dueDay = startOfDay(new Date(ts))
  const today = startOfDay(new Date())
  if (isToday(dueDay)) return { label: '오늘', overdue: false }
  if (isTomorrow(dueDay)) return { label: '내일', overdue: false }
  if (isBefore(dueDay, today)) return { label: format(dueDay, 'M월 d일'), overdue: true }
  return { label: format(dueDay, 'M월 d일'), overdue: false }
}

export default function TodoList() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
  const s = getTodoStyles(t, accentColor)
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodoStore()

  const [input, setInput] = useState('')
  const [dueInput, setDueInput] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const editRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const text = input.trim()
    if (!text) return
    const dueDate = dueInput ? new Date(dueInput + 'T00:00:00').getTime() : undefined
    addTodo(text, dueDate)
    setInput('')
    setDueInput('')
    setShowDatePicker(false)
    inputRef.current?.focus()
  }

  const startEdit = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
    setTimeout(() => editRef.current?.focus(), 0)
  }

  const commitEdit = (id: string) => {
    const text = editText.trim()
    if (text) editTodo(id, { text })
    setEditingId(null)
  }

  const pending = todos.filter((todo) => !todo.done)
  const done = todos.filter((todo) => todo.done)
  const sorted = [...pending, ...done]

  return (
    <div
      className="rounded-2xl h-full flex flex-col"
      style={{ ...widgetBase(t, widgetOpacity), ...s.container }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between" style={s.header}>
        <h3 style={widgetTitle(t)}>할 일</h3>
        <span style={widgetCount(t)}>
          {pending.length > 0 ? `${pending.length}개 남음` : '모두 완료!'}
        </span>
      </div>

      {/* Input area */}
      <div style={s.inputWrapper}>
        <div className="flex gap-2">
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
            onClick={() => setShowDatePicker((v) => !v)}
            className="rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
            style={s.calendarBtn(showDatePicker, dueInput !== '')}
            title="마감일 설정"
          >
            <Calendar size={15} />
          </button>
          <button
            onClick={handleAdd}
            className="rounded-xl flex items-center justify-center shrink-0 text-white transition-opacity hover:opacity-80"
            style={s.addBtn}
          >
            <Plus size={16} />
          </button>
        </div>

        {showDatePicker && (
          <input
            type="date"
            value={dueInput}
            onChange={(e) => setDueInput(e.target.value)}
            className="w-full rounded-xl focus:outline-none transition-colors mt-2"
            style={{ ...inputBase(t), ...s.dateInput }}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusBorder(t))}
            onBlur={(e) => Object.assign(e.currentTarget.style, inputBlurBorder(t))}
          />
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-0" style={s.listScroll}>
        {sorted.length === 0 ? (
          <p className="text-center py-10" style={s.emptyMsg}>
            할 일이 없어요!
          </p>
        ) : (
          <div style={s.listInner}>
            {sorted.map((todo) => {
              const due = todo.dueDate ? formatDueDate(todo.dueDate) : null
              return (
                <div
                  key={todo.id}
                  className="flex items-start gap-3 rounded-xl group transition-colors"
                  style={s.todoItem}
                  onMouseEnter={(e) => (e.currentTarget.style.background = t.hoverBg)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="shrink-0 rounded-full border-2 flex items-center justify-center transition-all mt-0.5"
                    style={s.checkbox(todo.done)}
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

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          ref={editRef}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEdit(todo.id)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          className="flex-1 focus:outline-none transition-colors"
                          style={{ ...inputBase(t), ...s.editInput }}
                          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusBorder(t))}
                          onBlur={(e) => {
                            Object.assign(e.currentTarget.style, inputBlurBorder(t))
                            commitEdit(todo.id)
                          }}
                        />
                        <button onClick={() => commitEdit(todo.id)} style={s.editConfirmBtn}>
                          <Check size={12} />
                        </button>
                        <button onClick={() => setEditingId(null)} style={s.editCancelBtn}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <span
                        className="block transition-colors"
                        style={{ ...s.todoText(todo.done), cursor: todo.done ? 'default' : 'text' }}
                        onDoubleClick={() => !todo.done && startEdit(todo.id, todo.text)}
                      >
                        {todo.text}
                      </span>
                    )}

                    {due && !todo.done && (
                      <span style={s.dueBadge(due.overdue)}>{due.label}</span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 mt-0.5 shrink-0"
                    style={s.deleteBtn}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}