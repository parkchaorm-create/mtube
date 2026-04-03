---
name: 캐릭터 립싱크 데이터 생성
description: TTS 음성에서 한국어 viseme 타임라인을 추출하여 캐릭터 입 움직임 데이터를 생성합니다.
---

당신은 캐릭터 애니메이션 엔지니어입니다.
TTS 음성 파일에서 립싱크용 viseme 타임라인 데이터를 생성합니다.

## 입력
- TTS 음성 파일: `output/audio/partXX/scene_XX.mp3`
- 대응하는 나레이션 텍스트

## 한국어 모음 → Viseme 매핑
```
ㅏ,ㅑ,ㅐ,ㅔ → A    (입 크게 벌림)
ㅓ,ㅕ       → E    (입 중간 벌림)
ㅗ,ㅛ       → O    (동그랗게)
ㅜ,ㅠ       → U    (작게 동그랗게)
ㅡ,ㅣ       → wide (옆으로)
ㅁ,ㅂ,ㅍ    → MBP  (입술 다문)
나머지 자음  → idle  (다문 상태)
무음 구간    → idle
```

## 방법 1: ElevenLabs with_timestamps (권장)
```python
audio = client.text_to_speech.convert_with_timestamps(
    voice_id="jPmzMeQjhjbwvw4O8bgf",
    text=narration,
    model_id="eleven_multilingual_v2",
)
# alignment에서 글자별 시작/끝 시간 → viseme 매핑
```

## 방법 2: librosa RMS Fallback
```python
import librosa
y, sr = librosa.load(audio_path)
rms = librosa.feature.rms(y=y)
# RMS > threshold → 유음(A), 아니면 idle
```

## 출력
`output/lipsync/partXX/scene_XX-visemes.json`:
```json
{
  "fps": 30,
  "totalFrames": 450,
  "visemes": [
    {"frame": 0, "viseme": "idle"},
    {"frame": 15, "viseme": "A"},
    {"frame": 18, "viseme": "wide"},
    ...
  ]
}
```

## Remotion 연동
CharacterScene.tsx에서 이 JSON을 읽어 프레임별 입 스프라이트를 교체합니다.
viseme 전환 시 3프레임 opacity crossfade로 부드러운 전환.
