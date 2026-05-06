import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { login, register } from '@renderer/api/auth'
import { useAuthStore } from '@renderer/stores/authStore'
import { useThemeStore } from '@renderer/stores/themeStore'
import { getTokens } from '@renderer/lib/theme'
import { getLoginStyles } from '@styles/LoginPage.styles'

type Mode = 'login' | 'register'

function OrbitalMark({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14.5" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
      <circle
        cx="16"
        cy="16"
        r="8.5"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="4 2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.5" fill={color} />
      <circle cx="16" cy="7.5" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
  )
}

export default function LoginPage() {
  const setToken = useAuthStore((s) => s.setToken)
  const { colorMode, accentColor, widgetOpacity } = useThemeStore()
  const t = getTokens(colorMode)
  const isDark = colorMode === 'dark'

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const s = getLoginStyles(t, { isDark, accentColor, widgetOpacity, focusedField })

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&display=swap'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        const res = await login(email, password)
        if (!res.access_token) throw new Error('no_token')
        setToken(res.access_token)
      } else {
        await register({ email, password })
        const res = await login(email, password)
        if (!res.access_token) throw new Error('no_token')
        setToken(res.access_token)
      }
    } catch (err: unknown) {
      const message = (err as Error)?.message
      const status = (err as { response?: { status?: number } })?.response?.status
      if (message === 'no_token') {
        setError('서버 응답에 토큰이 없습니다.')
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
    <div style={s.container}>
      <div style={s.dotGrid} />
      <div style={s.ambientGlow} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={s.card}
      >
        {/* Brand */}
        <div style={{ marginBottom: 36 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ marginBottom: 20 }}
          >
            <OrbitalMark color={accentColor} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={s.brandSubtitle}
          >
            {mode === 'login' ? '다시 만나서 반가워요' : '함께할 메이트를 만들어요'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            style={s.brandTitle}
          >
            sync<span style={{ color: accentColor }}>·</span>mate
          </motion.h1>
        </div>

        {/* Mode tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.33, duration: 0.4 }}
          style={s.modeTabs}
        >
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m)
                setError('')
              }}
              style={s.modeTab(mode === m)}
            >
              {m === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <div>
            <label style={s.fieldLabel}>이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              style={s.fieldInput('email')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div>
            <label style={s.fieldLabel}>비밀번호</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              style={s.fieldInput('password')}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.22 }}
                style={s.errorMsg}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={loading ? {} : { scale: 1.012 }}
            whileTap={loading ? {} : { scale: 0.988 }}
            style={s.submitBtn(loading)}
          >
            {loading ? (
              <>
                <span style={s.spinner} />
                처리 중
              </>
            ) : (
              <>{mode === 'login' ? '로그인' : '시작하기'} →</>
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58, duration: 0.4 }}
          style={s.footer}
        >
          {mode === 'login' ? (
            <>
              계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError('') }}
                style={s.footerLink}
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError('') }}
                style={s.footerLink}
              >
                로그인
              </button>
            </>
          )}
        </motion.p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
