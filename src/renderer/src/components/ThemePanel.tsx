import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { useThemeStore } from '@renderer/stores/themeStore'

const PRESET_COLORS = [
  { name: '인디고', value: '#6988e6' },
  { name: '보라', value: '#9b8ef5' },
  { name: '청록', value: '#2dd4bf' },
  { name: '핑크', value: '#f472b6' },
  { name: '주황', value: '#fb923c' },
  { name: '연두', value: '#86efac' }
]

export default function ThemePanel() {
  const { accentColor, widgetOpacity, setAccentColor, setWidgetOpacity } = useThemeStore()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.07)] transition-colors text-[rgba(235,235,245,0.45)] hover:text-white"
        title="테마 설정"
      >
        <Settings size={17} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 flex flex-col"
            style={{
              background: 'rgba(22, 22, 30, 0.97)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-sm font-semibold text-white">테마 설정</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-[rgba(235,235,245,0.4)] hover:text-white transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 space-y-8">
              {/* Accent color */}
              <div>
                <p className="text-xs font-medium text-[rgba(235,235,245,0.5)] uppercase tracking-widest mb-4">
                  메인 컬러
                </p>
                <div className="grid grid-cols-6 gap-2.5 mb-4">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setAccentColor(c.value)}
                      title={c.name}
                      className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                      style={{
                        background: c.value,
                        outline:
                          accentColor.toLowerCase() === c.value.toLowerCase()
                            ? `2px solid ${c.value}`
                            : '2px solid transparent',
                        outlineOffset: '2px'
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                    />
                    <div className="w-full h-full rounded-lg" style={{ background: accentColor }} />
                  </div>
                  <span className="text-sm font-mono text-[rgba(235,235,245,0.6)]">
                    {accentColor.toUpperCase()}
                  </span>
                  <span className="text-xs text-[rgba(235,235,245,0.3)] ml-auto">직접 선택</span>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-medium text-[rgba(235,235,245,0.5)] uppercase tracking-widest">
                    위젯 투명도
                  </p>
                  <span className="text-sm font-mono text-[rgba(235,235,245,0.5)]">
                    {widgetOpacity}%
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={95}
                  step={1}
                  value={widgetOpacity}
                  onChange={(e) => setWidgetOpacity(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor }}
                />
                <div className="flex justify-between text-[11px] text-[rgba(235,235,245,0.25)] mt-2">
                  <span>투명</span>
                  <span>불투명</span>
                </div>

                {/* Preview swatch */}
                <div
                  className="mt-4 h-10 rounded-xl border border-[rgba(255,255,255,0.07)]"
                  style={{
                    background: `rgba(28, 28, 36, ${widgetOpacity / 100})`,
                    backdropFilter: 'blur(20px)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
