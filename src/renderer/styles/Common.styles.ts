import type { ThemeTokens } from '@renderer/lib/theme'

/** 위젯 공통 컨테이너 (Clock, CalendarWidget, TodoList) */
export function widgetBase(t: ThemeTokens, widgetOpacity: number) {
  return {
    background: t.widgetBg(widgetOpacity),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${t.widgetBorder}`
  }
}

/** 위젯 헤더 타이틀 (CalendarWidget, TodoList) */
export function widgetTitle(t: ThemeTokens) {
  return {
    fontSize: 15,
    fontWeight: 600,
    color: t.text,
    letterSpacing: '-0.01em',
    lineHeight: 1
  }
}

/** 위젯 헤더 보조 텍스트 (할 일 개수 등) */
export function widgetCount(t: ThemeTokens) {
  return {
    fontSize: 11,
    letterSpacing: '0.04em',
    color: t.textMuted,
    lineHeight: 1
  }
}

/** 아이콘 버튼 기본 색상 */
export function iconBtnBase(t: ThemeTokens): React.CSSProperties {
  return { color: t.textMuted }
}

/** 아이콘 버튼 hover 시 적용 */
export function iconBtnHover(t: ThemeTokens): Partial<React.CSSProperties> {
  return { background: t.hoverBg, color: t.text }
}

/** 아이콘 버튼 leave 시 적용 */
export function iconBtnLeave(t: ThemeTokens): Partial<React.CSSProperties> {
  return { background: 'transparent', color: t.textMuted }
}

/** 인풋 기본 스타일 */
export function inputBase(t: ThemeTokens): React.CSSProperties {
  return {
    color: t.text,
    background: t.inputBg,
    border: `1px solid ${t.inputBorder}`
  }
}

/** 인풋 focus 테두리 */
export function inputFocusBorder(t: ThemeTokens): Partial<React.CSSProperties> {
  return { borderColor: t.inputHoverBorder }
}

/** 인풋 blur 테두리 */
export function inputBlurBorder(t: ThemeTokens): Partial<React.CSSProperties> {
  return { borderColor: t.inputBorder }
}
