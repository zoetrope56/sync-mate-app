import { create } from 'zustand'

export type ColorMode = 'light' | 'dark'

interface ThemeState {
  colorMode: ColorMode
  accentColor: string
  widgetOpacity: number // 0–100
  setColorMode: (mode: ColorMode) => void
  setAccentColor: (color: string) => void
  setWidgetOpacity: (opacity: number) => void
}

const load = (): Partial<ThemeState> => {
  try {
    return JSON.parse(localStorage.getItem('theme_settings') || '{}')
  } catch {
    return {}
  }
}

const saved = load()

export const useThemeStore = create<ThemeState>((set, get) => ({
  colorMode: (saved.colorMode as ColorMode) ?? 'light',
  accentColor: (saved.accentColor as string) ?? '#6988e6',
  widgetOpacity: (saved.widgetOpacity as number) ?? 70,

  setColorMode: (colorMode) => {
    const next = { ...get(), colorMode }
    localStorage.setItem('theme_settings', JSON.stringify(next))
    set({ colorMode })
  },
  setAccentColor: (accentColor) => {
    const next = { ...get(), accentColor }
    localStorage.setItem('theme_settings', JSON.stringify(next))
    set({ accentColor })
  },
  setWidgetOpacity: (widgetOpacity) => {
    const next = { ...get(), widgetOpacity }
    localStorage.setItem('theme_settings', JSON.stringify(next))
    set({ widgetOpacity })
  }
}))
