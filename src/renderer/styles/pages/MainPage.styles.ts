import type { ThemeTokens } from '@renderer/lib/theme'

export function getMainStyles(t: ThemeTokens, accentColor: string) {
  return {
    root: {
      background: t.bg
    } as React.CSSProperties,

    header: {
      height: 52,
      borderBottom: `1px solid ${t.divider}`
    },

    brandDot: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: accentColor,
      flexShrink: 0
    } as React.CSSProperties,

    brandText: {
      color: t.text,
      fontFamily: "'Syne', system-ui, sans-serif",
      letterSpacing: '-0.025em'
    },

    accentDot: {
      color: accentColor
    } as React.CSSProperties,

    logoutBtn: {
      color: t.textMuted
    } as React.CSSProperties,

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr 1.55fr',
      gap: 16
    } as React.CSSProperties
  }
}
