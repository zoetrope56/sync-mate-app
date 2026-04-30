import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

interface Props {
  accentColor: string
  opacity: number
}

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

export default function CalendarWidget({ accentColor, opacity }: Props) {
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
        background: `rgba(28, 28, 36, ${opacity / 100})`,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.07)] transition-colors text-[rgba(235,235,245,0.4)] hover:text-white"
        >
          <ChevronLeft size={15} />
        </button>
        <h3 className="text-sm font-medium text-white tracking-wide">
          {year}년 {month + 1}월
        </h3>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.07)] transition-colors text-[rgba(235,235,245,0.4)] hover:text-white"
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
              color:
                i === 0
                  ? 'rgba(248,113,113,0.7)'
                  : i === 6
                    ? 'rgba(96,165,250,0.7)'
                    : 'rgba(235,235,245,0.3)'
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

          let textColor = 'rgba(235,235,245,0.75)'
          if (!cell.current) textColor = 'rgba(235,235,245,0.18)'
          else if (dow === 0) textColor = 'rgba(248,113,113,0.7)'
          else if (dow === 6) textColor = 'rgba(96,165,250,0.7)'

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
