import { useState } from 'react'
import { Settings, X, Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { iconBtnBase, iconBtnHover, iconBtnLeave } from '@styles/Common.styles'
import { getThemePanelStyles } from '@styles/widgets/ThemePanel.styles'

const PRESET_COLORS = [
  { name: '인디고', value: '#6988e6' },
  { name: '보라', value: '#9b8ef5' },
  { name: '청록', value: '#2dd4bf' },
  { name: '핑크', value: '#f472b6' },
  { name: '주황', value: '#fb923c' },
  { name: '연두', value: '#86efac' }
]

export default function ThemePanel() {
  const { colorMode, accentColor, widgetOpacity, setColorMode, setAccentColor, setWidgetOpacity } =
    useThemeStore()
  const t = getTokens(colorMode)
  const s = getThemePanelStyles(t, accentColor, widgetOpacity)
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl transition-colors"
        style={iconBtnBase(t)}
        title="테마 설정"
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover(t))}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnLeave(t))}
      >
        <Settings size={17} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 flex flex-col"
            style={s.panel}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-6 pt-6 pb-5"
              style={s.panelHeader}
            >
              <h3 className="text-sm font-semibold" style={s.panelTitle}>
                테마 설정
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="transition-colors"
                style={iconBtnBase(t)}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 space-y-8">
              {/* Color mode toggle */}
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-4"
                  style={s.sectionLabel}
                >
                  화면 모드
                </p>
                <div className="flex rounded-xl p-1" style={s.modeToggleWrap}>
                  {(['light', 'dark'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColorMode(mode)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all"
                      style={s.modeTab(colorMode === mode)}
                    >
                      {mode === 'light' ? <Sun size={13} /> : <Moon size={13} />}
                      {mode === 'light' ? '라이트' : '다크'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent color */}
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-4"
                  style={s.sectionLabel}
                >
                  메인 컬러
                </p>
                <div className="grid grid-cols-6 gap-2.5 mb-4">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setAccentColor(c.value)}
                      title={c.name}
                      className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                      style={s.colorSwatch(
                        c.value,
                        accentColor.toLowerCase() === c.value.toLowerCase()
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl" style={s.colorPickerRow}>
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                    />
                    <div className="w-full h-full rounded-lg" style={s.colorPreview} />
                  </div>
                  <span className="text-sm font-mono" style={s.hexLabel}>
                    {accentColor.toUpperCase()}
                  </span>
                  <span className="text-xs ml-auto" style={s.customLabel}>
                    직접 선택
                  </span>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="text-xs font-medium uppercase tracking-widest"
                    style={s.sectionLabel}
                  >
                    위젯 투명도
                  </p>
                  <span className="text-sm font-mono" style={s.sectionLabel}>
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
                  style={{ accentColor } as React.CSSProperties}
                />
                <div className="flex justify-between text-[11px] mt-2" style={s.opacityLabels}>
                  <span>투명</span>
                  <span>불투명</span>
                </div>

                <div className="mt-4 h-10 rounded-xl" style={s.opacityPreview} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
