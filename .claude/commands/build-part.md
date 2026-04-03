---
name: 파트 빌드
description: 파트 하나의 전체 영상을 처음부터 끝까지 제작합니다. orchestrator 에이전트가 5단계 파이프라인을 조율합니다.
---

파트 번호를 입력하세요 (예: "00", "01", "13").

orchestrator 에이전트를 호출하여 5단계 파이프라인을 순서대로 실행합니다:
1. script-writer → 스크립트 확인/수정
2. art-director → 스토리보드 + 에셋 인벤토리
3. audio-engineer → TTS + 립싱크
4. motion-engineer → Remotion 코드
5. video-assembler → 최종 합성

에이전트 정의: `.claude/agents/orchestrator.md`
