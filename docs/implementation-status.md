# 구현 현황

> 최종 업데이트: 2026-04-29

## 요약

**로그인/JWT 인증 완료 단계.** Axios API 레이어, Zustand authStore, 로그인·회원가입 화면까지 구현됨. 다음 단계는 Todo UI + todoStore.

---

## 인프라 / 설정

| 항목 | 상태 |
|---|---|
| Electron + Vite + React + TypeScript 프로젝트 구조 | ✅ 완료 |
| ESLint + Prettier 설정 | ✅ 완료 |
| electron-builder 패키징 설정 (win/mac/linux) | ✅ 완료 |
| 핵심 라이브러리 설치 (zustand, axios, socket.io-client, framer-motion, tailwindcss 등) | ✅ 완료 |
| Tailwind CSS v4 Vite 플러그인 설정 (`@tailwindcss/vite`) | ✅ 완료 |

---

## Todo & 일정 관리

| 항목 | 상태 |
|---|---|
| Todo 목록 UI | ❌ 미구현 |
| Todo CRUD 로직 | ❌ 미구현 |
| Zustand todoStore | ❌ 미구현 |
| 마감 기한 / 알람 시간 설정 UI | ❌ 미구현 |
| 캘린더 뷰 | ❌ 미구현 |

---

## 캐릭터 시스템

| 항목 | 상태 |
|---|---|
| 캐릭터 표시 컴포넌트 | ❌ 미구현 |
| 감정 상태 애니메이션 (완료/미완료/집중) | ❌ 미구현 |
| Zustand characterStore (레벨, 친밀도, 기분) | ❌ 미구현 |
| 집중 타이머 UI 및 timerStore | ❌ 미구현 |

---

## 통신 / 동기화

| 항목 | 상태 |
|---|---|
| Axios 인스턴스 및 JWT 인터셉터 (`api/client.ts`) | ✅ 완료 |
| 인증 API 레이어 — login (form-urlencoded), register (`api/auth.ts`) | ✅ 완료 |
| Zustand authStore — localStorage 영속화 | ✅ 완료 |
| 로그인·회원가입 화면 (`LoginPage.tsx`) | ✅ 완료 |
| Todo API 레이어 (`api/todos.ts`) | ❌ 미구현 |
| Socket.io 연결 및 이벤트 핸들러 | ❌ 미구현 |

---

## Electron 고유 기능

| 항목 | 상태 |
|---|---|
| 투명 배경 위젯 모드 (`transparent`, `frame: false`) | ❌ 미구현 |
| 시스템 트레이 | ❌ 미구현 |
| IPC 핸들러 (알림 수신 등) | ❌ 미구현 |

---

## 개발 우선순위 제안

1. ~~**로그인 화면** → JWT 발급 및 저장~~ ✅ 완료
2. **Todo 기본 UI + Zustand todoStore** → 핵심 기능 ← **현재 단계**
3. **Todo Axios API 레이어** → GET/POST/PATCH/DELETE `/todos/` 연동
4. **캐릭터 컴포넌트** → Framer Motion 기반 감정 애니메이션
5. **Socket.io 연결** → 실시간 동기화
6. **Electron 위젯 모드** → 투명 배경, 트레이 등록
