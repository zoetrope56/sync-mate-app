import { create } from 'zustand'

interface ThemeState {
  accentColor: string
  widgetOpacity: number // 0–100
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
  accentColor: (saved.accentColor as string) ?? '#6988e6',
  widgetOpacity: (saved.widgetOpacity as number) ?? 70,

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
