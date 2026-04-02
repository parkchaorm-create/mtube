import asyncio
import os
import re
import subprocess
import json
import imageio_ffmpeg
from playwright.async_api import async_playwright

EDGE_TTS = "/Users/mac/Library/Python/3.9/bin/edge-tts"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT_DIR = "production/sample"

# ─────────────────────────────────────────────
#  Part 00 씬 정의 (스크립트 기반, 웹캠→인포그래픽 대체)
# ─────────────────────────────────────────────
SCENES = [
    {
        "id": "s01_hook",
        "narration": "보스님들, 잠깐만요. 지금 이 영상을 클릭하셨다면 아마 이런 생각 하셨을 거예요. AI로 마케팅 자동화한다는 거 들어봤는데, 나는 코딩도 모르고, 어디서부터 시작해야 할지 모르겠다. 맞죠? 저도 딱 그랬어요. 불과 2년 전까지만 해도 저는 20년째 코딩 1도 모르는 전형적인 40대 문과생이었습니다. 터미널이 뭔지도 몰랐고, API가 뭔지도 몰랐어요. 그런 제가 지금은요?",
        "visual": "title_hook"
    },
    {
        "id": "s02_demo",
        "narration": "보스님들 잠깐 이것 좀 보세요. Claude Code에 명령어 하나 넣으면, 블로그 포스트, 인스타 캡션, 뉴스레터, 유튜브 쇼츠 스크립트가 한꺼번에 뚝딱 나옵니다. 여기서 끝이 아니에요. 이 AI가 내 웹사이트 SEO 문제점을 자동으로 찾아내고요. 구글 애널리틱스 데이터를 읽어서 이번 달 이 콘텐츠가 왜 잘됐고 다음 달엔 이렇게 하세요 라고 전략까지 짜줍니다. 그리고 제가 잘 때도, 이 AI 마케팅 팀이 계속 일하고 있어요.",
        "visual": "terminal_demo"
    },
    {
        "id": "s03_result",
        "narration": "이게 바로 오늘 여러분이 만들게 될 것입니다. 그것도 Claude Code 하나만으로요. 다른 유료 툴 필요 없습니다.",
        "visual": "result_slide"
    },
    {
        "id": "s04_intro",
        "narration": "제 소개를 잠깐 드릴게요. 저는 파자마보스라고 합니다. 파자마 입고 집에서 AI 하나로 마케팅 다 돌리는 1인 기업가예요. 코딩? 전혀 몰라요. 컴공 출신? 아니요, 문과 출신입니다. 그런 제가 Claude Code를 만나고 나서 뭐가 달라졌냐고요? 내가 자는 동안에도 콘텐츠가 만들어지고, 내가 밥 먹는 동안에도 SEO 분석이 완료돼요. 오늘 이 영상 하나로 보스님들도 그렇게 되실 수 있습니다. 제가 확실하게 끝내드리겠습니다.",
        "visual": "speaker_infographic"
    },
    {
        "id": "s05_overview",
        "narration": "자, 그럼 오늘 4시간 동안 우리가 뭘 할지 딱 정리해드릴게요. 보스님들, 오케스트라 공연 보신 적 있으세요? 바이올린, 첼로, 트럼펫, 드럼, 수십 가지 악기가 지휘자 하나의 손짓에 맞춰서 아름다운 음악을 만들어내잖아요. 오늘 우리가 만들 것이 바로 이겁니다. 나만의 콘텐츠 마케팅 오케스트라.",
        "visual": "orchestra_overview"
    },
    {
        "id": "s06_4acts",
        "narration": "1막, 공연장 세팅. 클로드 코드가 뭔지, 설치와 터미널 기초까지. 2막, 악보 읽는 법 마스터. CLAUDE.md, Plan Mode, 컨텍스트와 토큰, 이미지와 PDF 다루기. 3막, 악기 하나씩 연습하기. 소셜미디어, 리퍼포징, SEO, GA4, 브랜드 보이스 스킬 총 다섯 가지 악기를 만듭니다. 4막, 오케스트라 합주와 자동 공연. 멀티 에이전트, 오케스트레이터, 실전 데모, Hooks까지. 4시간 뒤면 보스님들 컴퓨터에 이 오케스트라가 딱 세팅돼 있을 겁니다.",
        "visual": "four_acts"
    },
    {
        "id": "s07_checklist",
        "narration": "시작하기 전에 준비물 체크리스트 잠깐 확인하고 가겠습니다. 필수 준비물. 첫 번째, 컴퓨터. 맥이든 윈도우든 상관없습니다. 두 번째, Claude 계정. 지금 없으신 분은 claude.ai에서 가입하세요. 세 번째, VS Code. 무료 코드 에디터인데요, 설치 방법 28분에서 같이 해드립니다. 없어도 괜찮아요. 코딩 지식, 개발 경험, 영어 실력, 음악적 재능. 오케스트라 비유일 뿐이에요, 진짜 악기 연주 안 합니다!",
        "visual": "checklist"
    },
    {
        "id": "s08_bridge",
        "narration": "준비되셨나요? 따라갈게요 라고 댓글에 남겨주시면 제가 확인하면서 같이 진행할게요. 자, 그럼 시작합니다! 이제 가장 먼저 클로드 코드가 도대체 뭔지부터 명확하게 정리해드릴게요. ChatGPT랑 뭐가 다른지, 왜 이게 우리 오케스트라의 핵심 엔진인지, 딱 10분 만에 설명해드리겠습니다.",
        "visual": "bridge"
    }
]

# ─────────────────────────────────────────────
#  HTML 비주얼 템플릿 라이브러리
# ─────────────────────────────────────────────
def get_base_style():
    return """
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1920px; height:1080px; overflow:hidden; font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; }
    .bg { width:100%; height:100%; position:relative; }
    """

HTML_TEMPLATES = {
    "title_hook": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; }}
    .badge {{ background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); padding:16px 40px; border-radius:50px; color:#a78bfa; font-size:28px; margin-bottom:50px; letter-spacing:3px; animation: fadeIn 1s ease; }}
    .main {{ font-size:82px; font-weight:800; color:white; line-height:1.4; animation: slideUp 1.2s ease; }}
    .highlight {{ background: linear-gradient(120deg, #60a5fa, #a78bfa, #f472b6); -webkit-background-clip:text; color:transparent; }}
    .sub {{ font-size:38px; color:#94a3b8; margin-top:40px; animation: fadeIn 2s ease; }}
    @keyframes fadeIn {{ 0%{{opacity:0}} 100%{{opacity:1}} }}
    @keyframes slideUp {{ 0%{{opacity:0;transform:translateY(60px)}} 100%{{opacity:1;transform:translateY(0)}} }}
    .particles {{ position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden; z-index:0; }}
    .particle {{ position:absolute; width:4px; height:4px; background:rgba(167,139,250,0.4); border-radius:50%; animation: float 6s infinite; }}
    @keyframes float {{ 0%,100%{{transform:translateY(0) scale(1); opacity:0.4}} 50%{{transform:translateY(-200px) scale(1.5); opacity:0.8}} }}
    </style></head><body><div class="bg">
    <div class="particles">{particles}</div>
    <div style="z-index:1;position:relative;">
    <div class="badge">🎬 FULL COURSE MASTERCLASS</div>
    <div class="main">코딩 1도 모르는 40대 문과생의<br><span class="highlight">AI 마케팅 자동화</span> 풀코스</div>
    <div class="sub">💡 이 영상 하나면 나만의 콘텐츠 마케팅 오케스트라를 만들 수 있습니다</div>
    </div></div></body></html>""",

    "terminal_demo": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:#0a0a1a; display:flex; padding:60px; gap:40px; }}
    .term {{ flex:1.2; background:#1a1a2e; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.8); overflow:hidden; }}
    .term-bar {{ background:#2d2d44; padding:14px 20px; display:flex; gap:10px; align-items:center; }}
    .dot {{ width:14px; height:14px; border-radius:50%; }}
    .r {{background:#ff5f56}} .y {{background:#ffbd2e}} .g {{background:#27c93f}}
    .term-body {{ padding:30px; font-family:'Courier New',monospace; font-size:22px; color:#e2e8f0; line-height:2; }}
    .prompt::before {{ content:"pajamaboss ~ % "; color:#22c55e; font-weight:bold; }}
    .output {{ color:#60a5fa; padding-left:20px; }}
    .success {{ color:#22c55e; }}
    .cursor {{ display:inline-block; width:12px; height:24px; background:#fff; animation:blink 1s step-end infinite; vertical-align:middle; }}
    @keyframes blink {{ 50%{{opacity:0}} }}
    .right {{ flex:1; display:flex; flex-direction:column; gap:30px; justify-content:center; }}
    .card {{ background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:35px; }}
    .card-title {{ color:#a78bfa; font-size:20px; margin-bottom:15px; letter-spacing:2px; }}
    .card-content {{ color:white; font-size:28px; font-weight:600; line-height:1.6; }}
    .tag {{ display:inline-block; background:rgba(96,165,250,0.15); color:#60a5fa; padding:8px 18px; border-radius:8px; font-size:18px; margin:5px; }}
    .glow {{ border:1px solid rgba(167,139,250,0.3); box-shadow: 0 0 30px rgba(167,139,250,0.1); }}
    .line {{ animation: typeLine 0.8s ease forwards; opacity:0; }}
    @keyframes typeLine {{ to {{opacity:1}} }}
    </style></head><body><div class="bg">
    <div class="term glow">
        <div class="term-bar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><span style="color:#94a3b8;margin-left:10px;font-size:16px">Terminal — Claude Code</span></div>
        <div class="term-body" id="tb"></div>
    </div>
    <div class="right">
        <div class="card"><div class="card-title">📊 실시간 생성 결과</div>
            <div class="card-content">
                <div class="tag">📝 블로그 포스트</div><div class="tag">📸 인스타 캡션</div>
                <div class="tag">📧 뉴스레터</div><div class="tag">🎬 유튜브 쇼츠</div>
                <div class="tag">🔍 SEO 분석</div><div class="tag">📈 GA4 리포트</div>
                <div class="tag">🎯 마케팅 전략</div>
            </div>
        </div>
        <div class="card"><div class="card-title">⚡ AUTO-PIPELINE STATUS</div>
            <div class="card-content" style="font-size:22px;">
                <div style="color:#22c55e">✅ 콘텐츠 생성 에이전트 — 활성</div>
                <div style="color:#22c55e">✅ SEO 감사 에이전트 — 활성</div>
                <div style="color:#22c55e">✅ 데이터 분석 에이전트 — 활성</div>
                <div style="color:#f59e0b">⏳ 오케스트레이터 — 대기 중</div>
            </div>
        </div>
    </div></div>
    <script>
    const lines = [
        {{t:'p', text:'claude "소셜미디어 콘텐츠 만들어줘"'}},
        {{t:'o', text:'🤖 소셜미디어 스킬 실행 중...'}},
        {{t:'o', text:'   ✓ 블로그 포스트 (2,500자) 생성 완료'}},
        {{t:'o', text:'   ✓ 인스타그램 캡션 5개 생성 완료'}},
        {{t:'o', text:'   ✓ 뉴스레터 초안 생성 완료'}},
        {{t:'s', text:'📁 결과: output/social-media/ 에 저장됨'}},
        {{t:'p', text:'claude "SEO 감사해줘"'}},
        {{t:'o', text:'🔍 SEO 감사 에이전트 분석 시작...'}},
        {{t:'o', text:'   ✓ 메타 태그 검사 완료 — 점수: 92/100'}},
        {{t:'o', text:'   ✓ 키워드 밀도 분석 완료'}},
        {{t:'s', text:'📊 SEO 리포트 생성 완료!'}},
        {{t:'p', text:'claude "GA4 데이터 분석해줘"'}},
        {{t:'o', text:'📈 GA4 분석 에이전트 작동 중...'}},
        {{t:'o', text:'   ✓ 이번 달 트래픽: +34% 상승'}},
        {{t:'s', text:'💡 추천 전략: "AI 마케팅" 키워드 집중 공략'}},
    ];
    const tb = document.getElementById('tb');
    let i = 0;
    function addLine() {{
        if(i >= lines.length) {{ i=0; tb.innerHTML=''; }}
        const l = lines[i];
        const div = document.createElement('div');
        div.className = 'line';
        div.style.animationDelay = '0.1s';
        if(l.t==='p') {{ div.className += ' prompt'; div.textContent = l.text; }}
        else if(l.t==='o') {{ div.className += ' output'; div.textContent = l.text; }}
        else {{ div.className += ' success'; div.textContent = l.text; }}
        tb.appendChild(div);
        i++;
        setTimeout(addLine, l.t==='p' ? 1800 : 800);
    }}
    addLine();
    </script></body></html>""",

    "result_slide": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background: linear-gradient(135deg, #0f172a, #1e1b4b); display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; }}
    .icon {{ font-size:120px; margin-bottom:40px; animation: bounce 2s ease infinite; }}
    @keyframes bounce {{ 0%,100%{{transform:translateY(0)}} 50%{{transform:translateY(-20px)}} }}
    .main {{ font-size:72px; font-weight:800; color:white; margin-bottom:30px; }}
    .accent {{ color:#a78bfa; }}
    .sub {{ font-size:40px; color:#94a3b8; }}
    .badge {{ margin-top:50px; background:rgba(34,197,94,0.15); border:2px solid rgba(34,197,94,0.3); color:#22c55e; padding:20px 50px; border-radius:50px; font-size:32px; font-weight:700; }}
    </style></head><body><div class="bg">
    <div class="icon">🎼</div>
    <div class="main">오늘 만들어 갈 것:<br><span class="accent">나만의 AI 마케팅 오케스트라</span></div>
    <div class="sub">Claude Code 하나면 충분합니다</div>
    <div class="badge">🔥 다른 유료 툴 필요 없음</div>
    </div></body></html>""",

    "speaker_infographic": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:linear-gradient(135deg, #0f172a, #1e293b); display:flex; align-items:center; padding:80px; gap:80px; }}
    .left {{ flex:1; text-align:center; }}
    .avatar {{ width:300px; height:300px; border-radius:50%; background:linear-gradient(135deg, #a78bfa, #f472b6); display:flex; align-items:center; justify-content:center; font-size:140px; margin:0 auto 40px; box-shadow: 0 0 60px rgba(167,139,250,0.4); }}
    .name {{ font-size:52px; font-weight:800; color:white; }}
    .title2 {{ font-size:28px; color:#a78bfa; margin-top:10px; }}
    .right {{ flex:1.5; }}
    .stat {{ background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:30px 40px; margin-bottom:25px; display:flex; align-items:center; gap:25px; }}
    .stat-icon {{ font-size:44px; }}
    .stat-text {{ color:white; font-size:30px; font-weight:500; }}
    .stat-label {{ color:#94a3b8; font-size:22px; margin-top:5px; }}
    .highlight-box {{ background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(244,114,182,0.15)); border:2px solid rgba(167,139,250,0.3); border-radius:16px; padding:35px; margin-top:30px; }}
    .highlight-text {{ color:white; font-size:32px; font-weight:600; line-height:1.6; font-style:italic; }}
    </style></head><body><div class="bg">
    <div class="left">
        <div class="avatar">👔</div>
        <div class="name">파자마보스</div>
        <div class="title2">AI 1인 기업가 · 콘텐츠 크리에이터</div>
    </div>
    <div class="right">
        <div class="stat"><div class="stat-icon">📚</div><div><div class="stat-text">20년차 문과 출신</div><div class="stat-label">코딩 경험 제로에서 시작</div></div></div>
        <div class="stat"><div class="stat-icon">🤖</div><div><div class="stat-text">Claude Code로 마케팅 완전 자동화</div><div class="stat-label">1인 기업 운영 중</div></div></div>
        <div class="stat"><div class="stat-icon">😴</div><div><div class="stat-text">파자마 입고 집에서 AI 오케스트라 운영</div><div class="stat-label">잠자는 동안에도 콘텐츠 생산</div></div></div>
        <div class="highlight-box"><div class="highlight-text">"내가 자는 동안에도 콘텐츠가 만들어지고,<br>밥 먹는 동안에도 SEO 분석이 완료돼요"</div></div>
    </div></div></body></html>""",

    "orchestra_overview": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:linear-gradient(135deg, #0f172a, #1e1b4b); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px; }}
    .top-title {{ font-size:56px; font-weight:800; color:white; margin-bottom:15px; text-align:center; }}
    .top-sub {{ font-size:30px; color:#a78bfa; margin-bottom:60px; }}
    .orchestra {{ display:flex; gap:30px; justify-content:center; flex-wrap:wrap; }}
    .instrument {{ text-align:center; animation: popIn 0.5s ease forwards; opacity:0; }}
    .inst-icon {{ font-size:70px; margin-bottom:10px; }}
    .inst-name {{ color:white; font-size:22px; font-weight:600; }}
    .inst-role {{ color:#94a3b8; font-size:18px; }}
    .conductor {{ margin-top:50px; text-align:center; }}
    .cond-icon {{ font-size:90px; animation: bounce 2s ease infinite; }}
    .cond-text {{ color:#f472b6; font-size:28px; font-weight:600; margin-top:10px; }}
    @keyframes popIn {{ to {{opacity:1; transform:scale(1)}} from {{opacity:0; transform:scale(0.5)}} }}
    @keyframes bounce {{ 0%,100%{{transform:translateY(0)}} 50%{{transform:translateY(-15px)}} }}
    </style></head><body><div class="bg">
    <div class="top-title">🎼 나만의 콘텐츠 마케팅 오케스트라</div>
    <div class="top-sub">5가지 악기 + 지휘자 + 자동 공연 시스템</div>
    <div class="orchestra">
        <div class="instrument" style="animation-delay:0.2s"><div class="inst-icon">🎻</div><div class="inst-name">소셜미디어</div><div class="inst-role">바이올린</div></div>
        <div class="instrument" style="animation-delay:0.4s"><div class="inst-icon">🎻</div><div class="inst-name">리퍼포징</div><div class="inst-role">첼로</div></div>
        <div class="instrument" style="animation-delay:0.6s"><div class="inst-icon">🎺</div><div class="inst-name">SEO 감사</div><div class="inst-role">트럼펫</div></div>
        <div class="instrument" style="animation-delay:0.8s"><div class="inst-icon">🥁</div><div class="inst-name">GA4 분석</div><div class="inst-role">드럼</div></div>
        <div class="instrument" style="animation-delay:1.0s"><div class="inst-icon">🎹</div><div class="inst-name">브랜드 보이스</div><div class="inst-role">피아노</div></div>
    </div>
    <div class="conductor"><div class="cond-icon">🧑‍🎼</div><div class="cond-text">오케스트레이터 (지휘자)</div></div>
    </div></body></html>""",

    "four_acts": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:#0f172a; display:flex; flex-direction:column; padding:60px 80px; }}
    .title {{ font-size:48px; font-weight:800; color:white; text-align:center; margin-bottom:50px; }}
    .acts {{ display:grid; grid-template-columns:1fr 1fr; gap:30px; flex:1; }}
    .act {{ border-radius:20px; padding:40px; position:relative; overflow:hidden; }}
    .act1 {{ background:linear-gradient(135deg, #1e3a5f, #2563eb); }}
    .act2 {{ background:linear-gradient(135deg, #3b1f6e, #7c3aed); }}
    .act3 {{ background:linear-gradient(135deg, #134e4a, #0d9488); }}
    .act4 {{ background:linear-gradient(135deg, #78350f, #f59e0b); }}
    .act-num {{ font-size:80px; font-weight:900; color:rgba(255,255,255,0.15); position:absolute; top:15px; right:25px; }}
    .act-title {{ font-size:36px; font-weight:700; color:white; margin-bottom:15px; }}
    .act-desc {{ font-size:22px; color:rgba(255,255,255,0.8); line-height:1.6; }}
    .act-time {{ margin-top:15px; font-size:20px; color:rgba(255,255,255,0.5); }}
    </style></head><body><div class="bg">
    <div class="title">📋 오늘의 4시간 로드맵</div>
    <div class="acts">
        <div class="act act1"><div class="act-num">1</div><div class="act-title">🎭 1막: 공연장 세팅</div><div class="act-desc">Claude Code란? · 요금제 · 설치 · 터미널 기초</div><div class="act-time">⏱ 약 1시간</div></div>
        <div class="act act2"><div class="act-num">2</div><div class="act-title">🎼 2막: 악보 읽는 법</div><div class="act-desc">CLAUDE.md · Plan Mode · 토큰 관리 · 이미지/PDF</div><div class="act-time">⏱ 약 1시간</div></div>
        <div class="act act3"><div class="act-num">3</div><div class="act-title">🎵 3막: 악기 연습</div><div class="act-desc">소셜미디어 · 리퍼포징 · SEO · GA4 · 브랜드 보이스</div><div class="act-time">⏱ 약 1시간 30분</div></div>
        <div class="act act4"><div class="act-num">4</div><div class="act-title">🎼 4막: 오케스트라 합주</div><div class="act-desc">멀티 에이전트 · 오케스트레이터 · Hooks · 실전 데모</div><div class="act-time">⏱ 약 1시간 30분</div></div>
    </div></div></body></html>""",

    "checklist": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:linear-gradient(135deg, #0f172a, #1e293b); display:flex; padding:80px; gap:60px; }}
    .col {{ flex:1; }}
    .col-title {{ font-size:36px; font-weight:700; margin-bottom:40px; padding-bottom:20px; border-bottom:3px solid rgba(255,255,255,0.1); }}
    .col-title.need {{ color:#22c55e; }}
    .col-title.nice {{ color:#60a5fa; }}
    .item {{ display:flex; align-items:center; gap:20px; padding:25px 30px; background:rgba(255,255,255,0.03); border-radius:14px; margin-bottom:20px; border:1px solid rgba(255,255,255,0.06); }}
    .check {{ font-size:36px; }}
    .item-text {{ color:white; font-size:28px; font-weight:500; }}
    .item-sub {{ color:#94a3b8; font-size:20px; margin-top:5px; }}
    .x-item .item-text {{ color:#94a3b8; text-decoration:line-through; }}
    </style></head><body><div class="bg">
    <div class="col"><div class="col-title need">✅ 필수 준비물</div>
        <div class="item"><div class="check">💻</div><div><div class="item-text">컴퓨터</div><div class="item-sub">맥 / 윈도우 상관없음</div></div></div>
        <div class="item"><div class="check">🔑</div><div><div class="item-text">Claude Pro 계정</div><div class="item-sub">claude.ai에서 가입</div></div></div>
        <div class="item"><div class="check">📝</div><div><div class="item-text">VS Code (무료)</div><div class="item-sub">28분에 같이 설치해요</div></div></div>
    </div>
    <div class="col"><div class="col-title nice">🚫 없어도 OK</div>
        <div class="item x-item"><div class="check">❌</div><div><div class="item-text">코딩 지식</div></div></div>
        <div class="item x-item"><div class="check">❌</div><div><div class="item-text">개발 경험</div></div></div>
        <div class="item x-item"><div class="check">❌</div><div><div class="item-text">영어 실력</div></div></div>
        <div class="item x-item"><div class="check">❌</div><div><div class="item-text">음악적 재능 🎵</div><div class="item-sub">오케스트라는 비유일 뿐!</div></div></div>
    </div></div></body></html>""",

    "bridge": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    {base}
    .bg {{ background:linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%); display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; }}
    .emoji {{ font-size:100px; margin-bottom:40px; animation: pulse 2s ease infinite; }}
    @keyframes pulse {{ 0%,100%{{transform:scale(1)}} 50%{{transform:scale(1.15)}} }}
    .main {{ font-size:64px; font-weight:800; color:white; margin-bottom:20px; }}
    .accent {{ color:#f472b6; }}
    .sub {{ font-size:34px; color:#94a3b8; margin-top:30px; }}
    .arrow {{ font-size:60px; color:#a78bfa; margin-top:50px; animation: moveRight 1.5s ease infinite; }}
    @keyframes moveRight {{ 0%,100%{{transform:translateX(0)}} 50%{{transform:translateX(20px)}} }}
    </style></head><body><div class="bg">
    <div class="emoji">🚀</div>
    <div class="main">준비 완료!<br><span class="accent">지금 바로 시작합니다</span></div>
    <div class="sub">다음: Claude Code가 도대체 뭔지 → 10분 설명</div>
    <div class="arrow">→</div>
    </div></body></html>"""
}

# ─────────────────────────────────────────────
#  파이프라인 실행
# ─────────────────────────────────────────────
async def generate_scene_video(pw_browser, scene, scene_dir):
    """하나의 씬에 대해: TTS 생성 → HTML 렌더 → Playwright 녹화"""
    sid = scene["id"]
    mp3_path = os.path.join(scene_dir, f"{sid}.mp3")
    html_path = os.path.join(scene_dir, f"{sid}.html")
    
    # 1) TTS 생성
    txt_path = os.path.join(scene_dir, f"{sid}.txt")
    with open(txt_path, 'w') as f: f.write(scene["narration"])
    subprocess.run([EDGE_TTS, "--voice", "ko-KR-SunHiNeural", "-f", txt_path,
                    "--write-media", mp3_path], check=True, stdout=subprocess.DEVNULL)
    os.remove(txt_path)
    
    # 2) 오디오 길이 측정 (ffprobe)
    dur_cmd = subprocess.run([FFMPEG.replace('ffmpeg','ffprobe') if 'ffprobe' in FFMPEG else FFMPEG,
                              "-v","quiet","-show_entries","format=duration",
                              "-of","json", mp3_path],
                             capture_output=True, text=True)
    # fallback duration estimation
    try:
        dur = float(json.loads(dur_cmd.stdout)["format"]["duration"])
    except:
        dur = len(scene["narration"]) / 5.0  # ~5 chars/sec for Korean
    dur_ms = int(dur * 1000) + 500  # + 0.5s buffer
    
    # 3) HTML 파일 생성
    particles = "".join([f'<div class="particle" style="left:{i*7}%;top:{(i*13)%100}%;animation-delay:{i*0.3}s;animation-duration:{4+i%3}s"></div>' for i in range(20)])
    template = HTML_TEMPLATES[scene["visual"]]
    html_content = template.format(base=get_base_style(), particles=particles)
    with open(html_path, 'w') as f: f.write(html_content)
    
    # 4) Playwright 녹화
    context = await pw_browser.new_context(
        viewport={'width': 1920, 'height': 1080},
        record_video_dir=scene_dir,
        record_video_size={'width': 1920, 'height': 1080}
    )
    page = await context.new_page()
    await page.goto(f"file://{os.path.abspath(html_path)}")
    await page.wait_for_timeout(dur_ms)
    video_path = await page.video.path()
    await context.close()
    
    webm_path = os.path.join(scene_dir, f"{sid}.webm")
    os.rename(video_path, webm_path)
    
    print(f"  ✅ {sid}: video={dur:.1f}s, audio={dur:.1f}s")
    return {"id": sid, "webm": webm_path, "mp3": mp3_path, "duration": dur}

async def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    
    print("🎬 Part 00 샘플 영상 제작 시작!")
    print(f"   총 {len(SCENES)}개 씬을 개별 녹화 후 합성합니다.\n")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        results = []
        
        for i, scene in enumerate(SCENES):
            print(f"[{i+1}/{len(SCENES)}] 씬 '{scene['id']}' 녹화 중...")
            r = await generate_scene_video(browser, scene, OUT_DIR)
            results.append(r)
        
        await browser.close()
    
    # 5) FFmpeg로 씬별 영상+오디오 합성 → 개별 mp4
    scene_mp4s = []
    for r in results:
        mp4_path = os.path.join(OUT_DIR, f"{r['id']}_final.mp4")
        subprocess.run([
            FFMPEG, "-y",
            "-i", r["webm"], "-i", r["mp3"],
            "-c:v", "libx264", "-preset", "ultrafast",
            "-c:a", "aac", "-b:a", "192k",
            "-shortest", "-pix_fmt", "yuv420p",
            mp4_path
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        scene_mp4s.append(mp4_path)
    
    # 6) 전체 씬 이어붙이기 (concat)
    concat_file = os.path.join(OUT_DIR, "concat.txt")
    with open(concat_file, 'w') as f:
        for mp4 in scene_mp4s:
            f.write(f"file '{os.path.abspath(mp4)}'\n")
    
    final_path = os.path.join(OUT_DIR, "part00_FINAL.mp4")
    subprocess.run([
        FFMPEG, "-y", "-f", "concat", "-safe", "0",
        "-i", concat_file,
        "-c:v", "libx264", "-preset", "fast",
        "-c:a", "aac",
        "-pix_fmt", "yuv420p",
        final_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    print(f"\n🏆 Part 00 최종 영상 완성!")
    print(f"   📁 {final_path}")
    total_dur = sum(r['duration'] for r in results)
    print(f"   ⏱ 총 길이: {int(total_dur//60)}분 {int(total_dur%60)}초")

if __name__ == "__main__":
    asyncio.run(main())
