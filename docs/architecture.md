# 아키텍처

## Electron 3-프로세스 구조

```
src/
├── main/          # Node.js 프로세스 — BrowserWindow 생성, IPC 핸들러 등록
├── preload/       # 브릿지 — contextBridge로 안전한 API를 renderer에 노출
└── renderer/src/  # Chromium 프로세스 — React 앱
```

- **main ↔ renderer 통신**: `ipcMain` / `window.electron.ipcRenderer` (preload 경유)
- **renderer 경로 alias**: `@renderer/*` → `src/renderer/src/*`
- **TypeScript 설정 분리**: main·preload는 `tsconfig.node.json`, renderer는 `tsconfig.web.json`

## 상태 관리 전략 (Zustand)

```
stores/
├── todoStore      # Todo 목록, CRUD 액션
├── characterStore # 레벨, 친밀도, 현재 감정 상태, 스킨
└── timerStore     # 집중 타이머 상태
```

## 실시간 동기화 흐름

```
[Mobile / 다른 PC]
      │
      │  Socket.io 이벤트
      ▼
[NestJS 서버] ──────── Redis Pub/Sub ──────────▶ [Socket.io 워커]
      │
      │  emit → 'todo:updated' / 'character:updated'
      ▼
[이 Electron 앱 — renderer]
      │
      ▼
  Zustand store 업데이트 → 캐릭터 애니메이션 트리거
```

## 알람 발송 흐름

```
1. 사용자가 Todo에 알람 시간 설정
2. Axios POST → NestJS API
3. NestJS가 BullMQ 큐에 작업 등록 (Redis)
4. 지정 시각에 워커가 Telegram Bot API 호출
5. 캐릭터 페르소나 말투로 메시지 전송 (앱 종료 여부 무관)
```

## 데이터베이스 스키마 (백엔드 참고)

| 테이블 | 주요 필드 | 설명 |
|---|---|---|
| User | id, email, password, telegram_id | 사용자 정보 및 알람 수신 ID |
| Todo | id, user_id, content, is_completed, due_date | 할 일 내용 및 마감 기한 |
| MateStatus | user_id, exp, happiness, current_skin | 캐릭터 레벨, 기분, 스킨 상태 |
| Schedule | id, todo_id, alarm_time, status | 알람 예약 시간 및 발송 상태 |
| Timer | id, todo_id, duration, started_at | 집중 시간 기록 및 경험치 산정 |
