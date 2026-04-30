import { useState, useEffect } from 'react'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function Clock() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
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
        background: t.widgetBg(widgetOpacity),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${t.widgetBorder}`
      }}
    >
      <p className="text-xs tracking-widest uppercase" style={{ color: t.textMuted }}>
        {DAYS[now.getDay()]}요일 · {MONTHS[now.getMonth()]} {now.getDate()}일
      </p>

      <div className="flex items-end gap-1">
        <span className="text-7xl font-extralight tracking-tight leading-none" style={{ color: t.text }}>
          {h}:{m}
        </span>
      </div>

      <span className="text-3xl font-extralight tabular-nums" style={{ color: accentColor }}>
        {s}
      </span>

      <div className="w-full mt-2">
        <div
          className="w-full h-[2px] rounded-full overflow-hidden"
          style={{ background: t.trackBg }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${secondsProgress}%`, background: accentColor }}
          />
        </div>
        <div
          className="flex justify-between text-[10px] mt-1.5 px-0.5"
          style={{ color: t.textSubtle }}
        >
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
