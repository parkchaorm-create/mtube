# 튜토리얼 영상 자동 제작 워크플로우 설계안

스크립트 → 음성 → 화면 캡처 → 인포그래픽 B-roll → 완성 영상 자동화

---

## 현실적 평가 먼저

**완전 자동화 가능한 것 (지금 당장):**
- TTS(텍스트→음성) 생성
- 슬라이드 이미지 자동 생성
- 영상 클립 조합 및 자막 삽입
- 인포그래픽 생성 (코드 기반)

**반자동 필요한 것 (사람 개입 최소화):**
- 실제 화면 조작 캡처 (computer use로 가능하나 불안정)
- 클로즈업 타이밍 지정
- 최종 편집 품질 검수

**아직 어려운 것 (기술 한계):**
- 실시간 화면 캡처 + 음성 싱크 완전 자동화
- 얼굴(웹캠) 영상과 화면 자동 합성

---

## 추천 워크플로우 – 3단계 파이프라인

```
[스크립트 MD]
      ↓
┌─────────────────────────────────────┐
│ STAGE 1: 음성 + 자막 생성           │
│ - ElevenLabs API → 음성 MP3         │
│ - Whisper API → 자막 SRT            │
└─────────────────────────────────────┘
      ↓
┌─────────────────────────────────────┐
│ STAGE 2: 화면 자료 생성             │
│ - Playwright/Computer Use → 화면 캡처│
│ - Python Manim → 인포그래픽 애니    │
│ - Canva API → 슬라이드 이미지       │
└─────────────────────────────────────┘
      ↓
┌─────────────────────────────────────┐
│ STAGE 3: 영상 합성                  │
│ - FFmpeg → 클립 합치기              │
│ - Remotion → 프로그래밍 영상 편집   │
│ - 자막 삽입 + 음성 싱크             │
└─────────────────────────────────────┘
      ↓
   완성 MP4
```

---

## 필요한 도구 및 MCP

### Stage 1: 음성 생성

**ElevenLabs (추천)**
- 한국어 자연스러운 TTS 품질 최고
- API Key 1개만 발급하면 됨
- 비용: 월 $5~$22 (영상 길이에 따라)

```bash
# Claude Code 스킬로 만들 수 있음
# scripts/part00.md → 섹션별 분리 → ElevenLabs API → MP3 파일들
```

**MCP: ElevenLabs MCP**
- 현재 공식 MCP 있음 (github.com/elevenlabs/elevenlabs-mcp)
- Claude Code에서 직접 TTS 생성 가능

### Stage 2: 화면 캡처

**Playwright MCP (추천)**
- 브라우저 자동화 → 웹사이트 캡처
- Claude Code에서 직접 브라우저 조작 가능

**Computer Use (Claude API)**
- Anthropic computer-use API로 실제 화면 조작
- 터미널 명령어 입력, 버튼 클릭, 결과 캡처 가능
- 단, 완전 자동화는 불안정 → 반자동 추천

**인포그래픽: Manim (Python)**
- 수학/CS 교육 영상에 쓰는 Python 라이브러리
- 오케스트라 다이어그램, 흐름도 애니메이션화 가능

### Stage 3: 영상 합성

**Remotion (Node.js)**
- 코드로 영상 만드는 프레임워크
- 슬라이드 + 음성 + 자막을 React 컴포넌트로 합성

**FFmpeg (무료)**
- 클립 합치기, 자막 삽입, 음성 동기화
- Claude Code로 FFmpeg 명령어 자동 생성 가능

---

## 입력 키/정보 목록 (최소한으로)

| # | 항목 | 용도 | 발급 위치 |
|---|------|------|----------|
| 1 | **ElevenLabs API Key** | TTS 음성 생성 | elevenlabs.io → Profile → API |
| 2 | **목소리 ID** | 파자마보스 고유 음성 (클론 또는 선택) | ElevenLabs 대시보드 |
| 3 | **Anthropic API Key** | Computer Use, 자동화 | console.anthropic.com |
| 4 | **Canva API Key** (선택) | 슬라이드 자동 생성 | canva.com/developers |

→ **최소 필수: ElevenLabs Key + 목소리 ID 2가지**

---

## Claude Code 스킬 설계 (실제로 만들 수 있는 것)

### 스킬 1: `parse-script` — 스크립트 파싱
```
스크립트 MD → 섹션별 JSON 분리
{
  "part": "00",
  "sections": [
    {"type": "hook", "text": "보스님들...", "screen": "웹캠"},
    {"type": "demo", "text": "지금 터미널에서...", "screen": "터미널"},
    ...
  ]
}
```

### 스킬 2: `generate-tts` — 음성 생성
```
섹션별 텍스트 → ElevenLabs API 호출 → MP3 파일 저장
output/part00/
├── 01-hook.mp3
├── 02-concept.mp3
└── 03-demo.mp3
```

### 스킬 3: `capture-screen` — 화면 캡처 (Playwright)
```
스크린샷 지시사항 → Playwright로 브라우저/터미널 캡처
output/part00/
├── screen-01-vscode.png
├── screen-02-terminal.png
└── screen-03-result.png
```

### 스킬 4: `build-video` — 영상 합성 (FFmpeg)
```
MP3 + PNG + SRT → FFmpeg → part00-final.mp4
```

---

## 단계별 구현 로드맵

### Phase 1 (지금 당장 가능, 1~2일)
- [ ] ElevenLabs API Key 발급
- [ ] `parse-script` 스킬 만들기 → 스크립트 JSON 변환 확인
- [ ] `generate-tts` 스킬 만들기 → Part 00 음성 생성 테스트
- **결과물**: Part 00 음성 파일 자동 생성

### Phase 2 (1주일)
- [ ] Playwright MCP 설치
- [ ] `capture-screen` 스킬 → 주요 화면 자동 캡처
- [ ] FFmpeg으로 음성 + 화면 합치기
- **결과물**: Part 00 ~ 03 기본 영상 자동 생성

### Phase 3 (2~3주)
- [ ] Manim으로 오케스트라 다이어그램 애니메이션화
- [ ] Remotion으로 슬라이드 섹션 자동 렌더링
- [ ] 전체 파이프라인 1회 실행으로 Part 00~20 영상 생성
- **결과물**: 완성 영상 자동 생성 파이프라인

---

## 현실적 권장 전략

**완전 자동화 대신 "반자동 + 빠른 편집" 추천:**

1. **음성 자동 생성** (ElevenLabs) → MP3 21개
2. **슬라이드 자동 생성** (Gamma.app AI) → 이미지
3. **화면 캡처는 직접** → OBS로 실제 실습 화면 녹화 (30분)
4. **CapCut/DaVinci로 빠른 합성** → 자동 생성된 음성 + 직접 캡처 화면 합치기

→ 총 작업 시간: 수동 8시간 → **2~3시간으로 단축**

---

## 관련 MCP 목록

| MCP | 기능 | 설치 |
|-----|------|------|
| `elevenlabs-mcp` | TTS 음성 생성 | npm install @elevenlabs/mcp |
| `playwright-mcp` | 브라우저 자동화/캡처 | npm install @playwright/mcp |
| `ffmpeg-mcp` | 영상 처리 | 별도 설치 필요 |
| `filesystem-mcp` | 파일 관리 | 기본 내장 |

---

## 참고 프로젝트

이 프로젝트에 이미 있는 관련 파일들:
- `/Users/mac/Documents/dev/mtube/build_auto_tts.py` — TTS 자동화 파이썬 스크립트 (기존)
- `/Users/mac/Documents/dev/mtube/build_video.py` — 영상 합성 스크립트 (기존)
- `/Users/mac/Documents/dev/mtube/capture_broll.py` — B-roll 캡처 스크립트 (기존)

→ 이미 기초 코드가 있습니다! Phase 1은 이 파일들 확인 후 Claude Code로 통합하면 됩니다.
