import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { widgetBase, iconBtnHover, iconBtnLeave } from '@styles/common.styles'
import { getCalendarStyles } from '@styles/CalendarWidget.styles'

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
  const s = getCalendarStyles(t, accentColor)
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
      className="rounded-2xl h-full flex flex-col"
      style={{ ...widgetBase(t, widgetOpacity), padding: '24px 20px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: t.textMuted }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover(t))}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnLeave(t))}
        >
          <ChevronLeft size={15} />
        </button>

        <h3 style={s.monthTitle}>{year}년 {month + 1}월</h3>

        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: t.textMuted }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover(t))}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnLeave(t))}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7" style={{ marginBottom: 6 }}>
        {DAY_LABELS.map((d, i) => (
          <div key={d} className="text-center py-1" style={s.dayLabel(i)}>
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 flex-1">
        {cells.map((cell, idx) => {
          const todayCell = isToday(cell)
          const dow = idx % 7
          const textColor = s.dateCellColor(cell.current, dow)

          return (
            <div key={idx} className="flex items-center justify-center">
              <span
                className="w-[28px] h-[28px] flex items-center justify-center rounded-full cursor-default transition-colors"
                style={s.dateCell(todayCell, textColor)}
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
