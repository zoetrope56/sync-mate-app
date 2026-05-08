import type { ThemeTokens } from '@renderer/lib/theme'

export function getTodoStyles(t: ThemeTokens, accentColor: string) {
  return {
    container: {
      padding: '24px 20px'
    } as React.CSSProperties,

    header: {
      marginBottom: 18
    } as React.CSSProperties,

    inputWrapper: {
      marginBottom: 14
    } as React.CSSProperties,

    inputRow: {
      padding: '10px 14px',
      fontSize: 13,
      lineHeight: 1.4
    },

    calendarBtn: (active: boolean, hasDate: boolean): React.CSSProperties => ({
      width: 38,
      height: 38,
      background: active || hasDate ? `${accentColor}22` : t.inputBg,
      border: `1px solid ${active || hasDate ? accentColor : t.inputBorder}`,
      color: active || hasDate ? accentColor : t.textMuted,
      flexShrink: 0
    }),

    dateInput: {
      padding: '8px 14px',
      fontSize: 12,
      lineHeight: 1.4
    } as React.CSSProperties,

    addBtn: {
      width: 38,
      height: 38,
      background: accentColor
    } as React.CSSProperties,

    listScroll: {
      marginRight: -4,
      paddingRight: 4
    } as React.CSSProperties,

    listInner: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    } as React.CSSProperties,

    todoItem: {
      padding: '9px 12px'
    },

    checkbox: (done: boolean): React.CSSProperties => ({
      width: 18,
      height: 18,
      ...(done
        ? { background: accentColor, borderColor: accentColor }
        : { background: 'transparent', borderColor: t.textSubtle })
    }),

    todoText: (done: boolean): React.CSSProperties => ({
      fontSize: 13,
      lineHeight: 1.5,
      color: done ? t.textSubtle : t.textSecondary,
      textDecoration: done ? 'line-through' : 'none'
    }),

    editInput: {
      padding: '2px 8px',
      fontSize: 13,
      lineHeight: 1.5,
      borderRadius: 8
    } as React.CSSProperties,

    editConfirmBtn: {
      color: accentColor,
      flexShrink: 0
    } as React.CSSProperties,

    editCancelBtn: {
      color: t.textSubtle,
      flexShrink: 0
    } as React.CSSProperties,

    dueBadge: (overdue: boolean): React.CSSProperties => ({
      display: 'inline-block',
      marginTop: 4,
      fontSize: 10,
      lineHeight: 1,
      padding: '3px 6px',
      borderRadius: 6,
      background: overdue ? 'rgba(248,113,113,0.15)' : `${accentColor}18`,
      color: overdue ? 'rgba(248,113,113,0.9)' : accentColor,
      letterSpacing: '0.02em'
    }),

    deleteBtn: {
      color: t.textSubtle
    } as React.CSSProperties,

    emptyMsg: {
      fontSize: 13,
      lineHeight: 1.6,
      color: t.textSubtle
    }
  }
}
