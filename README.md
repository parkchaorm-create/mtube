# 유튜브 롱폼 풀코스 튜토리얼 제작 시스템

브랜드 보이스와 코스 내용을 `contexts/` 폴더에 넣으면 자동으로 유튜브 롱폼 풀코스 튜토리얼 영상을 제작하는 시스템입니다.

## 작동 방식

```
contexts/[브랜드명]/          ← 브랜드 보이스 + 코스 아웃라인 + 메타 정보
       ↓
SCRIPT_GUIDE.md              ← 범용 스크립트 작성 규칙
       ↓
scripts/                     ← 파트별 스크립트 자동 생성
       ↓
.claude/commands/            ← 영상 제작 파이프라인 (TTS, 렌더링, 프리뷰)
       ↓
production/                  ← 최종 영상 결과물
```

## 빠른 시작

### 1. 컨텍스트 만들기
```bash
mkdir contexts/my-brand
```

아래 3개 파일을 작성합니다:
- **`brand-voice.md`** — 브랜드 보이스, 페르소나, 호칭, 어조 규칙
- **`course-outline.md`** — 풀코스 구성, 파트 목록, 메타포 체계
- **`meta.md`** — 영상 제목, 키워드, 촬영 장비, 검증 기준

### 2. 활성 컨텍스트 설정
`SCRIPT_GUIDE.md` 상단의 활성 컨텍스트 경로를 변경합니다:
```
> **활성 컨텍스트**: `contexts/my-brand/`
```

### 3. 스크립트 작성
`scripts/` 폴더에 파트별 스크립트를 작성합니다.
SCRIPT_GUIDE.md의 범용 규칙 + 활성 컨텍스트의 브랜드 보이스가 자동 적용됩니다.

### 4. 영상 제작
```
/parse-script    → 스크립트를 씬 JSON으로 변환
/generate-tts    → 나레이션 음성 생성
/render-masterclass → 타이틀/인트로 영상 생성
```

---

## 폴더 구조

```
mtube/
├── README.md                  ← 이 파일
├── SCRIPT_GUIDE.md            ← 범용 스크립트 작성 규칙
├── contexts/                  ← 브랜드별 컨텍스트
│   ├── README.md              ← 컨텍스트 사용법
│   └── pajama-boss/           ← 파자마보스 컨텍스트 (예시)
│       ├── brand-voice.md     ← 브랜드 보이스
│       ├── course-outline.md  ← 코스 구성
│       └── meta.md            ← 메타데이터
├── scripts/                   ← 파트별 스크립트 (Part 00~20)
├── prompts/                   ← 시청자 복붙용 프롬프트 템플릿
├── meta/                      ← 영상 메타데이터 (제목, 설명, 태그)
├── references/                ← 참고 영상 인사이트 & 대체 도구
├── assets/                    ← 썸네일 설명서
├── learner-kit/               ← 학습 키트 (슬라이드, 자료)
├── content-marketing-team/    ← 범용 AI 마케팅 팀 자동화
├── skills/                    ← 비디오 제작 스킬
├── remotion-video/            ← Remotion 영상 제작
└── production/                ← 최종 결과물
```

---

## 현재 활성 프로젝트

| 브랜드 | 컨텍스트 | 상태 | 영상 길이 |
|--------|----------|------|-----------|
| 파자마보스 | `contexts/pajama-boss/` | 스크립트 수정 중 | 4시간+ (21개 파트) |

---

## 새 풀코스 만들기

자세한 방법은 [`contexts/README.md`](contexts/README.md)를 참조하세요.
