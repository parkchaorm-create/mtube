# CLAUDE.md — mtube 프로젝트

## 프로젝트 개요
"왕초보도 6시간이면 AI 마케팅 팀 만든다" 유튜브 풀코스 (28파트, 4ACT+앙코르).
채널: 파자마보스. 화자: 김보스. 도구: Claude Code + 안티그래비티.

## 타깃 오디언스
스몰브랜드 오너, 의사/변호사 전문가, 소상공인, 1인기업, 지식창업가.
❌ "마케터"를 대상 지칭으로 사용 금지 → "보스님", "사업하시는 분" 사용.
✅ "AI 마케팅 팀"은 시스템 이름이므로 유지.

## 디렉토리 구조
- scripts/              → 28개 파트 스크립트 (정본)
- output/               → 모든 결과물 (영상, 음성, 캐릭터, PPT, 목업)
- learner-kit/          → 수강생용 리소스
- remotion-video/       → Remotion 영상 프로젝트 (핵심)
- contexts/             → 브랜드보이스, 디자인 레퍼런스
- tools/                → Python 도구 (목업 생성, 립싱크 등)
- .claude/commands/     → 슬래시 커맨드 (9개)

## 영상 제작 워크플로우 (9-Phase)
**`/remotion-build-guide` 스킬 참조. 절대 단계를 건너뛰지 않는다.**

```
Phase 1: 개발 규칙 설정 → DEVELOPMENT.md
Phase 2: 아트 디렉션 확인 → ART_DIRECTION.md
Phase 3: 스토리보드 → partXX-storyboard.json
Phase 4: 에셋 인벤토리 → partXX-assets.json
Phase 5: 에셋 생성 (카테고리별)
Phase 6: 모션 프리미티브 → animations.ts
Phase 7: 컴포넌트 아키텍처 → 컴포넌트 트리
Phase 8: 씬별 코드 생성 (하나씩)
Phase 9: 조립 + 오디오 + 렌더링
```

## 스크립트 규칙
- 어미: "예요/에요" 절대 금지
- 리듬: 한 문장 = 한 호흡 (20자), "거든요" 3문장에 1번
- 구조: [HOOK] → [CONCEPT] → [DEMO] → [RECAP] → [BRIDGE]
- 브랜드보이스: `contexts/pajama-boss/brand-voice.md` 참조

## 디자인 시스템 (Dan Koe 스타일)
- 배경: #0A0A0A, 텍스트: #FFFFFF, 강조: #E53E3E, 보조: #6B7280
- 모바일 최소 폰트: 28px
- 여백 60%+, 개념 하나 = 한 페이지
- 모션: spring 바운스 우선, 글로우는 핵심 3곳만, SVG 라인 드로잉

## 캐릭터 (확정)
- 빨간 안경 흑백 3D (hybrid_v1 스타일)
- 표시: 하이브리드 (HOOK/BRIDGE=풀스크린, CONCEPT=PIP, DEMO=숨김)
- 에셋: `output/character/` (시트 5장, 배경 3장, 스티커)

## TTS 필수 규칙
- **Voice ID: jPmzMeQjhjbwvw4O8bgf** (절대 변경 금지!)
- Model: eleven_multilingual_v2
- API 키: .env의 ELEVENLABS_API_KEY

## API 키 관리
모든 키는 .env 파일에서 관리. 하드코딩 절대 금지.
- ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID
- GOOGLE_AI_API_KEY (나노바나나/Gemini)

## 슬래시 커맨드
- `/remotion-build-guide` — 9단계 영상 제작 워크플로우 (핵심)
- `/build-video` — 전체 파이프라인 통합 빌드
- `/render-masterclass` — PPT 인포그래픽 렌더링
- `/generate-tts` — TTS 나레이션 생성
- `/generate-lipsync` — 립싱크 viseme 데이터 생성
- `/generate-character` — 캐릭터 이미지 생성
- `/parse-script` — 스크립트 → 씬 JSON
- `/preview-masterclass` — Remotion 프리뷰
- `/3d-transition` — 3D 트랜지션 효과
