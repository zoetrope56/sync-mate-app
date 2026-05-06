import type { ThemeTokens } from '@renderer/lib/theme'

export function getCalendarStyles(t: ThemeTokens, accentColor: string, widgetOpacity: number) {
  return {
    widget: {
      background: t.widgetBg(widgetOpacity),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${t.widgetBorder}`,
      padding: '24px 20px'
    },

    header: {
      marginBottom: 20
    },

    navBtn: {
      color: t.textMuted
    },

    navBtnHover: {
      background: t.hoverBg,
      color: t.text
    },

    navBtnLeave: {
      background: 'transparent',
      color: t.textMuted
    },

    monthTitle: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text,
      letterSpacing: '-0.01em',
      lineHeight: 1
    },

    dayLabels: {
      marginBottom: 6
    },

    dayLabel: (dow: number) => ({
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      color: dow === 0 ? t.sunday : dow === 6 ? t.saturday : t.textSubtle
    }),

    dateCell: (todayCell: boolean, textColor: string) => ({
      fontSize: 12,
      lineHeight: 1,
      background: todayCell ? accentColor : 'transparent',
      color: todayCell ? '#fff' : textColor,
      fontWeight: todayCell ? 600 : 400
    })
  } as const
}
