"""결과물 목업 5종을 HTML로 생성 → Playwright 스크린샷"""
import os
from playwright.sync_api import sync_playwright

OUTDIR = "/Users/mac/Documents/dev/mtube/output/mockups"
os.makedirs(OUTDIR, exist_ok=True)

# ── 1. 블로그 포스트 ──
BLOG_HTML = """<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#111; font-family:-apple-system,'Pretendard',sans-serif; color:#fff; }
.browser { width:1920px; height:1080px; background:#1a1a1a; }
.toolbar { height:44px; background:#2a2a2a; display:flex; align-items:center; padding:0 16px; gap:8px; }
.dot { width:12px; height:12px; border-radius:50%; }
.dot.r { background:#E53E3E; } .dot.y { background:#ECC94B; } .dot.g { background:#48BB78; }
.url-bar { flex:1; margin:0 120px 0 12px; background:#1a1a1a; border-radius:6px; padding:8px 16px; font-size:13px; color:#999; }
.content { max-width:800px; margin:0 auto; padding:60px 40px; }
.breadcrumb { font-size:13px; color:#E53E3E; margin-bottom:24px; letter-spacing:0.5px; }
h1 { font-size:42px; font-weight:800; line-height:1.3; margin-bottom:16px; letter-spacing:-0.02em; }
h1 span { color:#E53E3E; }
.meta { font-size:14px; color:#666; margin-bottom:40px; display:flex; gap:20px; }
.hero-img { width:100%; height:300px; background:linear-gradient(135deg,#1a1a2e,#16213e); border-radius:12px; margin-bottom:40px; display:flex; align-items:center; justify-content:center; }
.hero-img span { font-size:80px; }
.body-text { font-size:18px; line-height:1.9; color:#ccc; margin-bottom:24px; }
.body-text strong { color:#fff; }
.highlight { background:#E53E3E22; border-left:3px solid #E53E3E; padding:16px 24px; border-radius:0 8px 8px 0; margin:32px 0; font-size:17px; color:#eee; }
ul { padding-left:24px; margin:24px 0; }
li { font-size:17px; color:#bbb; line-height:2; }
li::marker { color:#E53E3E; }
.cta-btn { display:inline-block; background:#E53E3E; color:#fff; padding:16px 40px; border-radius:8px; font-size:18px; font-weight:700; margin-top:32px; text-decoration:none; }
</style></head><body>
<div class="browser">
<div class="toolbar">
  <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
  <div class="url-bar">pajamaboss.com/blog/ai-marketing-strategy</div>
</div>
<div class="content">
  <div class="breadcrumb">블로그 &gt; AI 마케팅</div>
  <h1>AI로 <span>매출 200%</span> 올리는<br>콘텐츠 마케팅 5가지 전략</h1>
  <div class="meta"><span>파자마보스 · 2026.03.28</span><span>읽는 시간 8분</span><span>조회 2,847</span></div>
  <div class="hero-img"><span>🚀</span></div>
  <p class="body-text">"마케팅 직원 한 명 뽑을 여유가 없는데, 콘텐츠는 매일 올려야 하고..."</p>
  <p class="body-text">이런 고민, <strong>1인 기업</strong>이라면 누구나 해보셨을 겁니다. 저도 똑같은 상황이었거든요. 그런데 AI를 도입하고 나서 <strong>매주 15시간</strong>이 걸리던 콘텐츠 제작이 <strong>10분</strong>으로 줄었습니다.</p>
  <div class="highlight">핵심: AI는 "대신 써주는 도구"가 아니라, "내 브랜드의 마케팅 팀"을 만드는 시스템입니다.</div>
  <ul>
    <li><strong>전략 1:</strong> 브랜드 보이스를 AI에게 학습시켜라</li>
    <li><strong>전략 2:</strong> 하나의 콘텐츠를 7채널로 리퍼포징하라</li>
    <li><strong>전략 3:</strong> SEO와 GEO를 동시에 최적화하라</li>
    <li><strong>전략 4:</strong> 아웃라이어 스코어로 트렌드를 선점하라</li>
    <li><strong>전략 5:</strong> 자동 퀄리티 게이트로 품질을 보장하라</li>
  </ul>
  <a class="cta-btn" href="#">전체 가이드 무료 다운로드 →</a>
</div>
</div>
</body></html>"""

# ── 2. 뉴스레터 ──
NEWSLETTER_HTML = """<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0A0A0A; font-family:-apple-system,'Pretendard',sans-serif; color:#fff; display:flex; justify-content:center; padding:40px; width:1920px; height:1080px; }
.email { width:640px; background:#111; border-radius:12px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.5); }
.header { padding:32px; text-align:center; border-bottom:1px solid #222; }
.logo { font-size:24px; font-weight:800; color:#fff; letter-spacing:2px; }
.logo span { color:#E53E3E; }
.date { font-size:12px; color:#666; margin-top:8px; }
.hero { padding:40px 32px; text-align:center; }
.hero h1 { font-size:28px; font-weight:800; line-height:1.4; margin-bottom:12px; }
.hero p { font-size:15px; color:#999; }
.section { padding:24px 32px; border-top:1px solid #1a1a1a; }
.section-title { font-size:13px; color:#E53E3E; font-weight:700; letter-spacing:1px; margin-bottom:16px; text-transform:uppercase; }
.item { display:flex; gap:16px; margin-bottom:20px; }
.item-num { width:32px; height:32px; background:#E53E3E; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px; flex-shrink:0; }
.item-text h3 { font-size:16px; font-weight:700; margin-bottom:4px; }
.item-text p { font-size:13px; color:#888; line-height:1.5; }
.footer { padding:24px 32px; text-align:center; border-top:1px solid #1a1a1a; }
.footer p { font-size:12px; color:#555; }
.cta { display:inline-block; background:#E53E3E; color:#fff; padding:12px 32px; border-radius:6px; font-size:14px; font-weight:700; margin:16px 0; text-decoration:none; }
</style></head><body>
<div class="email">
  <div class="header"><div class="logo">PAJAMA<span>BOSS</span></div><div class="date">2026년 3월 28일 · 제47호</div></div>
  <div class="hero"><h1>이번 주 AI 마케팅 인사이트 🚀</h1><p>매주 월요일, 실전 AI 마케팅 전략을 보내드립니다</p></div>
  <div class="section">
    <div class="section-title">📌 이번 주 TOP 3</div>
    <div class="item"><div class="item-num">1</div><div class="item-text"><h3>Claude Code로 브랜드 보이스 10분 만에 구축하기</h3><p>AI에게 "내 말투"를 학습시키는 구체적인 5단계 프로세스를 공유합니다.</p></div></div>
    <div class="item"><div class="item-num">2</div><div class="item-text"><h3>네이버 SEO + AI 검색 최적화 동시 공략법</h3><p>GEO(Generative Engine Optimization)가 왜 중요한지, 지금 당장 적용하는 방법.</p></div></div>
    <div class="item"><div class="item-num">3</div><div class="item-text"><h3>인스타 카드뉴스 5장을 3분 만에 자동 생성</h3><p>URL 하나로 카드뉴스 디자인까지 완성하는 실전 워크플로우.</p></div></div>
  </div>
  <div class="footer"><a class="cta" href="#">전체 아티클 읽기 →</a><p>파자마보스 뉴스레터 · 구독 해지</p></div>
</div>
</body></html>"""

# ── 3. 카드뉴스 ──
CARDNEWS_HTML = """<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0A0A0A; width:1920px; height:1080px; display:flex; align-items:center; justify-content:center; gap:24px; font-family:-apple-system,'Pretendard',sans-serif; }
.card { width:280px; height:500px; background:#111; border-radius:16px; padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid #222; transition:transform 0.3s; position:relative; overflow:hidden; }
.card:nth-child(1) { transform:rotate(-6deg) translateY(20px); }
.card:nth-child(2) { transform:rotate(-3deg) translateY(5px); }
.card:nth-child(3) { transform:rotate(0deg) translateY(0); z-index:2; border-color:#E53E3E44; box-shadow:0 0 40px rgba(229,62,62,0.15); }
.card:nth-child(4) { transform:rotate(3deg) translateY(5px); }
.card:nth-child(5) { transform:rotate(6deg) translateY(20px); }
.card-num { font-size:64px; font-weight:900; color:#E53E3E; opacity:0.3; position:absolute; top:16px; right:20px; }
.card-icon { font-size:48px; margin-bottom:16px; }
.card h2 { font-size:22px; font-weight:800; color:#fff; line-height:1.4; margin-bottom:12px; letter-spacing:-0.02em; }
.card p { font-size:13px; color:#888; line-height:1.6; }
.card-footer { display:flex; align-items:center; gap:8px; }
.card-footer .dot { width:8px; height:8px; background:#333; border-radius:50%; }
.card-footer .dot.active { background:#E53E3E; }
.card-tag { font-size:11px; color:#E53E3E; font-weight:700; letter-spacing:1px; }
</style></head><body>
<div class="card"><span class="card-num">1</span><div><div class="card-tag">STEP 01</div><div class="card-icon">🎯</div><h2>브랜드 보이스<br>설정하기</h2><p>AI에게 "내 말투"를 학습시키는 첫 번째 단계입니다.</p></div><div class="card-footer"><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
<div class="card"><span class="card-num">2</span><div><div class="card-tag">STEP 02</div><div class="card-icon">✍️</div><h2>콘텐츠<br>자동 생성</h2><p>URL 하나로 블로그, SNS, 뉴스레터가 동시에 나옵니다.</p></div><div class="card-footer"><div class="dot"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
<div class="card"><span class="card-num">3</span><div><div class="card-tag">STEP 03</div><div class="card-icon">🔍</div><h2>SEO/GEO<br>최적화</h2><p>구글과 AI 검색 엔진에서 동시에 상위 노출됩니다.</p></div><div class="card-footer"><div class="dot"></div><div class="dot"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div></div>
<div class="card"><span class="card-num">4</span><div><div class="card-tag">STEP 04</div><div class="card-icon">📊</div><h2>데이터<br>분석 자동화</h2><p>GA4 데이터를 AI가 분석하고 인사이트를 뽑아줍니다.</p></div><div class="card-footer"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot active"></div><div class="dot"></div></div></div>
<div class="card"><span class="card-num">5</span><div><div class="card-tag">STEP 05</div><div class="card-icon">🚀</div><h2>무인 배포<br>자동화</h2><p>만들어진 콘텐츠가 9개 채널에 자동으로 배포됩니다.</p></div><div class="card-footer"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot active"></div></div></div>
</body></html>"""

# ── 4. 유튜브 썸네일 ──
THUMBNAIL_HTML = """<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0A0A0A; width:1920px; height:1080px; display:flex; align-items:center; justify-content:center; font-family:-apple-system,'Pretendard',sans-serif; }
.thumb { width:1280px; height:720px; background:linear-gradient(135deg,#0A0A0A 0%,#1a0a0a 50%,#0A0A0A 100%); border-radius:16px; position:relative; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.8); display:flex; }
.left { flex:1; padding:60px; display:flex; flex-direction:column; justify-content:center; z-index:2; }
.badge { display:inline-block; background:#E53E3E; color:#fff; padding:8px 20px; border-radius:20px; font-size:16px; font-weight:800; margin-bottom:24px; width:fit-content; }
.title { font-size:64px; font-weight:900; color:#fff; line-height:1.2; letter-spacing:-0.03em; text-shadow:0 0 60px rgba(229,62,62,0.3); }
.title span { color:#E53E3E; display:block; }
.sub { font-size:24px; color:#999; margin-top:24px; }
.right { width:400px; display:flex; align-items:flex-end; justify-content:center; }
.char-placeholder { width:300px; height:500px; background:radial-gradient(ellipse at center bottom, rgba(229,62,62,0.15) 0%, transparent 70%); display:flex; align-items:center; justify-content:center; font-size:200px; }
.grid-bg { position:absolute; inset:0; background-image:linear-gradient(rgba(229,62,62,0.03) 1px, transparent 1px),linear-gradient(90deg,rgba(229,62,62,0.03) 1px, transparent 1px); background-size:60px 60px; }
.glow { position:absolute; top:50%; left:30%; width:400px; height:400px; background:radial-gradient(circle,rgba(229,62,62,0.15) 0%,transparent 70%); transform:translate(-50%,-50%); }
</style></head><body>
<div class="thumb">
  <div class="grid-bg"></div>
  <div class="glow"></div>
  <div class="left">
    <div class="badge">풀코스 6시간</div>
    <div class="title">왕초보도<span>AI 마케팅 팀</span>만든다</div>
    <div class="sub">클로드 코드 완전 정복 · 코딩 없이 자동화</div>
  </div>
  <div class="right"><div class="char-placeholder">👩‍💼</div></div>
</div>
</body></html>"""

# ── 5. 쇼츠 3개 ──
SHORTS_HTML = """<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0A0A0A; width:1920px; height:1080px; display:flex; align-items:center; justify-content:center; gap:40px; font-family:-apple-system,'Pretendard',sans-serif; }
.phone { width:340px; height:700px; background:#111; border-radius:40px; padding:12px; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.6); border:2px solid #222; }
.screen { width:100%; height:100%; background:#0A0A0A; border-radius:30px; overflow:hidden; position:relative; display:flex; flex-direction:column; }
.notch { width:120px; height:28px; background:#111; border-radius:0 0 16px 16px; position:absolute; top:0; left:50%; transform:translateX(-50%); z-index:5; }
.video-bg { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:40px 24px; position:relative; }
.shorts-icon { position:absolute; top:44px; right:16px; font-size:20px; color:#fff; }
.vid-title { font-size:28px; font-weight:900; color:#fff; text-align:center; line-height:1.3; margin-bottom:16px; letter-spacing:-0.02em; }
.vid-title span { color:#E53E3E; }
.vid-emoji { font-size:72px; margin-bottom:24px; }
.caption-bar { background:rgba(0,0,0,0.8); padding:16px 20px; }
.caption { font-size:14px; color:#fff; line-height:1.5; }
.caption span { background:#E53E3E; padding:2px 6px; border-radius:4px; }
.sidebar { position:absolute; right:12px; bottom:80px; display:flex; flex-direction:column; gap:20px; align-items:center; }
.sidebar-btn { width:36px; height:36px; background:rgba(255,255,255,0.15); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; }
.sidebar-count { font-size:10px; color:#ccc; text-align:center; margin-top:2px; }
.phone:nth-child(2) .video-bg { background:linear-gradient(180deg,#0a0a1a 0%,#0A0A0A 100%); }
.phone:nth-child(3) .video-bg { background:linear-gradient(180deg,#1a0a0a 0%,#0A0A0A 100%); }
</style></head><body>
<div class="phone"><div class="screen"><div class="notch"></div><div class="video-bg"><div class="shorts-icon">▶ Shorts</div><div class="vid-emoji">⚡</div><div class="vid-title"><span>60초</span> SEO<br>꿀팁 3가지</div></div><div class="caption-bar"><div class="caption">구글 검색 1등 만드는 방법, <span>60초</span>면 됩니다</div></div><div class="sidebar"><div><div class="sidebar-btn">❤️</div><div class="sidebar-count">2.4K</div></div><div><div class="sidebar-btn">💬</div><div class="sidebar-count">89</div></div><div><div class="sidebar-btn">↗️</div><div class="sidebar-count">공유</div></div></div></div></div>
<div class="phone"><div class="screen"><div class="notch"></div><div class="video-bg"><div class="shorts-icon">▶ Shorts</div><div class="vid-emoji">🎨</div><div class="vid-title">카드뉴스<br><span>3분</span> 자동 생성</div></div><div class="caption-bar"><div class="caption">URL 하나로 인스타 카드뉴스 <span>5장</span>이 뚝딱</div></div><div class="sidebar"><div><div class="sidebar-btn">❤️</div><div class="sidebar-count">1.8K</div></div><div><div class="sidebar-btn">💬</div><div class="sidebar-count">56</div></div><div><div class="sidebar-btn">↗️</div><div class="sidebar-count">공유</div></div></div></div></div>
<div class="phone"><div class="screen"><div class="notch"></div><div class="video-bg"><div class="shorts-icon">▶ Shorts</div><div class="vid-emoji">🎤</div><div class="vid-title">브랜드 보이스<br><span>10분</span> 설정</div></div><div class="caption-bar"><div class="caption">AI한테 <span>내 말투</span>를 학습시키는 방법</div></div><div class="sidebar"><div><div class="sidebar-btn">❤️</div><div class="sidebar-count">3.1K</div></div><div><div class="sidebar-btn">💬</div><div class="sidebar-count">124</div></div><div><div class="sidebar-btn">↗️</div><div class="sidebar-count">공유</div></div></div></div></div>
</body></html>"""

htmls = {
    "mockup_01_blog": BLOG_HTML,
    "mockup_02_newsletter": NEWSLETTER_HTML,
    "mockup_03_cardnews": CARDNEWS_HTML,
    "mockup_04_thumbnail": THUMBNAIL_HTML,
    "mockup_05_shorts": SHORTS_HTML,
}

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, html in htmls.items():
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.set_content(html, wait_until="networkidle")
        page.screenshot(path=f"{OUTDIR}/{name}.png", full_page=False)
        print(f"{name}: OK")
        page.close()
    browser.close()

print("All 5 mockups generated!")
