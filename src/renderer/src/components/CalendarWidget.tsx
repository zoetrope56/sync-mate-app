import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

interface Cell {
  day: number
  current: boolean
}

function buildCells(year: number, month: number): Cell[] {
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells: Cell[] = []

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true })
  }
  let next = 1
  while (cells.length % 7 !== 0) {
    cells.push({ day: next++, current: false })
  }

  return cells
}

export default function CalendarWidget() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
  const today = new Date()
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = view.getFullYear()
  const month = view.getMonth()
  const cells = buildCells(year, month)

  const isToday = (cell: Cell) =>
    cell.current &&
    cell.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

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
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: t.textMuted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = t.hoverBg
            e.currentTarget.style.color = t.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = t.textMuted
          }}
        >
          <ChevronLeft size={15} />
        </button>
        <h3 className="text-sm font-medium tracking-wide" style={{ color: t.text }}>
          {year}년 {month + 1}월
        </h3>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: t.textMuted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = t.hoverBg
            e.currentTarget.style.color = t.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = t.textMuted
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div
            key={d}
            className="text-center text-[11px] font-medium py-1"
            style={{
              color: i === 0 ? t.sunday : i === 6 ? t.saturday : t.textSubtle
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 flex-1">
        {cells.map((cell, idx) => {
          const todayCell = isToday(cell)
          const dow = idx % 7

          let textColor = t.textSecondary
          if (!cell.current) textColor = t.textSubtle
          else if (dow === 0) textColor = t.sunday
          else if (dow === 6) textColor = t.saturday

          return (
            <div key={idx} className="flex items-center justify-center">
              <span
                className="w-7 h-7 flex items-center justify-center rounded-full text-xs transition-colors cursor-default"
                style={{
                  background: todayCell ? accentColor : 'transparent',
                  color: todayCell ? '#fff' : textColor,
                  fontWeight: todayCell ? 600 : 400
                }}
              >
                {cell.day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
