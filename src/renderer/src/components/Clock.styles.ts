import type { ThemeTokens } from '@renderer/lib/theme'

export function getClockStyles(t: ThemeTokens, accentColor: string, widgetOpacity: number) {
  return {
    widget: {
      background: t.widgetBg(widgetOpacity),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${t.widgetBorder}`,
      padding: '32px 24px',
      gap: 0
    },

    dateLabel: {
      color: t.textMuted,
      marginBottom: 20,
      lineHeight: 1
    },

    timeDisplay: {
      fontSize: 68,
      color: t.text,
      display: 'block',
      textAlign: 'center' as const
    },

    seconds: {
      fontSize: 26,
      color: accentColor,
      marginBottom: 28,
      letterSpacing: '0.01em'
    },

    progressTrack: {
      height: 2,
      background: t.trackBg
    },

    progressFill: (pct: number) => ({
      width: `${pct}%`,
      background: accentColor
    }),

    tickLabels: {
      color: t.textSubtle,
      fontSize: 10,
      letterSpacing: '0.02em'
    }
  } as const
}
