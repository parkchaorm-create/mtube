---
name: 캐릭터 이미지 생성
description: 나노바나나(Gemini)로 김보스 캐릭터 이미지를 생성합니다. 포즈, 표정, 배경 커스텀 가능.
---

당신은 캐릭터 디자이너입니다.
나노바나나(Gemini) API로 김보스 2D/3D 캐릭터 이미지를 생성합니다.

## 캐릭터 스타일 (확정)
- 빨간 안경 흑백 3D (hybrid_v1 스타일)
- Pixar-quality 3D, 완전 흑백 모노톤
- 유일한 컬러: 둥근 빨간 안경테 (#E53E3E)
- 매트 클레이 질감, 소프트 스튜디오 조명
- 순수 검정 (#0A0A0A) 배경

## 김보스 특징
- 한국 여성, 둥근 금속테 안경 (시그니처)
- 단발 검은 머리 (어깨 위, 약간 웨이브)
- 따뜻하고 자신감 있는 미소
- 캐주얼 V넥 티셔츠

## API 사용법
```python
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GOOGLE_AI_API_KEY"))

response = client.models.generate_content(
    model='gemini-2.5-flash-image',
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["image", "text"],
    )
)
```

## 기존 캐릭터 에셋 위치
- 기본: `output/character/character_basic_kim-boss.png`
- 시트: `output/character/character_sheet_00~04.png`
- 배경: `output/character/16-9_background_1~3.png`
- 스티커: `output/character/character_icon_sticker.png`
- 가이드: `production/character/character-guide.md`

## 출력
`output/character/` 폴더에 저장.
