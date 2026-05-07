import { LogOut } from 'lucide-react'
import { useAuthStore } from '@renderer/stores/authStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import Clock from '@renderer/components/Clock'
import CalendarWidget from '@renderer/components/CalendarWidget'
import TodoList from '@renderer/components/TodoList'
import ThemePanel from '@renderer/components/ThemePanel'
import { getMainStyles } from '@styles/pages/MainPage.styles'
import { iconBtnHover, iconBtnLeave } from '@styles/Common.styles'

export default function MainPage() {
  const logout = useAuthStore((s) => s.logout)
  const { colorMode, accentColor } = useThemeStore()
  const t = getTokens(colorMode)
  const s = getMainStyles(t, accentColor)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={s.root}>
      <header className="flex items-center justify-between px-6 shrink-0" style={s.header}>
        <div className="flex items-center gap-2.5">
          <div style={s.brandDot} />
          <span
            className="text-sm font-bold tracking-tight"
            style={s.brandText}
          >
            sync<span style={s.accentDot}>·</span>mate
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <ThemePanel />
          <button
            onClick={logout}
            title="로그아웃"
            className="p-2 rounded-xl transition-colors"
            style={s.logoutBtn}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover(t))}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnLeave(t))}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-5" style={s.grid}>
        <Clock />
        <CalendarWidget />
        <TodoList />
      </main>
    </div>
  )
}
