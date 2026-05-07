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

```bash
cd ~/project/syncmate
./start.sh
```

API 서버와 Electron 앱을 한 번에 구동합니다. `Ctrl+C`로 두 프로세스를 함께 종료할 수 있습니다.

> `sync-mate-api/.env` 파일이 없으면 실행이 중단됩니다.

### 앱만 단독 실행

```bash
# 간편 실행 (의존성 설치 + Electron 바이너리 자동 처리)
./start.sh

# 또는 수동으로
npm install
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
├── main/        # Node.js — BrowserWindow, IPC 핸들러
├── preload/     # contextBridge — renderer에 안전한 API 노출
└── renderer/    # React 앱 (Chromium)
```

IPC: `ipcMain` (main) ↔ `window.electron.ipcRenderer` (renderer, preload 경유)

경로 alias: `@renderer/*` → `src/renderer/src/*`
