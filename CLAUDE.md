# CLAUDE.md — mtube

## 프로젝트
6시간 유튜브 풀코스 (28파트). 채널: 파자마보스. 화자: 김보스.
Claude Code + 안티그래비티 + Remotion으로 AI 마케팅 자동화 시스템 구축 교육.

## 에이전트 라우팅
| 요청 | 에이전트 | 위치 |
|------|---------|------|
| "파트 XX 빌드" | orchestrator → 전체 체인 | `.claude/agents/orchestrator.md` |
| "스크립트 작성/수정" | script-writer | `.claude/agents/script-writer.md` |
| "스토리보드/비주얼" | art-director | `.claude/agents/art-director.md` |
| "Remotion 코드" | motion-engineer | `.claude/agents/motion-engineer.md` |
| "TTS/립싱크" | audio-engineer | `.claude/agents/audio-engineer.md` |
| "캐릭터 생성" | character-designer | `.claude/agents/character-designer.md` |
| "합성/렌더링" | video-assembler | `.claude/agents/video-assembler.md` |

## 슬래시 커맨드
- `/build-part` — 파트 전체 빌드 (orchestrator)
- `/write-script` — 스크립트 작성/수정
- `/render` — PPT/영상 렌더링
- `/preview` — Remotion 프리뷰
- `/batch-render` — 복수 파트 배치 처리

## 디렉토리
```
scripts/         28개 스크립트 (정본)
output/          결과물 (영상, 음성, 캐릭터, PPT, 목업)
remotion-video/  Remotion 프로젝트
contexts/        브랜드보이스, 스크립트 규칙, 디자인 레퍼런스
tools/           Python 도구
learner-kit/     수강생용 리소스
```

## 핵심 규칙
- **Voice ID: jPmzMeQjhjbwvw4O8bgf** (변경 금지)
- **디자인**: #0A0A0A / #FFFFFF / #E53E3E (Dan Koe)
- **어미**: "예요/에요" 금지, "거든요" 3문장에 1번
- **캐릭터**: 빨간 안경 흑백 3D, 하이브리드 표시
- **API 키**: .env에서만 로드, 하드코딩 금지

## 상세 참조
- 브랜드보이스: `contexts/pajama-boss/brand-voice.md`
- 스크립트 규칙: `contexts/pajama-boss/script-rules.md`
- 디자인: `remotion-video/src/themes/dan-koe-theme.ts`
- 캐릭터 가이드: `output/character/character-guide.md`
