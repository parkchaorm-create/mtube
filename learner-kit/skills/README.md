# 스킬 파일 사용 방법

## 설치 방법

1. 여러분의 프로젝트 폴더(예: `my-ai-marketing`)로 이동
2. `.claude/commands/` 폴더 생성:
   ```bash
   mkdir -p .claude/commands
   ```
3. 이 폴더의 `.md` 파일들을 `.claude/commands/` 에 복사

## 파일 목록 및 실행 명령어

| 파일 | 명령어 | 기능 |
|------|--------|------|
| `CLAUDE-template.md` | (파일명 변경 → `CLAUDE.md`) | 프로젝트 루트에 놓으세요 |
| `social-media.md` | `/social-media` | 소셜미디어 콘텐츠 생성 |
| `repurpose.md` | `/repurpose` | URL → 7채널 리퍼포징 |
| `seo-audit.md` | `/seo-audit` | SEO 감사 리포트 |
| `ga4.md` | `/ga4` | GA4 데이터 분석 |
| `brand-voice.md` | `/brand-voice` | 브랜드 보이스 추출 |
| `newsletter.md` | `/newsletter` | 뉴스레터 작성 |
| `marketing-team.md` | `/marketing-team` | 전체 AI 팀 실행 |

## 최종 폴더 구조

```
my-ai-marketing/
├── CLAUDE.md                     ← CLAUDE-template.md 복사 후 수정
└── .claude/
    ├── commands/
    │   ├── social-media.md
    │   ├── repurpose.md
    │   ├── seo-audit.md
    │   ├── ga4.md
    │   ├── brand-voice.md
    │   ├── newsletter.md
    │   └── marketing-team.md
    ├── agents/                   ← Part 15에서 직접 만드는 파일들
    │   ├── research-agent.md
    │   ├── content-agent.md
    │   ├── seo-agent.md
    │   └── distribution-agent.md
    └── settings.json             ← Part 18에서 직접 만드는 Hooks 설정
```
