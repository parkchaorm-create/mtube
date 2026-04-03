---
name: 렌더링
description: PPT 인포그래픽 또는 최종 영상을 렌더링합니다. video-assembler 에이전트 사용.
---

렌더링 대상을 알려주세요.
- "ppt 00" → Part00 PPT 인포그래픽 MP4
- "ppt all" → 28개 전체 PPT 배치 렌더링
- "video 00" → Part00 최종 영상 조립
- "video all" → 28개 전체 최종 영상

에이전트: `.claude/agents/video-assembler.md`
PPT 데이터: `remotion-video/src/data/partXX-slides.json`
출력: `output/ppt-video/` 또는 `output/video/partXX/`
