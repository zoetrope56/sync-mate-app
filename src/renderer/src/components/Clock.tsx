import { useState, useEffect } from 'react'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월'
]

interface Props {
  accentColor: string
  opacity: number
}

export default function Clock({ accentColor, opacity }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  const secondsProgress = (now.getSeconds() / 60) * 100

  return (
    <div
      className="rounded-2xl p-8 flex flex-col items-center justify-center h-full gap-4"
      style={{
        background: `rgba(28, 28, 36, ${opacity / 100})`,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)'
      }}
    >
      <p className="text-xs tracking-widest uppercase text-[rgba(235,235,245,0.4)]">
        {DAYS[now.getDay()]}요일 · {MONTHS[now.getMonth()]} {now.getDate()}일
      </p>

      <div className="flex items-end gap-1">
        <span className="text-7xl font-extralight tracking-tight text-white leading-none">
          {h}:{m}
        </span>
      </div>

      <span className="text-3xl font-extralight tabular-nums" style={{ color: accentColor }}>
        {s}
      </span>

      <div className="w-full mt-2">
        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${secondsProgress}%`, background: accentColor }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[rgba(235,235,245,0.25)] mt-1.5 px-0.5">
          <span>0</span>
          <span>15</span>
          <span>30</span>
          <span>45</span>
          <span>60</span>
        </div>
      </div>
    </div>
  )
}
