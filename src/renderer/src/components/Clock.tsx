import { useState, useEffect } from 'react'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { widgetBase } from '@styles/Common.styles'
import { getClockStyles } from '@styles/widgets/Clock.styles'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function Clock() {
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
  const s = getClockStyles(t, accentColor)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const sec = String(now.getSeconds()).padStart(2, '0')
  const secondsProgress = (now.getSeconds() / 60) * 100

  return (
    <div
      className="rounded-2xl flex flex-col items-center justify-center h-full"
      style={{ ...widgetBase(t, widgetOpacity), ...s.container }}
    >
      <p className="text-[11px] tracking-widest uppercase" style={s.dateLabel}>
        {DAYS[now.getDay()]}요일 · {MONTHS[now.getMonth()]} {now.getDate()}일
      </p>

      <div style={s.timeWrapper}>
        <span className="tabular-nums font-extralight tracking-tight leading-none" style={s.timeDisplay}>
          {h}:{m}
        </span>
      </div>

      <span className="tabular-nums font-light leading-none" style={s.seconds}>
        {sec}
      </span>

      <div className="w-full">
        <div className="w-full rounded-full overflow-hidden" style={s.progressTrack}>
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={s.progressFill(secondsProgress)}
          />
        </div>
        <div className="flex justify-between mt-2 px-0.5" style={s.tickLabels}>
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
