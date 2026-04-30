import type { ColorMode } from '@renderer/stores/themeStore'

export interface ThemeTokens {
  bg: string
  widgetBg: (opacity: number) => string
  widgetBorder: string
  panelBg: string
  panelBorder: string
  divider: string
  text: string
  textSecondary: string
  textMuted: string
  textSubtle: string
  hoverBg: string
  inputBg: string
  inputBorder: string
  inputHoverBorder: string
  trackBg: string
  sunday: string
  saturday: string
}

const dark: ThemeTokens = {
  bg: '#1b1b1f',
  widgetBg: (o) => `rgba(28,28,36,${o / 100})`,
  widgetBorder: 'rgba(255,255,255,0.07)',
  panelBg: 'rgba(22,22,30,0.97)',
  panelBorder: 'rgba(255,255,255,0.08)',
  divider: 'rgba(255,255,255,0.06)',
  text: '#ffffff',
  textSecondary: 'rgba(235,235,245,0.6)',
  textMuted: 'rgba(235,235,245,0.4)',
  textSubtle: 'rgba(235,235,245,0.25)',
  hoverBg: 'rgba(255,255,255,0.07)',
  inputBg: 'rgba(255,255,255,0.05)',
  inputBorder: 'rgba(255,255,255,0.07)',
  inputHoverBorder: 'rgba(255,255,255,0.18)',
  trackBg: 'rgba(255,255,255,0.08)',
  sunday: 'rgba(248,113,113,0.75)',
  saturday: 'rgba(96,165,250,0.75)'
}

const light: ThemeTokens = {
  bg: '#f0f0f5',
  widgetBg: (o) => `rgba(255,255,255,${o / 100})`,
  widgetBorder: 'rgba(0,0,0,0.07)',
  panelBg: 'rgba(244,244,250,0.98)',
  panelBorder: 'rgba(0,0,0,0.08)',
  divider: 'rgba(0,0,0,0.07)',
  text: '#1c1c24',
  textSecondary: 'rgba(28,28,36,0.6)',
  textMuted: 'rgba(28,28,36,0.45)',
  textSubtle: 'rgba(28,28,36,0.28)',
  hoverBg: 'rgba(0,0,0,0.05)',
  inputBg: 'rgba(0,0,0,0.05)',
  inputBorder: 'rgba(0,0,0,0.08)',
  inputHoverBorder: 'rgba(0,0,0,0.2)',
  trackBg: 'rgba(0,0,0,0.08)',
  sunday: 'rgba(220,38,38,0.7)',
  saturday: 'rgba(37,99,235,0.7)'
}

export const getTokens = (mode: ColorMode): ThemeTokens => (mode === 'dark' ? dark : light)
