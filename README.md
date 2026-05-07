# sync-mate-app

> 내 할 일을 함께 관리하고 성장하는 다마고치형 데스크톱 메이트

할 일 상태에 따라 실시간으로 반응하는 캐릭터, 기기 간 실시간 동기화, 앱 종료 시에도 작동하는 텔레그램 알림을 제공하는 데스크톱 앱.

## 문서

| 문서 | 설명 |
|---|---|
| [개요](docs/overview.md) | 프로젝트 배경, 핵심 가치, 향후 확장 계획 |
| [기능 요구사항](docs/requirements.md) | Todo, 캐릭터, 알림, 동기화 요구사항 |
| [기술 스택](docs/tech-stack.md) | FE / BE 라이브러리 목록 |
| [아키텍처](docs/architecture.md) | Electron 3-프로세스, Zustand, 실시간 동기화 흐름 |
| [구현 현황](docs/implementation-status.md) | 항목별 완료 / 미구현 상태 및 개발 우선순위 |

## 개발 시작

### 통합 실행 (API + 앱 동시 구동)

`~/project/syncmate/start.sh` — API 서버와 Electron 앱을 한 번에 구동합니다. `Ctrl+C`로 두 프로세스를 함께 종료할 수 있습니다.

```bash
#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$PROJECT_DIR/sync-mate-api"
APP_DIR="$PROJECT_DIR/sync-mate-app"

cleanup() {
  [ -n "$API_PID" ] && kill "$API_PID" 2>/dev/null
  [ -n "$APP_PID" ] && kill "$APP_PID" 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM

# API 서버
if [ ! -d "$API_DIR/venv" ]; then python3 -m venv "$API_DIR/venv"; fi
"$API_DIR/venv/bin/pip" install -r "$API_DIR/requirements.txt" -q
if [ ! -f "$API_DIR/.env" ]; then echo ".env not found"; exit 1; fi
(cd "$API_DIR" && "$API_DIR/venv/bin/alembic" upgrade head)
(cd "$API_DIR" && "$API_DIR/venv/bin/uvicorn" app.main:app --reload --host 0.0.0.0 --port 8000) &
API_PID=$!

# Electron 앱
if [ ! -d "$APP_DIR/node_modules" ]; then (cd "$APP_DIR" && npm install); fi
if [ ! -f "$APP_DIR/node_modules/electron/path.txt" ]; then
  (cd "$APP_DIR" && node node_modules/electron/install.js)
fi
(cd "$APP_DIR" && npm run dev) &
APP_PID=$!

wait
```

> `sync-mate-api/.env` 파일이 없으면 실행이 중단됩니다.

### 앱만 단독 실행

`sync-mate-app/start.sh` — API 서버는 별도로 실행한 상태에서 앱만 구동합니다.

```bash
#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

if [ ! -d "node_modules" ]; then npm install; fi
if [ ! -f "node_modules/electron/path.txt" ]; then
  node node_modules/electron/install.js
fi

npm run dev
```

> API 서버는 `sync-mate-api/start.sh`에서 별도로 실행합니다.

## 주요 명령어

```bash
npm run dev          # 개발 서버 (Electron + Vite HMR)
npm run build        # 타입 검사 + 프로덕션 빌드
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # main/preload + renderer 타입 검사

# 플랫폼별 배포 빌드
npm run build:win
npm run build:mac
npm run build:linux
```

## 기술 스택

- **Runtime**: Electron + React 19 + TypeScript
- **Build**: electron-vite
- **State**: Zustand
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS v4 + tailwind-merge + clsx
- **HTTP**: Axios
- **Realtime**: Socket.io-client
- **Backend**: NestJS + PostgreSQL + Redis (별도 저장소)

## 아키텍처 요약

```
src/
├── main/
│   └── index.ts              # BrowserWindow 생성, IPC 핸들러 등록
├── preload/
│   ├── index.ts              # contextBridge로 renderer에 안전한 API 노출
│   └── index.d.ts            # window.api 타입 선언
└── renderer/
    ├── index.html
    ├── styles/               # 컴포넌트별 공유 스타일 (Tailwind 클래스 상수)
    │   ├── common.styles.ts
    │   ├── CalendarWidget.styles.ts
    │   ├── Clock.styles.ts
    │   ├── LoginPage.styles.ts
    │   ├── MainPage.styles.ts
    │   └── TodoList.styles.ts
    └── src/
        ├── main.tsx          # React 진입점
        ├── App.tsx           # 라우팅 (로그인 ↔ 메인)
        ├── api/
        │   ├── client.ts     # axios 인스턴스 (baseURL, 인터셉터)
        │   └── auth.ts       # 로그인 / 로그아웃 API
        ├── components/
        │   ├── CalendarWidget.tsx
        │   ├── Clock.tsx
        │   ├── ThemePanel.tsx
        │   ├── TodoList.tsx
        │   └── Versions.tsx
        ├── pages/
        │   ├── LoginPage.tsx
        │   └── MainPage.tsx
        ├── stores/           # Zustand 전역 상태
        │   ├── authStore.ts  # 인증 토큰 / 사용자 정보
        │   ├── themeStore.ts # 테마 설정
        │   └── todoStore.ts  # Todo 목록
        ├── lib/
        │   └── theme.ts      # 테마 유틸리티
        └── assets/           # SVG, CSS
```

IPC: `ipcMain` (main) ↔ `window.electron.ipcRenderer` (renderer, preload 경유)

경로 alias: `@renderer/*` → `src/renderer/src/*`
