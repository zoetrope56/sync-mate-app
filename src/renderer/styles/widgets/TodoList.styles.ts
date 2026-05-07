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
