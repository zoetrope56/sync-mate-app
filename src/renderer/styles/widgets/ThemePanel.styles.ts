import type { ThemeTokens } from '@renderer/lib/theme'

export function getThemePanelStyles(t: ThemeTokens, accentColor: string, widgetOpacity: number) {
  return {
    panel: {
      background: t.panelBg,
      backdropFilter: 'blur(30px)',
      borderLeft: `1px solid ${t.panelBorder}`
    } as React.CSSProperties,

    panelHeader: {
      borderBottom: `1px solid ${t.divider}`
    } as React.CSSProperties,

    panelTitle: {
      color: t.text
    } as React.CSSProperties,

    sectionLabel: {
      color: t.textMuted
    } as React.CSSProperties,

    modeToggleWrap: {
      background: t.inputBg,
      border: `1px solid ${t.inputBorder}`
    } as React.CSSProperties,

    modeTab: (active: boolean): React.CSSProperties =>
      active
        ? { background: accentColor, color: '#fff' }
        : { background: 'transparent', color: t.textMuted },

    colorSwatch: (value: string, isSelected: boolean): React.CSSProperties => ({
      background: value,
      outline: isSelected ? `2px solid ${value}` : '2px solid transparent',
      outlineOffset: '2px'
    }),

    colorPickerRow: {
      background: t.inputBg,
      border: `1px solid ${t.inputBorder}`
    } as React.CSSProperties,

    colorPreview: {
      background: accentColor
    } as React.CSSProperties,

    hexLabel: {
      color: t.textSecondary
    } as React.CSSProperties,

    customLabel: {
      color: t.textSubtle
    } as React.CSSProperties,

    opacityLabels: {
      color: t.textSubtle
    } as React.CSSProperties,

    opacityPreview: {
      background: t.widgetBg(widgetOpacity),
      backdropFilter: 'blur(20px)',
      border: `1px solid ${t.widgetBorder}`
    } as React.CSSProperties
  }
}
