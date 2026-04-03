# CLAUDE.md — mtube 프로젝트

## 프로젝트 개요
"왕초보도 6시간이면 AI 마케팅 팀 만든다" 유튜브 풀코스 (28파트, 4ACT+앙코르).
채널: 파자마보스. 화자: 김보스. 도구: Claude Code + 안티그래비티.

## 타깃 오디언스
스몰브랜드 오너, 의사/변호사 전문가, 소상공인, 1인기업, 지식창업가.
❌ "마케터"를 대상 지칭으로 사용 금지 → "보스님", "사업하시는 분" 사용.
✅ "AI 마케팅 팀"은 시스템 이름이므로 유지.

## 디렉토리 구조
- scripts/           → 28개 파트 스크립트 (정본)
- output/            → 모든 결과물 (스크립트, PPT JSON, 러너키트, 영상, 음성, 캐릭터)
- learner-kit/       → 수강생용 리소스 (cheatsheets, prompts, skills, templates)
- remotion-video/    → Remotion 인포그래픽 영상 프로젝트
- skills/            → Claude Code 실행 스킬 라이브러리
- contexts/          → 브랜드보이스, 디자인 레퍼런스
- production/        → 영상 제작 에셋 (레거시)
- .claude/commands/  → Claude Code 슬래시 커맨드

## 스크립트 규칙
- 어미: "예요/에요" 절대 금지. "~입니다/~거든요/~하는데요" 사용.
- 구조: [HOOK] → [CONCEPT] → [DEMO] → [RECAP] → [BRIDGE]
- PPT 마커: [📊 PPT 지문:], 화면 마커: [📺 화면:]

## 디자인 시스템 (Dan Koe 스타일)
- 배경: #0A0A0A, 텍스트: #FFFFFF, 강조: #E53E3E, 보조: #6B7280
- 모바일 최소 폰트: 28px
- 여백 60%+, 개념 하나 = 한 페이지

## 빌드 & 실행
- Remotion: `cd remotion-video && npx remotion render Infographic --props=./src/data/partXX-slides.json`
- TTS: python-dotenv 사용, .env에서 ELEVENLABS_API_KEY 로드
- 영상: `python build_part00_premium.py`

## API 키 관리
모든 키는 .env 파일에서 관리. 하드코딩 절대 금지.
- ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL_ID

## TTS-first 파이프라인
TTS 생성 → ffprobe duration 측정 → JSON durationInFrames 패치 → Remotion 렌더링.
