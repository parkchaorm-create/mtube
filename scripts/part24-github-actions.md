# Part 24: GitHub Actions – 매주 월요일 자동으로 공연장이 열린다

## 메타 정보
- **예상 길이**: 10분 (약 2,500~3,000자)
- **화면 구성**: 웹캠 → 슬라이드(Git 기초) → 안티그래비티(YAML 작성) → 브라우저(GitHub Secrets) → 터미널(테스트) → 웹캠
- **핵심 비유**: GitHub Actions = 매주 월요일 오전에 자동으로 공연장 문이 열리는 시스템
- **프레이밍**: 보너스 파트 (ACT 4)

---

## [HOOK] 오프닝 후크

[📺 화면: 웹캠 단독]

보스님들, 지금까지 만든 시스템 정말 강력합니다.

근데 한 가지 아쉬운 점이 있죠.
매번 보스님이 컴퓨터 앞에 앉아서
명령어를 입력해야 한다는 겁니다.

오케스트라로 비유하면요,
공연장 문을 열 사람이 필요한 거죠.
아무리 자동 연주 시스템이 있어도,
공연장 문이 안 열리면 공연이 시작 안 되잖습니까.

근데 만약에 매주 월요일 오전 9시에
공연장 문이 자동으로 열린다면요?

보스님은 파자마 입고 침대에 계셔도,
콘텐츠 파이프라인이 자동으로 돌아가는 겁니다!

이걸 가능하게 하는 게 GitHub Actions입니다.
무료고, 설정 한 번이면 끝이거든요.

---

## [CONCEPT] Git 기초 – 딱 두 개만

[📺 화면: 슬라이드]
[📊 PPT 지문: Git 기초 (이것만!)
- commit = 작업 내용을 사진 찍어 저장
- push = 저장한 사진을 클라우드(GitHub)에 업로드
그게 끝입니다!]

GitHub Actions를 쓰려면 Git이라는 걸 알아야 하는데요.
겁먹지 마세요.
딱 두 개만 알면 됩니다.

**commit**은 작업 내용을 사진 찍어 저장하는 겁니다.
"지금 이 상태를 기록해둘게" 하고 스냅샷을 찍는 거죠.

**push**는 그 사진을 클라우드, 즉 GitHub에 올리는 겁니다.

이게 끝입니다. 진짜로요.
개발자들이 쓰는 브랜치, 머지, 리베이스 같은 건 몰라도 됩니다.
commit이랑 push만 알면 충분하거든요.

실제로 해보면 이렇습니다.

```bash
git add .
git commit -m "콘텐츠 스킬 업데이트"
git push
```

세 줄입니다.
이 세 줄이면 보스님들 프로젝트가 GitHub에 올라갑니다.

---

## [DEMO] GitHub 레포지토리 만들기

[📺 화면: 브라우저 - github.com]

GitHub 계정이 없으시면 github.com에서 무료로 만드세요.

[📺 화면: 마우스로 "New repository" 버튼 클릭]

로그인하시고 "New repository" 버튼을 누릅니다.
이름은 `my-ai-marketing` 정도로 하시면 되고요.
Private으로 설정하세요.
우리 스킬 파일은 비공개가 좋으니까요.

생성하면 안내 화면이 나옵니다.
거기 나오는 명령어를 안티그래비티 터미널에 복붙하면 끝이거든요.

```bash
git remote add origin https://github.com/보스님아이디/my-ai-marketing.git
git push -u origin main
```

[📺 화면: 터미널에서 push 완료 확인]

push 완료!
이제 보스님들 프로젝트가 GitHub 클라우드에 있습니다.

---

## [DEMO] GitHub Actions YAML 파일 작성

[📺 화면: 안티그래비티 - weekly-content.yml 파일]

이제 핵심입니다.
GitHub Actions 워크플로우 파일을 만들겠습니다.

`.github/workflows/weekly-content.yml` 파일을 만드세요.

```yaml
name: 주간 콘텐츠 자동 생성

on:
  schedule:
    - cron: '0 0 * * 1'  # 매주 월요일 오전 9시 (KST)
  workflow_dispatch:       # 수동 실행도 가능

jobs:
  create-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Node.js 설치
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Claude Code 실행
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          BLOTATO_API_KEY: ${{ secrets.BLOTATO_API_KEY }}
        run: |
          npx @anthropic-ai/claude-code --print \
            "이번 주 콘텐츠 5개를 생성하고, 
             각 SNS 채널에 슬롯 발행으로 예약해줘.
             브랜드 보이스 가이드 참고하고,
             퀄리티 게이트 통과시켜줘."
```

[📺 화면: 마우스로 cron 부분 가리킴]

`cron: '0 0 * * 1'`이 매주 월요일을 뜻합니다.
GitHub는 UTC 기준이라
한국 시간 오전 9시로 맞추려면 UTC 0시로 설정하는 거죠.

`workflow_dispatch`는 수동 실행 버튼입니다.
월요일까지 안 기다리고 지금 바로 테스트하고 싶을 때 쓰는 거고요.

---

## [DEMO] GitHub Secrets에 API 키 안전하게 저장

[📺 화면: 브라우저 - GitHub Settings]

API 키를 코드에 직접 넣으면 위험합니다.
GitHub Secrets를 써야 하거든요.

[📺 화면: 마우스로 Settings → Secrets and variables → Actions 클릭]

GitHub 레포지토리 페이지에서 Settings를 클릭하세요.
왼쪽 메뉴에서 "Secrets and variables" → "Actions"를 클릭합니다.

"New repository secret" 버튼을 누르고요.

첫 번째, 이름에 `ANTHROPIC_API_KEY`를 넣고,
값에 Claude API 키를 붙여넣습니다.

두 번째, 같은 방식으로 `BLOTATO_API_KEY`도 추가하고요.

이렇게 저장하면
GitHub Actions가 실행될 때 자동으로 API 키를 가져다 씁니다.
키가 코드에 노출될 일이 없죠.
금고에 넣어두고 필요할 때 꺼내쓰는 겁니다.

---

## [DEMO] 테스트 실행

[📺 화면: 브라우저 - GitHub Actions 탭]

push하고 나서 GitHub Actions 탭을 열어보겠습니다.

[📺 화면: 마우스로 "Run workflow" 버튼 클릭]

"Run workflow" 버튼이 보이죠?
이게 수동 실행 버튼입니다.
클릭해보겠습니다.

워크플로우가 돌아가기 시작합니다.
Claude Code가 콘텐츠를 만들고,
퀄리티 게이트를 통과시키고,
SNS에 예약 발행하는 전 과정이 자동으로 진행되거든요.

완료되면 초록색 체크 표시가 뜹니다.

보스님은 이 버튼 한 번 누른 것 외에 아무것도 안 했습니다.
월요일부터는 이 버튼도 안 눌러도 되죠.
cron이 자동으로 실행해주니까요.

---

## [RECAP]

GitHub Actions 핵심 정리!

첫 번째, Git은 commit(사진 찍기)이랑 push(업로드)만 알면 됩니다.
두 번째, YAML 파일 하나로 매주 자동 실행. 무료입니다.
세 번째, API 키는 GitHub Secrets에. 금고에 넣어두고 자동으로 꺼내쓰는 거죠.

---

## [BRIDGE] 다음 파트 연결

[📊 프로그레스 맵: ACT 4 | Part 21~24 ✅]

매주 월요일 자동으로 공연장 문이 열리는 시스템까지 완성했습니다!

지금 상태로도 이미 대단한 시스템입니다.
근데 한 가지 더 있거든요.
지금 시스템은 매주 똑같은 퀄리티로 콘텐츠를 만듭니다.

다음 파트에서는 시스템이 스스로 실력을 키우게 만들겠습니다.
관객 반응을 분석해서
다음 공연을 자동으로 개선하는 AI 지휘자를 만드는 겁니다!
