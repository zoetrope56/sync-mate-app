import { LogOut } from 'lucide-react'
import { useAuthStore } from '@renderer/stores/authStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import Clock from '@renderer/components/Clock'
import CalendarWidget from '@renderer/components/CalendarWidget'
import TodoList from '@renderer/components/TodoList'
import ThemePanel from '@renderer/components/ThemePanel'

export default function MainPage() {
  const logout = useAuthStore((s) => s.logout)
  const { accentColor, widgetOpacity } = useThemeStore()

  return (
    <div className="h-screen flex flex-col bg-[#1b1b1f] p-5 gap-4 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between shrink-0">
        <span className="text-sm font-semibold tracking-wider text-[rgba(235,235,245,0.7)]">
          sync-mate
        </span>
        <div className="flex items-center gap-1">
          <ThemePanel />
          <button
            onClick={logout}
            title="로그아웃"
            className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.07)] transition-colors text-[rgba(235,235,245,0.45)] hover:text-white"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>

      {/* Widget grid */}
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        <Clock accentColor={accentColor} opacity={widgetOpacity} />
        <CalendarWidget accentColor={accentColor} opacity={widgetOpacity} />
        <TodoList accentColor={accentColor} opacity={widgetOpacity} />
      </div>
    </div>
  )
}
