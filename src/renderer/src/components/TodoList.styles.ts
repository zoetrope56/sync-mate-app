import type { ThemeTokens } from '@renderer/lib/theme'

export function getTodoStyles(t: ThemeTokens, accentColor: string, widgetOpacity: number) {
  return {
    widget: {
      background: t.widgetBg(widgetOpacity),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${t.widgetBorder}`,
      padding: '24px 20px'
    },

    header: {
      marginBottom: 18
    },

    title: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text,
      letterSpacing: '-0.01em',
      lineHeight: 1
    },

    count: {
      fontSize: 11,
      letterSpacing: '0.04em',
      color: t.textMuted,
      lineHeight: 1
    },

    inputRow: {
      marginBottom: 14
    },

    input: {
      padding: '10px 14px',
      fontSize: 13,
      lineHeight: 1.4,
      color: t.text,
      background: t.inputBg,
      border: `1px solid ${t.inputBorder}`
    },

    inputFocus: {
      borderColor: t.inputHoverBorder
    },

    inputBlur: {
      borderColor: t.inputBorder
    },

    addBtn: {
      width: 38,
      height: 38,
      background: accentColor
    },

    list: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 2
    },

    todoItem: {
      padding: '9px 12px'
    },

    todoItemHover: {
      background: t.hoverBg
    },

    todoItemLeave: {
      background: 'transparent'
    },

    checkbox: (done: boolean) =>
      done
        ? { background: accentColor, borderColor: accentColor }
        : { background: 'transparent', borderColor: t.textSubtle },

    todoText: (done: boolean) => ({
      fontSize: 13,
      lineHeight: 1.5,
      color: done ? t.textSubtle : t.textSecondary,
      textDecoration: done ? 'line-through' : 'none'
    }),

    deleteBtn: {
      color: t.textSubtle
    },

    emptyMsg: {
      fontSize: 13,
      lineHeight: 1.6,
      color: t.textSubtle
    }
  } as const
}
