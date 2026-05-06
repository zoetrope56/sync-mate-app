import type { ThemeTokens } from '@renderer/lib/theme'

export function getTodoStyles(t: ThemeTokens, accentColor: string) {
  return {
    inputRow: {
      padding: '10px 14px',
      fontSize: 13,
      lineHeight: 1.4
    },

    addBtn: {
      width: 38,
      height: 38,
      background: accentColor
    } as React.CSSProperties,

    todoItem: {
      padding: '9px 12px'
    },

    checkbox: (done: boolean): React.CSSProperties =>
      done
        ? { background: accentColor, borderColor: accentColor }
        : { background: 'transparent', borderColor: t.textSubtle },

    todoText: (done: boolean): React.CSSProperties => ({
      fontSize: 13,
      lineHeight: 1.5,
      color: done ? t.textSubtle : t.textSecondary,
      textDecoration: done ? 'line-through' : 'none'
    }),

    emptyMsg: {
      fontSize: 13,
      lineHeight: 1.6,
      color: t.textSubtle
    }
  }
}
