# 기술 스택

## Frontend (이 저장소)

| 분류 | 라이브러리 | 용도 |
|---|---|---|
| UI 프레임워크 | React 19 | 화면 구성 |
| 데스크톱 런타임 | Electron | 네이티브 앱 실행, 투명 위젯 모드 |
| 빌드 도구 | electron-vite | Vite 기반 빌드 + HMR |
| 언어 | TypeScript | 타입 안전성 |
| 애니메이션 | Framer Motion | 캐릭터 애니메이션 핵심 |
| 상태 관리 | Zustand | 가벼운 전역 상태 |
| HTTP 통신 | Axios | REST API 호출 |
| 실시간 통신 | Socket.io-client | 기기 간 실시간 동기화 |
| 스타일링 | Tailwind CSS v4 + tailwind-merge + clsx | 유틸리티 기반 스타일 |
| 아이콘 | lucide-react | UI 아이콘 |
| 날짜 처리 | date-fns | 마감 기한, 타이머 계산 |

## Backend (별도 저장소)

| 분류 | 기술 | 용도 |
|---|---|---|
| 런타임 | Node.js | 서버 실행 환경 |
| 프레임워크 | NestJS | API 서버 |
| DB | PostgreSQL | 관계형 데이터 저장 |
| ORM | Prisma | 타입 안전 쿼리 |
| 인메모리 DB | Redis | 알람 큐 & 동기화 |
| 태스크 큐 | BullMQ | 정밀한 예약 알람 관리 |
| 알림 | Telegram Bot API (Telegraf) | 캐릭터 페르소나 알림 |
| 인증 | JWT | 로그인 및 기기 인증 |
