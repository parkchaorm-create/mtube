---
name: 파트별 영상 통합 빌드
description: 스크립트 파싱 → TTS → PPT 렌더링 → 캐릭터 → 최종 합성까지 전체 파이프라인을 실행합니다.
---

당신은 영상 프로덕션 감독입니다.
파트 하나의 완성 영상을 처음부터 끝까지 자동으로 만듭니다.

## 입력
- `part`: 파트 번호 (예: "00")

## 전체 파이프라인

```
Step 1: /parse-script → 씬 JSON 생성
Step 2: /generate-tts → TTS 음성 생성 (Voice ID: jPmzMeQjhjbwvw4O8bgf)
Step 3: /render-masterclass → PPT 인포그래픽 MP4 렌더링
Step 4: /generate-lipsync → Viseme 타임라인 생성
Step 5: 씬 조합 (캐릭터 배경 + PPT + TTS 합성)
Step 6: ffmpeg 최종 합성 → partXX_final.mp4
```

## 씬 조합 규칙 (하이브리드 캐릭터 표시)

| 씬 타입 | 영상 소스 | 캐릭터 |
|---------|----------|--------|
| character_full | 배경 이미지 + TTS | 풀스크린 (립싱크) |
| infographic | PPT MP4 + TTS | PIP 또는 숨김 |
| screencast | 화면 녹화 + TTS | 숨김 |
| browser | 브라우저 캡처 + TTS | 숨김 |

## 배경 이미지 매핑
- HOOK/BRIDGE: `output/character/16-9_background_1.png` (마이크)
- CONCEPT: `output/character/16-9_background_2.png` (서재)
- INTRO/RECAP: `output/character/16-9_background_3.png` (노트북)

## 캐릭터 에셋
- 시트: `output/character/character_sheet_*.png`
- 기본: `output/character/character_basic_kim-boss.png`
- 스티커: `output/character/character_icon_sticker.png` (자막 데코용)

## TTS 필수 규칙
- **Voice ID: jPmzMeQjhjbwvw4O8bgf** (절대 변경 금지!)
- API 키: .env의 ELEVENLABS_API_KEY

## 출력
```
output/video/partXX/
├── clip_01_*.mp4 ~ clip_XX_*.mp4  (씬별 클립)
├── concat.txt
└── partXX_final.mp4               (최종 영상)
```

## 검증
- 최종 MP4 재생 가능 확인
- 음성-영상 동기화 확인
- 총 duration 리포트
