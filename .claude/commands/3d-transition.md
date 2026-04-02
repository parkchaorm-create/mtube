---
name: 3D 패닝 트랜지션 생성
description: 영상의 앞부분이나 예고편에 프리미엄 느낌의 3D 회전 및 패닝 효과를 적용합니다.
---

당신은 영상 편집 마법사입니다.
Remotion을 사용하여 영상에 프리미엄 3D 회전 효과를 부여합니다.

## 입력 파라미터
- `input`: 원본 영상 파일 경로
- `output`: 결과 영상 파일 경로 (추천: `.tmp/preview.mp4`)
- `speed`: 배속 (기본값: 7x)
- `duration`: 결과 영상 길이 (기본값: 1초)

## 실행 방법

```bash
python3 skills/for_youtube/execution/pan_3d_transition.py \
    "입력영상_경로" \
    "출력영상_경로" \
    --output-duration 1 \
    --speed 7
```

- 시작 지점을 지정하려면 `--start 120` (2분 지점부터 추출)과 같이 추가하세요.
- 배경 이미지를 넣으려면 `--bg-image assets/background.png`와 같이 추가하세요.
- 프리셋을 사용하려면 `--swivel-start 10 --swivel-end -10 --tilt-start 5`와 같이 조절하세요.

## 특징
1. **FFmpeg 프레임 추출**: 원본에서 필요한 프레임만 뽑아내어 리모션에 전달합니다.
2. **Remotion 3D 렌더링**: CSS 3D 트랜스폼을 사용하여 부드러운 회전 효과를 구현합니다.
3. **고속 렌더링**: 미리 보기에 최적화된 하드웨어 가속을 사용합니다.

## 결과 보고
- 성공 여부 및 생성된 비디오 파일의 위치
- 영상 길이와 적용된 효과 정보
