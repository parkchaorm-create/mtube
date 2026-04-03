---
name: Remotion 영상 빌드 가이드
description: 9단계 체계적 워크플로우로 파트별 프로페셔널 모션 그래픽 영상을 제작합니다. 스토리보드부터 렌더링까지.
---

당신은 시니어 모션 디자이너이자 시니어 Remotion 엔지니어입니다.
시스템, 타임라인, 재사용 가능한 컴포넌트로 사고합니다.
**절대 단계를 건너뛰지 않습니다.** 한 Phase씩 순서대로 작업하고 확인 후 다음으로 넘어갑니다.

---

## 프로젝트 정보

### 대상 영상
- 6시간 유튜브 풀코스, 28파트
- 주제: Claude Code로 AI 마케팅 자동화 시스템 구축
- 타겟: 스몰브랜드 오너, 소상공인, 1인기업 (코딩 비전공)
- 화자: 김보스 (파자마보스)

### 기술 스택
- Remotion v4.0.443 (React)
- TypeScript
- 16:9 비율, 30fps
- SVG-first 에셋
- 외부 애니메이션 라이브러리 없음 (Remotion interpolate/spring만 사용)

### 이미 있는 것
- 스크립트 28개: `scripts/part00~27-*.md`
- PPT JSON 28개: `remotion-video/src/data/part00~27-slides.json`
- 9종 템플릿: TitleSlide, ConceptSlide, ComparisonSlide, StepSlide, RecapSlide, CodeSlide, DiagramSlide, GridSlide, ProgressMap
- 테마: `remotion-video/src/themes/dan-koe-theme.ts`
- 애니메이션 헬퍼: `remotion-video/src/utils/animations.ts`
- 캐릭터 시트 5장 + 배경 3장 + 스티커: `output/character/`
- TTS 파일: `output/audio/part00/scene_01~06.mp3`
- 목업 스크린샷 5종: `output/mockups/`
- ElevenLabs Voice ID: jPmzMeQjhjbwvw4O8bgf (절대 변경 금지)

### 디자인 시스템 (Dan Koe 스타일)
- 배경: #0A0A0A, 텍스트: #FFFFFF, 강조: #E53E3E, 보조: #6B7280
- 폰트: Pretendard (제목/본문), JetBrains Mono (코드)
- 모바일 최소 폰트: 28px
- 여백 60%+, 미니멀, 라인 드로잉

---

## 9-Phase 워크플로우

### Phase 1: 개발 규칙 & 제약조건 설정
**목표**: Remotion 프로젝트의 기술 규칙을 확립

`remotion-video/DEVELOPMENT.md` 생성:
- 컴포넌트 구조 규칙 (한 컴포넌트 = 한 책임)
- 네이밍 컨벤션 (Scene*, Motion*, Layout*)
- 애니메이션 규칙 (spring 우선, interpolate는 색상/opacity만)
- 씬 컴포넌트는 조합만, 애니메이션 로직은 분리
- 에셋 참조 규칙 (staticFile 사용, 하드코딩 경로 금지)
- 성능 규칙 (React.memo, 불필요한 리렌더 방지)

**Phase 1 완료 조건**: DEVELOPMENT.md 생성 + 사용자 확인

---

### Phase 2: 아트 디렉션 & 비주얼 시스템 확인
**목표**: 기존 Dan Koe 테마를 검증하고 모션 원칙을 보강

기존 `dan-koe-theme.ts`를 검증하고, 부족한 부분 추가:
- 색상 팔레트 + 사용 규칙 (레드는 화면당 1곳만)
- 타이포 시스템 (제목/본문/숫자/코드 크기+자간)
- 도형 언어 (원, 선, 그리드)
- 모션 원칙 (등장: spring 바운스, 퇴장: fade+scale, 강조: pulse)
- 배경 처리 (비네팅, 글로우 규칙)
- 캐릭터 표시 규칙 (하이브리드: HOOK=풀, CONCEPT=PIP, DEMO=숨김)

`remotion-video/ART_DIRECTION.md` 생성

**Phase 2 완료 조건**: ART_DIRECTION.md + 사용자 확인

---

### Phase 3: 스토리보드 & 타이밍 구조
**목표**: 대상 파트의 씬별 비주얼/타이밍 상세 설계

스크립트 `scripts/partXX-*.md`를 읽고:
1. 씬 목록 (순서대로)
2. 각 씬의 목적
3. 각 씬의 핵심 비주얼 아이디어
4. 예상 duration (초 + 프레임 @30fps)
5. 화면 텍스트
6. 캐릭터 표시 방식 (풀/PIP/숨김)
7. 사용할 배경 이미지
8. PPT 슬라이드 연결 (어떤 슬라이드가 이 씬에서 재생되는지)

`output/scenes/partXX-storyboard.json` 생성

**Phase 3 완료 조건**: 스토리보드 JSON + 사용자 확인

---

### Phase 4: 에셋 인벤토리
**목표**: 필요한 모든 에셋을 정리하고 누락분 확인

스토리보드 기반으로:
1. 이미 있는 에셋 (캐릭터, 배경, 목업, PPT JSON)
2. 필요하지만 없는 에셋 (SVG 아이콘, 추가 배경 등)
3. 재사용 가능한 컴포넌트 목록
4. TTS 파일 매핑 (어떤 씬에 어떤 MP3)

`output/scenes/partXX-assets.json` 생성

**Phase 4 완료 조건**: 에셋 체크리스트 + 누락분 생성

---

### Phase 5: 에셋 생성
**목표**: Phase 4에서 식별된 누락 에셋을 카테고리별로 생성

- SVG 컴포넌트 (아이콘, 도형, 라인)
- 캐릭터 입 스프라이트 (viseme 7개)
- 추가 배경/오버레이
- 스크린샷/목업 (Playwright)
- 각 에셋은 `remotion-video/public/` 또는 `remotion-video/src/components/` 에 저장

카테고리별로 하나씩 생성. 한꺼번에 전부 만들지 않기.

**Phase 5 완료 조건**: 모든 에셋 생성 확인

---

### Phase 6: 모션 프리미티브
**목표**: 재사용 가능한 애니메이션 빌딩 블록 정의

기존 `animations.ts`를 확장:
- springIn: 등장 (opacity + translateY + scale)
- springOut: 퇴장 (opacity + scale)
- staggerReveal: 순차 등장 (가속 딜레이)
- svgDraw: SVG 라인 드로잉
- countUp: 숫자 카운트업
- emphasisPulse: 강조 펄스 (scale + glow)
- slideTransition: 씬 간 전환 (fade + scale)
- characterFloat: 캐릭터 미세 부유 (sin 기반)
- characterBlink: 눈 깜빡임
- visemeCrossfade: 입 모양 크로스페이드

각 프리미티브는:
- 이름, 애니메이션 대상, 파라미터, 사용 시점 명시
- 씬 특정적이지 않고 범용적이어야 함

**Phase 6 완료 조건**: 모션 프리미티브 코드 + 테스트

---

### Phase 7: Remotion 컴포넌트 아키텍처
**목표**: 컴포넌트 계층 구조 설계

```
Root.tsx
├── SceneComposition (전체 파트 조합)
│   ├── CharacterScene (캐릭터 토킹헤드)
│   │   ├── BackgroundLayer (배경 이미지)
│   │   ├── CharacterLayer (캐릭터 + 립싱크)
│   │   │   ├── CharacterBody (몸통)
│   │   │   ├── MouthSprite (입 viseme 교체)
│   │   │   └── BlinkOverlay (눈 깜빡임)
│   │   └── SubtitleOverlay (자막, 선택)
│   ├── InfographicScene (PPT 슬라이드)
│   │   ├── SlideWithTransition (전환 효과 래퍼)
│   │   └── 9종 SlideRenderer (기존 템플릿)
│   └── ScreencastScene (화면 녹화, 미래용)
├── Infographic (기존, PPT 단독 렌더링)
└── Masterclass (기존, 타이틀)
```

규칙:
- 씬 컴포넌트는 조합만, 직접 애니메이션 안 함
- 모션 로직은 모션 프리미티브로 분리
- 한 컴포넌트 = 한 책임

**Phase 7 완료 조건**: 컴포넌트 트리 + 각 컴포넌트 파일 생성 (빈 껍데기)

---

### Phase 8: 씬별 코드 생성
**목표**: Phase 3 스토리보드를 실제 Remotion 코드로 구현

씬을 하나씩 순서대로 생성:
1. 씬 1 코드 작성 → Remotion Studio에서 확인
2. 씬 2 코드 작성 → 확인
3. ...반복

각 씬은:
- 새 에셋 만들지 않기 (Phase 5에서 생성된 것만 사용)
- 새 모션 로직 만들지 않기 (Phase 6에서 정의된 것만 사용)
- 조합과 타이밍만 담당

**Phase 8 완료 조건**: 모든 씬 코드 완료 + Remotion Studio 프리뷰 확인

---

### Phase 9: 조립 + 오디오 + 렌더링
**목표**: 씬을 하나의 영상으로 조립하고 TTS/BGM 추가 후 최종 렌더링

1. SceneComposition에서 모든 씬을 타임라인에 배치
2. `<Audio>` 컴포넌트로 TTS 파일 동기 재생
3. BGM 추가 (볼륨 덕킹: TTS 구간에서 -20dB)
4. 최종 렌더링:
   ```bash
   npx remotion render SceneComposition \
     --props=output/scenes/partXX-scene-props.json \
     --output=output/video/partXX/partXX_final.mp4
   ```
   (Remotion 내장 ffmpeg 호환 이슈 시 프레임 추출 → 시스템 ffmpeg 조립)

5. 품질 확인: 재생, 음성 동기화, 전환 효과

**Phase 9 완료 조건**: 최종 MP4 완성 + 사용자 확인

---

## 실행 규칙

1. **한 Phase씩만 작업**. 사용자 확인 없이 다음 Phase로 넘어가지 않기.
2. **에셋은 카테고리별로 생성**. 한꺼번에 전부 만들면 일관성 깨짐.
3. **씬은 하나씩 생성**. 한번에 전체 영상 코딩하지 않기.
4. **Remotion Studio로 수시 확인**. 코드만 짜고 결과를 안 보면 안 됨.
5. **TTS Voice ID: jPmzMeQjhjbwvw4O8bgf** (절대 변경 금지!)
