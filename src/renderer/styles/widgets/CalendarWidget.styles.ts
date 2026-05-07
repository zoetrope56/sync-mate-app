import type { ThemeTokens } from '@renderer/lib/theme'

export function getCalendarStyles(t: ThemeTokens, accentColor: string) {
  return {
    container: {
      padding: '24px 20px'
    } as React.CSSProperties,

    header: {
      marginBottom: 20
    } as React.CSSProperties,

    navBtn: {
      color: t.textMuted
    } as React.CSSProperties,

    dayLabelRow: {
      marginBottom: 6
    } as React.CSSProperties,

    monthTitle: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text,
      letterSpacing: '-0.01em',
      lineHeight: 1
    },

    dayLabel: (dow: number) => ({
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      color: dow === 0 ? t.sunday : dow === 6 ? t.saturday : t.textSubtle
    }),

    dateCell: (isToday: boolean, textColor: string): React.CSSProperties => ({
      fontSize: 12,
      lineHeight: 1,
      background: isToday ? accentColor : 'transparent',
      color: isToday ? '#fff' : textColor,
      fontWeight: isToday ? 600 : 400
    }),

    dateCellColor: (isCurrentMonth: boolean, dow: number): string => {
      if (!isCurrentMonth) return t.textSubtle
      if (dow === 0) return t.sunday
      if (dow === 6) return t.saturday
      return t.textSecondary
    }
  }
}
