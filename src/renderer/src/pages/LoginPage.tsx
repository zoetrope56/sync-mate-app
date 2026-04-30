import { useState } from 'react'
import { login, register } from '@renderer/api/auth'
import { useAuthStore } from '@renderer/stores/authStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const setToken = useAuthStore((s) => s.setToken)
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
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
        const res = await login(email, password)
        console.log('[login] response:', res)
        if (!res.access_token) throw new Error('no_token')
        setToken(res.access_token)
      } else {
        await register({ email, password })
        const res = await login(email, password)
        console.log('[login] response:', res)
        if (!res.access_token) throw new Error('no_token')
        setToken(res.access_token)
      }
    } catch (err: unknown) {
      console.error('[login] error:', err)
      const message = (err as Error)?.message
      const status = (err as { response?: { status?: number } })?.response?.status
      if (message === 'no_token') {
        setError('서버 응답에 토큰이 없습니다. 백엔드를 확인해주세요.')
      } else if (mode === 'login') {
        setError(
          status === 401 ? '이메일 또는 비밀번호가 올바르지 않습니다.' : '로그인에 실패했습니다.'
        )
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: t.bg }}>
      <div
        className="w-full max-w-xs px-8 py-10 rounded-2xl"
        style={{
          background: t.widgetBg(widgetOpacity),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${t.widgetBorder}`
        }}
      >
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-xl font-semibold tracking-wider mb-1.5" style={{ color: t.text }}>
            sync-mate
          </h1>
          <p className="text-xs tracking-wide" style={{ color: t.textMuted }}>
            {mode === 'login' ? '다시 만나서 반가워요!' : '함께할 메이트를 만들어요'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs tracking-wide" style={{ color: t.textMuted }}>
              이메일
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
              style={{
                color: t.text,
                background: t.inputBg,
                border: `1px solid ${t.inputBorder}`
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor + '80')}
              onBlur={(e) => (e.currentTarget.style.borderColor = t.inputBorder)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs tracking-wide" style={{ color: t.textMuted }}>
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
              style={{
                color: t.text,
                background: t.inputBg,
                border: `1px solid ${t.inputBorder}`
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor + '80')}
              onBlur={(e) => (e.currentTarget.style.borderColor = t.inputBorder)}
            />
          </div>

          {/* Error — fixed height to prevent layout shift */}
          <p className="text-xs text-red-400 min-h-[1rem]">{error}</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition-opacity"
            style={{ background: accentColor }}
          >
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-xs text-center mt-5" style={{ color: t.textMuted }}>
          {mode === 'login' ? (
            <>
              계정이 없으신가요?{' '}
              <button
                onClick={() => { setMode('register'); setError('') }}
                className="hover:underline"
                style={{ color: accentColor }}
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button
                onClick={() => { setMode('login'); setError('') }}
                className="hover:underline"
                style={{ color: accentColor }}
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
