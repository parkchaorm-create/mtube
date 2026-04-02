# 파트별 복붙 프롬프트 모음

영상에서 사용하는 모든 프롬프트를 파트 순서로 정리했습니다.
Claude Code 실행 후 아래 프롬프트를 그대로 복사해서 붙여넣으세요.

---

## Part 03 – 설치 확인

```bash
# 터미널에서 실행
node --version
claude --version
```

```
# Claude Code 첫 실행 후 입력
안녕! 나는 마케팅을 자동화하고 싶어. 오늘 처음 시작했어. 뭐부터 시작하면 좋을까?
```

---

## Part 04 – 연습실 세팅

```bash
pwd
cd Documents
mkdir my-ai-marketing
cd my-ai-marketing
pwd
claude
```

---

## Part 05 – CLAUDE.md 테스트

```
# CLAUDE.md 없이 (Before)
안녕, 오늘 있었던 일 소개하는 인스타 포스트 써줘

# CLAUDE.md 있을 때 (After)
오늘 Claude Code 처음 설치한 경험을 인스타 포스트로 써줘
```

---

## Part 06 – Plan Mode

```
# Plan Mode 시작
소셜미디어 콘텐츠 자동화 스킬을 만들 거야.
인스타그램과 유튜브 쇼츠 콘텐츠를 생성하는 스킬이야.
계획을 먼저 보여줘. 내가 OK하면 그때 실행해.
```

```
# 계획 수정 요청
좋아, 근데 링크드인 포스트도 추가해줘.
```

---

## Part 07 – 토큰 관리

```
# /clear 전에 요약 받기
지금까지 작업한 내용을 요약해줘.
파일명, 주요 결정사항, 다음에 이어서 해야 할 것 포함해서.
```

```bash
# 컨텍스트 초기화
/clear
```

```bash
# 모델 변경
/model
```

---

## Part 08 – 이미지·PDF·웹 분석

```
# 이미지 분석 (드래그앤드롭 후)
이 경쟁사 사이트 스크린샷 분석해서 내가 개선해야 할 점 3가지 알려줘
```

```
# PDF 분석
@product-catalog.pdf
이 카탈로그의 주요 제품 5개를 뽑아서,
각 제품별로 인스타그램 캡션 (150자 이내) + 해시태그 5개를 만들어줘.
```

```
# 웹사이트 분석
경쟁사 블로그를 분석해줘.
URL: https://경쟁사블로그.com

분석 항목:
1. 가장 많이 쓰는 콘텐츠 주제
2. 포스트 제목 패턴
3. 글 구조
4. 내 블로그와 비교해서 내가 놓치고 있는 것
```

---

## Part 09 – 소셜미디어 스킬 실행

```bash
# 스킬 보관함 만들기
mkdir -p .claude/commands
```

```
# 스킬 첫 실행
/social-media 오늘 주제: Claude Code로 인스타 자동화하는 법
```

```
# 결과물 수정 요청
인스타 캡션이 너무 형식적이야. 더 친근하고 구어체로 바꿔줘.
마지막 CTA에 "댓글로 알려주세요!" 같은 댓글 유도 문구 넣어줘.
```

```
# URL로 콘텐츠 생성
/social-media
참고 URL: https://내블로그.com/최신-포스트
이 블로그 포스트 읽고 소셜미디어 콘텐츠 만들어줘
```

---

## Part 10 – 리퍼포징 스킬

```
# YouTube URL로 7채널 콘텐츠 생성
/repurpose
URL: https://youtu.be/[영상ID]
```

---

## Part 11 – SEO 감사 스킬

```
# 내 사이트 SEO 감사
/seo-audit
URL: https://내사이트.com
```

---

## Part 12 – GA4 분석 스킬

```
# GA4 데이터 분석
/ga4
@ga4-export-2026-03.csv
이번 달 데이터 분석해줘. 가장 잘 된 콘텐츠와 이유, 다음 달 전략도 제안해줘.
```

---

## Part 13 – 브랜드 보이스 스킬

```
# 브랜드 보이스 추출
/brand-voice
@내가쓴글1.md
@내가쓴글2.md
@내가쓴글3.md
이 글들을 분석해서 나의 브랜드 보이스 가이드를 만들어줘.
```

---

## Part 16 – 오케스트레이터 첫 실행

```
# 지휘자 첫 실행
/marketing-team 오늘 주제: Claude Code로 마케팅 자동화하는 법
```

---

## Part 17 – 실전 데모

```
/marketing-team
주제: 오늘 업로드한 유튜브 영상 (https://youtu.be/[영상ID])
목적: 이번 주 전체 소셜 채널 콘텐츠 생성
채널: 인스타그램, 블로그, 뉴스레터, X
발행 기간: 이번 주 (월~금)
```

---

## Part 18 – Hooks 테스트

```json
{
  "hooks": {
    "PostFileWrite": [
      {
        "matcher": "content/**/*.md",
        "command": "echo '🎵 새 콘텐츠 저장 완료! 파일: {file}'"
      }
    ]
  }
}
```

---

## 매주 반복 워크플로우 (완성 후)

```bash
# 1. 연습실로 이동
cd ~/Documents/my-ai-marketing

# 2. Claude Code 실행
claude

# 3. 이번 주 유튜브 영상 URL로 전체 파이프라인 실행
/marketing-team
주제: [이번 주 유튜브 영상 URL]
목적: 이번 주 전체 소셜 채널 콘텐츠
채널: 인스타그램, 블로그, 뉴스레터, X

# 4. 결과물 확인
# content/[날짜]/ 폴더에 파일들이 생성됩니다
```
