import { useState } from 'react'
import { login, register } from '@renderer/api/auth'
import { useAuthStore } from '@renderer/stores/authStore'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const setToken = useAuthStore((s) => s.setToken)
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { access_token } = await login(email, password)
        setToken(access_token)
      } else {
        await register({ email, password })
        const { access_token } = await login(email, password)
        setToken(access_token)
      }
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (mode === 'login') {
        setError(status === 401 ? '이메일 또는 비밀번호가 올바르지 않습니다.' : '로그인에 실패했습니다.')
      } else {
        if (status === 400) setError('이미 사용 중인 이메일입니다.')
        else if (status === 422) setError('비밀번호는 8자 이상이어야 합니다.')
        else setError('회원가입에 실패했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b1b1f]">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-[#222222] shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-2">sync-mate</h1>
        <p className="text-sm text-[rgba(235,235,245,0.6)] text-center mb-8">
          {mode === 'login' ? '다시 만나서 반가워요!' : '함께할 메이트를 만들어요'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[rgba(235,235,245,0.6)] mb-1">이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[#282828] text-white placeholder-[rgba(235,235,245,0.3)] border border-[#515c67] focus:outline-none focus:border-[#6988e6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-[rgba(235,235,245,0.6)] mb-1">비밀번호</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="w-full px-4 py-2.5 rounded-lg bg-[#282828] text-white placeholder-[rgba(235,235,245,0.3)] border border-[#515c67] focus:outline-none focus:border-[#6988e6] transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#6988e6] text-white font-semibold hover:bg-[#5a78d5] disabled:opacity-50 transition-colors"
          >
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <p className="text-sm text-center text-[rgba(235,235,245,0.6)] mt-6">
          {mode === 'login' ? (
            <>
              계정이 없으신가요?{' '}
              <button
                onClick={() => { setMode('register'); setError('') }}
                className="text-[#6988e6] hover:underline"
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button
                onClick={() => { setMode('login'); setError('') }}
                className="text-[#6988e6] hover:underline"
              >
                로그인
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
