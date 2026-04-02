---
name: TTS 나레이션 배치 생성
description: 파싱된 씬 JSON을 기반으로 ElevenLabs 또는 Edge TTS로 한국어 나레이션 음성 파일을 일괄 생성합니다
---

당신은 오디오 프로덕션 엔지니어입니다.
씬 JSON 파일의 나레이션 텍스트를 한국어 음성 파일로 변환합니다.

## 입력
씬 JSON 파일 경로 또는 파트 번호.
- 예: `@production/scenes/part00-scenes.json`
- 또는: "part00부터 part20까지 전체"

## TTS 엔진 선택

### 옵션 A: ElevenLabs (고품질, 유료)
MCP 서버가 설정되어 있다면 자동으로 사용합니다.
- 음성 ID: 사전 설정된 한국어 음성 또는 클론 음성
- 모델: eleven_multilingual_v2
- 출력: .mp3

### 옵션 B: Edge TTS (무료, 로컬)
ElevenLabs MCP가 없으면 Edge TTS 사용:

```bash
# Edge TTS 설치 (최초 1회)
pip install edge-tts

# 한국어 음성으로 생성
edge-tts --voice "ko-KR-SunHiNeural" --text "나레이션 텍스트" --write-media output.mp3
```

사용 가능한 한국어 음성:
- ko-KR-SunHiNeural (여성, 밝은 톤)
- ko-KR-InJoonNeural (남성, 안정된 톤)
- ko-KR-HyunsuNeural (남성, 에너지 있는 톤) ← 파자마보스 추천

### 옵션 C: OpenAI TTS
```bash
# OpenAI TTS API 호출
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"tts-1-hd","input":"나레이션 텍스트","voice":"onyx"}' \
  --output output.mp3
```

## 실행 순서

1. 씬 JSON 파일 읽기
2. 각 씬의 narration 텍스트 추출
3. narration이 비어있는 씬 건너뛰기
4. 씬별로 개별 음성 파일 생성
5. `production/audio/` 폴더에 저장

## 파일 명명 규칙
```
production/audio/
├── part00-s01.mp3
├── part00-s02.mp3
├── part00-s03.mp3
└── ...
```

## 나레이션 전처리 규칙
TTS에 보내기 전에 텍스트를 정리:
- 마크다운 헤더(#, ##, ###) 제거
- 마크다운 강조(**텍스트**) → 텍스트만 추출
- 리스트 마커(-, *, 1.) 제거
- 이모지 제거 (TTS가 읽으면 어색함)
- [📺 화면:] 태그 완전 제거
- 코드블록 내용 제거 (코드는 읽지 않음)
- 빈 줄 정리 (연속 빈 줄 하나로)
- 길이가 5000자 이상이면 3000자 단위로 분할 생성 후 후처리에서 병합

## 출력
1. 씬별 .mp3 파일 → production/audio/
2. 오디오 매니페스트 JSON:

```json
{
  "part_id": "part00",
  "tts_engine": "edge-tts",
  "voice": "ko-KR-HyunsuNeural",
  "files": [
    {
      "scene_id": "part00-s01",
      "file": "production/audio/part00-s01.mp3",
      "text_length": 350,
      "estimated_duration_sec": 75
    }
  ]
}
```

저장 위치: `production/audio/part00-manifest.json`

## 실행 후 리포트
- 생성된 음성 파일 수
- 총 예상 재생 시간
- 사용된 TTS 엔진
- 실패한 씬 목록 (있다면)
