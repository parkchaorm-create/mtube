# 파자마보스 풀코스 – 빠른 참조 치트시트

## 터미널 명령어 5개 (Part 04)

| 명령어 | 하는 일 | 예시 |
|--------|--------|------|
| `pwd` | 현재 위치 확인 | `pwd` → `/Users/나/Documents` |
| `ls` | 현재 폴더 내용 보기 | `ls` (윈도우: `dir`) |
| `cd 폴더명` | 폴더 이동 | `cd my-ai-marketing` |
| `cd ..` | 한 단계 뒤로 | `cd ..` |
| `mkdir 폴더명` | 새 폴더 만들기 | `mkdir my-ai-marketing` |
| `claude` | Claude Code 실행 | `claude` |

**Tab 자동완성**: `cd Doc` → Tab → `cd Documents/` 자동완성!

---

## 설치 명령어 (Part 03)

```bash
# Node.js 설치 확인
node --version

# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# Claude Code 버전 확인
claude --version

# Claude Code 실행
claude
```

**에러 시 (맥)**: `sudo npm install -g @anthropic-ai/claude-code`
**에러 시 (윈도우)**: PowerShell 우클릭 → 관리자 권한으로 실행

---

## Claude Code 내부 명령어 (Part 04, 06, 07)

| 명령어 | 하는 일 |
|--------|--------|
| `/help` | 모든 명령어 목록 |
| `/clear` | 대화 초기화 (토큰 절약!) |
| `/plan` | Plan Mode 켜기 (리허설 모드) |
| `/model` | AI 모델 변경 |
| `/quit` | Claude Code 종료 |
| `Ctrl+C` | 강제 종료 |

---

## 스킬 실행 명령어 (Part 09~13)

| 명령어 | 기능 |
|--------|------|
| `/social-media` | 소셜미디어 콘텐츠 생성 |
| `/repurpose` | URL → 7채널 리퍼포징 |
| `/seo-audit` | SEO 감사 리포트 |
| `/ga4` | GA4 데이터 분석 |
| `/brand-voice` | 브랜드 보이스 추출 |
| `/newsletter` | 뉴스레터 초안 작성 |
| `/marketing-team` | 전체 AI 팀 실행 (오케스트라) |

---

## 요금제 비교 (Part 02)

| 플랜 | 가격 | Claude Code | 추천 대상 |
|------|------|-------------|----------|
| Free | 무료 | ❌ 불가 | 일반 대화만 |
| **Pro** | **$20/월** | **✅ 가능** | **왕초보 시작** |
| Max | $100/월~ | ✅ 가능 | 헤비유저·팀 |

---

## 모델(택시) 선택 기준 (Part 07)

| 모델 | 별칭 | 언제 쓰나 |
|------|------|----------|
| claude-opus-4-6 | 리무진 | 새 스킬 설계, 복잡한 전략 |
| claude-sonnet-4-6 | 일반택시 | 일상 콘텐츠 생성 (기본값) |
| claude-haiku-4-5 | 경차 | 간단한 수정, 반복 작업 |

---

## 파일 위치 요약

```
my-ai-marketing/
├── CLAUDE.md                    ← 총보 (AI 브랜드 지시서)
└── .claude/
    ├── commands/                ← 악기 보관함 (스킬 파일)
    │   ├── social-media.md
    │   ├── repurpose.md
    │   ├── seo-audit.md
    │   ├── ga4.md
    │   ├── brand-voice.md
    │   ├── newsletter.md
    │   └── marketing-team.md   ← 지휘자
    ├── agents/                  ← 단원 대기실
    │   ├── research-agent.md
    │   ├── content-agent.md
    │   ├── seo-agent.md
    │   └── distribution-agent.md
    └── settings.json            ← Hooks 설정
```

---

## 오케스트라 비유 한눈에 보기

| 오케스트라 | Claude Code |
|-----------|------------|
| 공연장 | 프로젝트 폴더 |
| 무대 | VS Code |
| 전기 배선 | Node.js |
| 음향 장비 | Claude Code |
| 총보(전체 악보) | CLAUDE.md |
| 악기 보관함 | .claude/commands/ |
| 악기 | 스킬 파일 |
| 단원 대기실 | .claude/agents/ |
| 단원 | 에이전트 |
| 지휘자 | 오케스트레이터 |
| 리허설 | Plan Mode |
| 본공연 | Edit Mode |
| 자동 공연 알람 | Hooks |
| 택시 미터기 | 토큰 |
| 지휘자 책상 크기 | 컨텍스트 윈도우 |
