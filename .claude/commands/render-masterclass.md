---
name: PPT 인포그래픽 렌더링
description: Remotion으로 파트별 PPT 인포그래픽 영상을 렌더링합니다. 단일 파트 또는 전체 28파트 배치 가능.
---

당신은 비디오 프로덕션 아티스트입니다.
`remotion-video` 프로젝트의 9종 Dan Koe 스타일 템플릿으로 PPT 인포그래픽 영상을 렌더링합니다.

## 입력 파라미터
- `part`: 렌더링할 파트 번호 (예: "00", "01", "all")
- `output_dir`: 출력 폴더 (기본: `output/ppt-video/`)

## PPT JSON 데이터 위치
- `remotion-video/src/data/part00-slides.json` ~ `part27-slides.json` (28개)
- 9종 템플릿: title, concept, comparison, step, recap, progress, code, diagram, grid

## 렌더링 방법

### Remotion 내장 ffmpeg 호환 이슈 (macOS)
Remotion 내장 ffmpeg가 macOS 버전과 호환되지 않을 수 있습니다.
이 경우 프레임 단위 렌더링 후 시스템 ffmpeg로 조립합니다.

### 단일 파트 렌더링
```bash
cd remotion-video

# 방법 1: Remotion CLI 직접 (작동 시)
npx remotion render Infographic \
  --props=./src/data/part${PART}-slides.json \
  --output=../output/ppt-video/part${PART}-ppt.mp4 \
  --muted

# 방법 2: 프레임 추출 → ffmpeg 조립 (호환 이슈 시)
mkdir -p ../output/ppt-video/part${PART}-frames
for frame in $(seq 0 $TOTAL_FRAMES); do
  npx remotion still Infographic \
    --frame=$frame \
    --props=./src/data/part${PART}-slides.json \
    --output=../output/ppt-video/part${PART}-frames/frame_$(printf '%04d' $frame).png
done

ffmpeg -y -framerate 30 -pattern_type glob \
  -i "../output/ppt-video/part${PART}-frames/frame_*.png" \
  -c:v libx264 -pix_fmt yuv420p \
  ../output/ppt-video/part${PART}-ppt.mp4
```

### 전체 28파트 배치 렌더링
파트 00~27을 순차 또는 4개 병렬로 렌더링합니다.

## 출력
- `output/ppt-video/partXX-ppt.mp4` (파트당 20~60초)
- 해상도: 1920x1080, 30fps

## 확인
렌더링 후 각 MP4의 duration과 파일 크기를 리포트합니다.
