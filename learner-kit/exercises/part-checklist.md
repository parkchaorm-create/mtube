# 파트별 실습 체크리스트

영상 보면서 각 단계를 완료할 때마다 체크하세요!

---

## 1막: 공연장 세팅

### Part 02 – 요금제 (18분)
- [ ] claude.ai 계정 생성
- [ ] Pro 플랜 결제 완료
- [ ] Claude Code 사용 가능 상태 확인

### Part 03 – 설치 (28분)
- [ ] VS Code 설치 및 실행 확인
- [ ] Node.js 설치 (`node --version` 숫자 나옴)
- [ ] Claude Code 설치 (`claude --version` 숫자 나옴)
- [ ] VS Code에 Claude Code 확장 설치
- [ ] `claude` 명령어로 첫 실행 성공

### Part 04 – 터미널 (45분)
- [ ] `pwd` 실행해서 현재 위치 확인
- [ ] `ls` 실행해서 파일 목록 보기
- [ ] `cd Documents` 로 폴더 이동
- [ ] `mkdir my-ai-marketing` 으로 연습실 생성
- [ ] `cd my-ai-marketing` 으로 연습실 입장
- [ ] `claude` 실행 성공

---

## 2막: 악보 읽기

### Part 05 – CLAUDE.md (58분)
- [ ] VS Code에서 `my-ai-marketing` 폴더 열기
- [ ] `CLAUDE.md` 파일 생성 (대문자!)
- [ ] 브랜드 정보 입력 및 저장
- [ ] Claude Code 실행 후 브랜드 톤으로 답변 나오는지 확인

### Part 06 – Plan Mode (1:15)
- [ ] "계획 먼저 보여줘"로 Plan Mode 사용해보기
- [ ] `/plan` 명령어 사용해보기
- [ ] 계획 수정 후 승인 → 실행 흐름 경험

### Part 07 – 토큰 관리 (1:30)
- [ ] 대화 요약 받기
- [ ] `/clear` 로 컨텍스트 초기화
- [ ] `/model` 로 모델 목록 확인

### Part 08 – 이미지·PDF (1:45)
- [ ] 이미지 드래그앤드롭으로 분석 요청
- [ ] `@파일명` 으로 파일 참조
- [ ] WebFetch로 웹사이트 분석

---

## 3막: 악기 만들기

### Part 09 – 소셜미디어 스킬 (1:58)
- [ ] `.claude/commands/` 폴더 생성
- [ ] `social-media.md` 파일 생성 및 내용 복붙
- [ ] `/social-media` 명령어로 첫 실행
- [ ] 결과물 확인 후 스킬 파일 튜닝

### Part 10 – 리퍼포징 스킬 (2:20)
- [ ] `repurpose.md` 파일 생성
- [ ] URL 넣어서 `/repurpose` 실행
- [ ] 7개 채널 콘텐츠 생성 확인

### Part 11 – SEO 스킬 (2:42)
- [ ] `seo-audit.md` 파일 생성
- [ ] 내 사이트 URL로 `/seo-audit` 실행
- [ ] 보고서 파일 생성 확인

### Part 12 – GA4 스킬 (3:00)
- [ ] GA4 데이터 내보내기 (CSV)
- [ ] `ga4.md` 파일 생성
- [ ] CSV 파일로 `/ga4` 실행
- [ ] 인사이트 보고서 확인

### Part 13 – 브랜드 보이스 스킬 (3:15)
- [ ] 내가 쓴 글 3~5개 준비
- [ ] `brand-voice.md` 파일 생성
- [ ] `/brand-voice` 실행
- [ ] 생성된 브랜드 보이스 가이드 CLAUDE.md에 연결

---

## 4막: 오케스트라 합주

### Part 15 – 에이전트 설계 (3:38)
- [ ] `.claude/agents/` 폴더 생성
- [ ] `research-agent.md` 생성
- [ ] `content-agent.md` 생성
- [ ] `seo-agent.md` 생성
- [ ] `distribution-agent.md` 생성

### Part 16 – 오케스트레이터 (3:50)
- [ ] `marketing-team.md` 스킬 생성 (지휘자)
- [ ] `/marketing-team` 첫 실행
- [ ] `content/` 폴더에 결과물 생성 확인

### Part 17 – 실전 데모 (4:02)
- [ ] YouTube URL로 전체 파이프라인 실행
- [ ] 7개 파일 생성 확인
- [ ] 결과물 품질 검토

### Part 18 – Hooks (4:18)
- [ ] `.claude/settings.json` 파일 생성
- [ ] `echo` 테스트 Hook 설정
- [ ] 파일 저장 → Hook 자동 실행 확인
- [ ] 실제 Claude 명령어 Hook으로 업그레이드

---

## 최종 완성 확인

- [ ] `/marketing-team` 명령어 하나로 전체 파이프라인 실행됨
- [ ] 파일 저장하면 Hook이 자동 실행됨
- [ ] CLAUDE.md에 내 브랜드 정보가 완성되어 있음
- [ ] 스킬 파일 5개 + 에이전트 4개 + 지휘자 1개 완성
- [ ] 7일 액션 플랜 Day 1 완료
