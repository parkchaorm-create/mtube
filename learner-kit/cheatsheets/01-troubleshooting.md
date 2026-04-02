# 자주 나오는 에러 & 해결법

## 설치 에러 (Part 03)

### "permission denied" (맥)
```bash
sudo npm install -g @anthropic-ai/claude-code
```
→ 맥 로그인 비밀번호 입력하면 해결

### "'npm'은 내부 명령이 아닙니다" (윈도우)
→ PowerShell 검색 → 우클릭 → "관리자 권한으로 실행" → 다시 시도

### `claude` 명령어가 안 먹힘
→ 터미널/PowerShell 완전히 닫고 새로 열기

---

## 실행 에러

### Claude Code가 브랜드 톤을 무시함
→ CLAUDE.md 파일이 현재 폴더에 있는지 확인
```bash
ls -la | grep CLAUDE
```

### 응답이 갑자기 이상해짐 (아까 설명한 걸 잊어버림)
→ 컨텍스트 윈도우 초과. `/clear` 로 초기화 후 재시작

### 스킬이 실행 안 됨 (`/social-media` 가 안 먹힘)
→ 파일 위치 확인: `.claude/commands/social-media.md` 에 있어야 함
```bash
ls .claude/commands/
```

### "Rate limit exceeded" 오류
→ Pro 플랜 일일 한도 초과. 내일 다시 시도하거나 `/model haiku`로 변경

---

## CLAUDE.md 관련

### AI가 한국어로 안 씀
→ CLAUDE.md에 추가:
```
## 언어 규칙
- 모든 출력은 한국어로 작성
- 영어 용어는 괄호로 병기 가능 (예: 컨텍스트 윈도우 (Context Window))
```

### 해시태그 개수가 매번 달라짐
→ CLAUDE.md 콘텐츠 가이드라인에 구체적으로 명시:
```
- 인스타그램: 해시태그 정확히 13개 (한국어 8개 + 영어 5개)
```

---

## Hooks 에러 (Part 18)

### Hook이 실행 안 됨
→ `settings.json` 위치 확인: `.claude/settings.json`
→ JSON 문법 오류 확인 (쉼표 빠진 것 등)

### Hook이 너무 자주 실행됨
→ matcher 패턴 더 좁게 설정:
```json
"matcher": "content/2026-*/*.md"  ← 날짜 폴더 안만 감시
```
