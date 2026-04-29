import { useAuthStore } from '@renderer/stores/authStore'

export default function MainPage() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b1b1f]">
      <div className="text-center">
        <p className="text-4xl mb-4">🐣</p>
        <h2 className="text-xl font-semibold text-white mb-2">메이트가 기다리고 있어요!</h2>
        <p className="text-sm text-[rgba(235,235,245,0.6)] mb-8">Todo 기능이 곧 추가됩니다.</p>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-[#32363f] text-[rgba(235,235,245,0.6)] hover:bg-[#414853] transition-colors text-sm"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
