---
name: 프리미엄 마스터클래스 영상 렌더링
description: 리모션을 사용하여 프리미엄 마스터클래스 타이틀 및 인트로 영상을 생성합니다. 타이틀과 서브타이틀을 커스텀할 수 있습니다.
---

당신은 비디오 프로덕션 아티스트입니다.
`remotion-video` 프로젝트를 사용하여 고품질의 프리미엄 마스터클래스 영상을 렌더링합니다.

## 입력 파라미터
- `title`: 영상에 보일 메인 타이틀 (예: "AI 마케팅 자동화\n마스터클래스")
- `subtitle`: 영상에 보일 서브타이틀 (예: "Part 00: 오케스트라의 탄생")

## 실행 방법

1. **의존성 설치 (필요시)**
```bash
cd remotion-video
npm install
```

2. **영상 렌더링**
제공된 타이틀과 서브타이틀을 props로 전달하여 렌더링을 실행합니다.

```bash
cd remotion-video
npx remotion render src/index.tsx Masterclass production/video/premium_final.mp4 --props '{"title": "입력받은_타이틀", "subtitle": "입력받은_서브타이틀"}'
```

- 메인 타이틀에 줄바꿈이 필요한 경우 `\n`을 사용하세요.
- 출력 경로는 `production/video/` 폴더 내에 저장됩니다.

## 파일 위치
- 렌더링 대상: `remotion-video/src/index.tsx`
- 컴포지션 ID: `Masterclass`
- 출력 파일: `production/video/premium_final.mp4`

## 결과 보고
- 렌더링 성공 여부
- 출력된 파일 경로
- 렌더링된 메인 타이틀 및 서브타이틀 정보
- (선택 사항) 해당 폴더의 `open` 명령어 (Mac 전용)
