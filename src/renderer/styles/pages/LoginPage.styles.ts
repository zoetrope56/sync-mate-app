import type { ThemeTokens } from '@renderer/lib/theme'

interface LoginStyleOpts {
  isDark: boolean
  accentColor: string
  widgetOpacity: number
  focusedField: string | null
}

export function getLoginStyles(t: ThemeTokens, opts: LoginStyleOpts) {
  const { isDark, accentColor, widgetOpacity, focusedField } = opts
  const dotColor = isDark ? 'rgba(255,255,255,0.028)' : 'rgba(0,0,0,0.038)'

  return {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: t.bg,
      position: 'relative' as const,
      overflow: 'hidden'
    },

    dotGrid: {
      position: 'absolute' as const,
      inset: 0,
      backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      pointerEvents: 'none' as const
    },

    ambientGlow: {
      position: 'absolute' as const,
      width: 640,
      height: 640,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${accentColor}1c 0%, transparent 65%)`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none' as const
    },

    card: {
      position: 'relative' as const,
      zIndex: 1,
      width: 420,
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: `1px solid ${t.widgetBorder}`,
      borderRadius: 28,
      padding: '48px 40px',
      background: t.widgetBg(widgetOpacity),
      boxShadow: isDark
        ? `0 48px 120px rgba(0,0,0,0.5), 0 0 0 1px ${t.widgetBorder}`
        : `0 24px 80px rgba(0,0,0,0.08), 0 0 0 1px ${t.widgetBorder}`
    },

    brandSubtitle: {
      fontSize: 11,
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      color: t.textMuted,
      margin: '0 0 10px',
      lineHeight: 1
    },

    brandTitle: {
      fontSize: 32,
      fontWeight: 800,
      color: t.text,
      margin: 0,
      letterSpacing: '-0.04em',
      fontFamily: "'Syne', system-ui, sans-serif",
      lineHeight: 1.05
    },

    modeTabs: {
      display: 'flex',
      gap: 4,
      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
      borderRadius: 14,
      padding: 4,
      marginBottom: 28
    },

    modeTab: (active: boolean): React.CSSProperties => ({
      flex: 1,
      padding: '9px 0',
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1,
      border: 'none',
      cursor: 'pointer',
      borderRadius: 10,
      transition: 'all 0.2s ease',
      background: active ? (isDark ? 'rgba(255,255,255,0.12)' : 'white') : 'transparent',
      color: active ? t.text : t.textMuted,
      boxShadow: active
        ? isDark
          ? '0 1px 6px rgba(0,0,0,0.35)'
          : '0 1px 6px rgba(0,0,0,0.1)'
        : 'none',
      fontFamily: "'Syne', system-ui, sans-serif",
      letterSpacing: '0.01em'
    }),

    fieldLabel: {
      display: 'block',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: t.textMuted,
      marginBottom: 8,
      lineHeight: 1
    },

    fieldInput: (field: string): React.CSSProperties => ({
      width: '100%',
      boxSizing: 'border-box' as const,
      padding: '13px 16px',
      fontSize: 14,
      lineHeight: 1.4,
      color: t.text,
      background: t.inputBg,
      border: `1.5px solid ${focusedField === field ? accentColor : t.inputBorder}`,
      borderRadius: 12,
      outline: 'none',
      transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
      boxShadow:
        focusedField === field ? `0 0 0 3.5px ${accentColor}1a` : '0 0 0 3.5px transparent',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }),

    errorMsg: {
      fontSize: 13,
      lineHeight: 1.5,
      color: '#f87171',
      margin: '-4px 0 0',
      padding: '10px 14px',
      background: 'rgba(248,113,113,0.08)',
      borderRadius: 10,
      border: '1px solid rgba(248,113,113,0.18)'
    },

    submitBtn: (loading: boolean): React.CSSProperties => ({
      width: '100%',
      marginTop: 4,
      padding: '14px 0',
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1,
      color: '#fff',
      background: loading
        ? `color-mix(in srgb, ${accentColor} 55%, transparent)`
        : accentColor,
      border: 'none',
      borderRadius: 12,
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'background 0.2s ease',
      letterSpacing: '0.04em',
      fontFamily: "'Syne', system-ui, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }),

    spinner: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: 'white',
      display: 'inline-block',
      animation: 'spin 0.7s linear infinite'
    } as React.CSSProperties,

    footer: {
      marginTop: 28,
      fontSize: 12,
      lineHeight: 1.6,
      color: t.textMuted,
      textAlign: 'center' as const
    },

    footerLink: {
      color: accentColor,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 600,
      padding: 0
    } as React.CSSProperties,

    brandWrapper: {
      marginBottom: 36
    } as React.CSSProperties,

    logoWrapper: {
      marginBottom: 20
    } as React.CSSProperties,

    accentDot: {
      color: accentColor
    } as React.CSSProperties,

    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    } as React.CSSProperties
  }
}
