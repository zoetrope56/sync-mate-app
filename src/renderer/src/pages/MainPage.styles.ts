import type { ThemeTokens } from '@renderer/lib/theme'

export function getMainStyles(t: ThemeTokens, accentColor: string) {
  return {
    root: {
      // layout handled by Tailwind classes
    },

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
    },

    brandText: {
      color: t.text,
      fontFamily: "'Syne', system-ui, sans-serif",
      letterSpacing: '-0.025em'
    },

    brandAccent: {
      color: accentColor
    },

    headerBtn: {
      color: t.textMuted
    },

    headerBtnHover: {
      background: t.hoverBg,
      color: t.text
    },

    headerBtnLeave: {
      background: 'transparent',
      color: t.textMuted
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr 1.55fr',
      gap: 16
    }
  } as const
}
