# 참고 영상 목록 & 핵심 인사이트

## 분석 요약

총 10개 영상 분석 완료. blotato 관련 내용은 모두 대체 도구로 교체.

---

## 영상별 상세 분석

### 1. CLAUDE CODE FULL COURSE
- **채널**: Sabrina Ramonov 🍄
- **URL**: https://youtu.be/fYX6hHC9FhQ
- **길이**: 1:12:20
- **활용 파트**: part03, part05, part06, part09, part15, part18

**핵심 인사이트**:
- VS Code + Claude Code 연동이 가장 초보자 친화적 환경
- Plan Mode는 반드시 데모 전에 설명 필요 (삽질 방지)
- CLAUDE.md 없이 시작하면 반복 설명 낭비가 발생함
- Hooks 설정은 `settings.json`에서 matcher + command로 구성
- 소셜미디어 스킬은 `.claude/commands/` 폴더에 마크다운으로 저장
- 주간 콘텐츠 계획 스킬이 실용적 (Plan Week 자동화)

**blotato 대체 방법**:
- blotato API 연동 파트 → Buffer API 또는 Make.com 웹훅으로 대체
- 비주얼 생성 파트 → Canva API 또는 Adobe Express로 대체

---

### 2. Every Claude Code Concept Explained
- **채널**: Sabrina Ramonov 🍄
- **URL**: https://youtu.be/efaBaxDN_q8
- **길이**: 1:29:50
- **활용 파트**: part01, part02, part04, part07, part08

**핵심 인사이트**:
- 터미널은 "컴퓨터에 직접 말 거는 방법"으로 비유하면 초보자 이해 빠름
- Claude Code 설치: `npm install -g @anthropic-ai/claude-code` 한 줄
- 파일 접근: `@파일명`으로 드래그앤드롭 없이도 참조 가능
- 이미지는 터미널에 드래그앤드롭 또는 `@이미지경로`로 첨부
- 컨텍스트 윈도우 소진 시 `/clear` 명령어 + 핵심 내용만 요약해서 재입력
- 모델 선택: `/model` 명령어, 무거운 작업은 claude-opus-4-5, 가벼운 건 claude-haiku

**챕터 구조 참고**:
```
1. 터미널 기초 (4분 14초)
2. 설치 + 가격 (9분 25초)
3. 파일 접근 (17분 47초)
4. 이미지+PDF (19분)
5. 툴 사용 (22분)
6. CLAUDE.md (27분 57초)
7. Plan Mode (31분 51초)
8. 컨텍스트 윈도우 (35분 48초)
9. 토큰+비용 (37분 16초)
10. 모델 선택 (41분 6초)
```

---

### 3. Build Your Full AI Marketing Team
- **채널**: Grace Leung
- **URL**: https://youtu.be/yLXLHnD4fco
- **길이**: 17:35
- **활용 파트**: part14, part15, part16

**핵심 인사이트**:
- AI 마케팅 팀 설계 순서: 역할 정의 → 스킬 빌드 → 에이전트 연결 → 오케스트레이터
- Notion 태스크 보드와 연동 시 팀처럼 협업 가능
- Remote Control로 여러 기기에서 에이전트 실행 가능
- 에이전트 라우팅: CLAUDE.md에 "이런 요청이 오면 이 에이전트로" 지시

**팀 구조 예시**:
```
마케팅 팀:
├── 데이터 분석 에이전트 (GA4, 리포트)
├── 콘텐츠 크리에이터 에이전트 (블로그, 인스타)
├── 소셜 미디어 에이전트 (예약, 발행)
└── SEO 에이전트 (감사, 최적화)
```

---

### 4. I Built 43 AI Marketing Skills
- **채널**: Eric Tech
- **URL**: https://youtu.be/qt4xzTLY1BQ
- **길이**: 42:21
- **활용 파트**: part11, part12

**핵심 인사이트**:
- 마케팅 스킬 8단계 시스템:
  1. 제품 마케팅 컨텍스트 설정
  2. GA4 트래킹 설정
  3. SEO 감사 & 경쟁사 분석
  4. 랜딩페이지 CRO
  5. Web Vitals & LCP 최적화
  6. 가입 → 활성화 CRO
  7. AI SEO (LLM 검색 최적화)
  8. 콘텐츠 전략 & 블로그 생성
- 실제 성과: SaaS 0명 → 1,000명 사용자 달성
- GA4 API 연동: Google Analytics Reporting API v4 사용

**SEO 감사 스킬 프롬프트 구조**:
```
역할: SEO 전문가
입력: 웹사이트 URL
출력: 메타설명 누락, 깨진 링크, 이미지 alt 태그, 페이지 속도 이슈 리포트
형식: 우선순위별 액션 아이템 리스트
```

---

### 5. URL만 넣으면 10가지 콘텐츠 (한국어 영상)
- **채널**: 빌더 조쉬 Builder Josh
- **URL**: https://youtu.be/QgAXjgAlQ2Y
- **길이**: 23:25
- **GitHub**: https://github.com/uxjoseph/content-marketing-team
- **활용 파트**: part10, part17

**핵심 인사이트**:
- 콘텐츠 마케팅 에이전시 구조: 지휘자 → 텍스트팀, 비주얼팀, 비디오팀
- 하나의 YouTube URL로 뉴스레터, 블로그, 링크드인, 쇼츠 동시 생성
- Gemini API + Nanobana(나노바나) 활용해 이미지 생성
- 오픈소스 코드 GitHub에 공개되어 있어 참고 가능

**실전 워크플로우**:
```
1. YouTube URL 입력
2. 오케스트레이터가 내용 분석
3. 텍스트 에이전트: 뉴스레터, 블로그, 링크드인 포스트 생성
4. 비주얼 에이전트: 카드뉴스, 썸네일 생성
5. 비디오 에이전트: 쇼츠 자막 생성
```

---

### 6. Fully Autonomous Marketing Team
- **채널**: Andy Lo
- **URL**: https://youtu.be/iVbsl60t0oA
- **길이**: 30:23
- **활용 파트**: part15, part16

**핵심 인사이트**:
- 5 에이전트 구조: Video Ad Specialist, Ad Creative Designer, Research Agent, Copywriting Agent, Distribution Agent
- Supabase로 생성된 콘텐츠 저장 (무료 Postgres DB)
- 전체 파이프라인 실행 시 약 10~15분 소요
- Copywriting Agent에 브랜드 보이스 파일 주입 필수

---

### 7. Claude Code Built My ENTIRE Marketing Team
- **채널**: Duncan Rogoff
- **URL**: https://youtu.be/ILmwmgMcCnc
- **길이**: 12:08
- **활용 파트**: part13, part16

**핵심 인사이트**:
- RSA 스킬 아키텍처: Role → Skills → Actions 3단계
- 브랜드 보이스 추출: 기존 작성글 5~10개를 Claude에게 분석 요청
- "자신을 클론하는" 방식: 내가 쓴 글체를 AI가 학습
- Anthropic 마케팅 팀 1인이 $380B 회사 운영한 실제 사례 소개

**브랜드 보이스 추출 프롬프트**:
```
다음 글들을 읽고 작성자의 글쓰기 스타일을 분석해주세요.
[글1], [글2], [글3]...

분석 항목:
1. 문장 길이와 리듬
2. 자주 쓰는 표현과 단어
3. 구조 패턴 (예: 질문→답변, 번호 목록)
4. 감정 톤과 에너지 수준
5. 피해야 할 표현

결과를 브랜드 보이스 가이드라인으로 정리해주세요.
```

---

### 8. DON'T Build AI Automations
- **채널**: Duncan Rogoff
- **URL**: https://youtu.be/PQE5UKHGOMQ
- **길이**: 19:12
- **활용 파트**: part19

**핵심 인사이트**:
- n8n 자동화 vs 에이전틱 워크플로우: 에이전트가 더 유연하고 오류 처리 강함
- Google Colab(Antigravity) 환경에서 Claude Code 실행 가능
- n8n 자동화를 Claude Code로 변환하면 유지보수 비용 절감
- GitHub Actions로 자동 배포 파이프라인 구축 가능

---

### 9. Automate 90% of Social Media Content
- **채널**: Sandy Lee AI
- **URL**: https://youtu.be/zFM5elMy5Do
- **길이**: 38:00
- **활용 파트**: part17

**핵심 인사이트**:
- Claude가 AI 콘텐츠 팀 구조 자체를 설계해줌 (팀 설계를 AI에게 위임)
- API 연결 설정이 초보자에게 가장 어려운 부분
- 대시보드 구현으로 비기술자도 결과 확인 가능

---

### 10. Generate Content for 9 Socials on Autopilot
- **채널**: Nate Herk
- **URL**: https://youtu.be/4Zaoo0YbYaw
- **길이**: 17:29
- **활용 파트**: part10

**핵심 인사이트**:
- Repurpose 스킬에 "명확화 질문" 단계 포함이 핵심 (무작정 생성 방지)
- 스킬 실행 전 확인 질문: 타겟 채널, 톤, 목적 확인
- 시각적 결과물 확인 후 수정 루프 구성

---

## 영상 간 공통 패턴 (스크립트 적용 포인트)

1. **CLAUDE.md 설정은 모든 영상에서 필수 강조** → Part 5에서 집중 다룸
2. **Plan Mode 시연은 삽질 방지의 핵심** → Part 6에서 Before/After 비교
3. **브랜드 보이스 파일 없으면 에이전트가 엉뚱한 글 작성** → Part 13에서 해결
4. **멀티 에이전트는 단계적으로: 스킬 → 에이전트 → 팀** → Part 14~17 흐름
