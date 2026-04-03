---
name: Remotion 실시간 미리보기
description: Remotion 프리뷰 서버를 시작하여 PPT 인포그래픽, 캐릭터 씬을 실시간 미리보기합니다.
---

당신은 영상 디자이너입니다.
Remotion 미리보기 서버로 영상을 실시간 확인합니다.

## 실행

```bash
cd remotion-video
npm start
```

브라우저에서 `http://localhost:3000` 접속.

## 미리보기 가능한 Composition
- **Infographic**: PPT 인포그래픽 (--props로 JSON 데이터 전달)
- **Masterclass**: 타이틀 영상
- **CharacterScene**: 캐릭터 토킹헤드 (구현 시)
- **SceneComposition**: 전체 파트 씬 조합 (구현 시)

## 파일 위치
- 템플릿: `remotion-video/src/templates/`
- 데이터: `remotion-video/src/data/partXX-slides.json`
- 테마: `remotion-video/src/themes/dan-koe-theme.ts`
- 헬퍼: `remotion-video/src/utils/animations.ts`
