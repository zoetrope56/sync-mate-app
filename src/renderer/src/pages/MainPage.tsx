import { LogOut } from 'lucide-react'
import { useAuthStore } from '@renderer/stores/authStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import Clock from '@renderer/components/Clock'
import CalendarWidget from '@renderer/components/CalendarWidget'
import TodoList from '@renderer/components/TodoList'
import ThemePanel from '@renderer/components/ThemePanel'

export default function MainPage() {
  const logout = useAuthStore((s) => s.logout)
  const { colorMode } = useThemeStore()
  const t = getTokens(colorMode)

  return (
    <div className="h-screen flex flex-col p-5 gap-4 overflow-hidden" style={{ background: t.bg }}>
      {/* Top bar */}
      <div className="flex items-center justify-between shrink-0">
        <span className="text-sm font-semibold tracking-wider" style={{ color: t.textSecondary }}>
          sync-mate
        </span>
        <div className="flex items-center gap-1">
          <ThemePanel />
          <button
            onClick={logout}
            title="로그아웃"
            className="p-2 rounded-xl transition-colors"
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
            <LogOut size={17} />
          </button>
        </div>
      </div>

      {/* Widget grid */}
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        <Clock />
        <CalendarWidget />
        <TodoList />
      </div>
    </div>
  )
}
