#!/usr/bin/env python3
"""
Part 03 설치 파트 자동화 데모
스크립트 내용에 맞춰 브라우저가 자동으로 움직이며 화면 녹화
"""

import asyncio
import os
import subprocess
from playwright.async_api import async_playwright

OUTPUT_VIDEO = "production/video/part03-demo.webm"
OUTPUT_MP4   = "production/video/part03-demo.mp4"

os.makedirs("production/video", exist_ok=True)
os.makedirs("production/audio", exist_ok=True)

# 스크립트에서 TTS용 나레이션 텍스트
NARRATION = """보스님들, 이 파트가 많은 분들이 가장 겁내는 부분이에요.
설치? 나 그런 거 해본 적 없는데.
근데 제가 보장합니다. 딱 세 가지 장비만 설치하면 돼요.
첫 번째, 무대인 VS Code 입니다. code.visualstudio.com에 접속하시면 큰 파란 버튼으로 Download가 보이죠?
두 번째, 전기 배선인 Node.js 입니다. nodejs.org 접속하시면 LTS 버전 버튼이 보일 거예요.
세 번째, 음향 장비인 Claude Code입니다. 터미널에서 npm install -g @anthropic-ai/claude-code 한 줄만 입력하면 됩니다.
이 순서 그대로만 따라하시면, 여러분 컴퓨터에 AI 마케팅 공연장이 완성됩니다."""


async def run_demo():
    print("🎬 Part 03 데모 녹화 시작...")

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,  # 화면에 브라우저가 실제로 보임
            args=["--start-maximized"]
        )
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir="production/video/",
            record_video_size={"width": 1280, "height": 720},
        )
        page = await context.new_page()

        # ── 장면 1: VS Code 사이트 ──────────────────────────────
        print("  📺 장면 1: VS Code 다운로드 페이지")
        await page.goto("https://code.visualstudio.com", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)

        # 다운로드 버튼 찾아서 클로즈업 + 클릭
        try:
            btn = page.locator("a.btn.btn-download").first
            await btn.scroll_into_view_if_needed()
            # 마우스 천천히 이동 (클로즈업 효과)
            box = await btn.bounding_box()
            if box:
                await page.mouse.move(box["x"] + box["width"]/2, box["y"] + box["height"]/2, steps=30)
            await page.wait_for_timeout(1500)
            await btn.hover()
            await page.wait_for_timeout(1500)
            # 클릭 (다운로드 시작 안 되도록 JS로만)
            await page.evaluate("btn => btn.style.outline = '4px solid #FFD700'",
                                await btn.element_handle())
            await page.wait_for_timeout(2000)
        except Exception:
            await page.wait_for_timeout(3000)

        # ── 장면 2: Node.js 사이트 ─────────────────────────────
        print("  📺 장면 2: Node.js 다운로드 페이지")
        await page.goto("https://nodejs.org", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)

        try:
            lts = page.locator(".home-downloadbutton").first
            await lts.scroll_into_view_if_needed()
            box = await lts.bounding_box()
            if box:
                await page.mouse.move(box["x"] + box["width"]/2, box["y"] + box["height"]/2, steps=30)
            await page.wait_for_timeout(1500)
            await lts.hover()
            await page.evaluate("btn => btn.style.outline = '4px solid #FFD700'",
                                await lts.element_handle())
            await page.wait_for_timeout(2000)
        except Exception:
            await page.wait_for_timeout(3000)

        # ── 장면 3: Claude Code npm 명령어 (로컬 HTML) ──────────
        print("  📺 장면 3: Claude Code 설치 명령어")
        html = """
        <html><body style="background:#0f0f1a;color:#fff;font-family:monospace;
          display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center">
            <div style="color:#FFD700;font-size:2em;margin-bottom:30px">
              🎤 장비 3: Claude Code (음향 장비)
            </div>
            <div style="background:#1e1e2e;padding:30px 50px;border-radius:12px;
              border:2px solid #FF6B00;font-size:1.6em;letter-spacing:2px">
              npm install -g @anthropic-ai/claude-code
            </div>
            <div style="color:#aaa;margin-top:20px;font-size:1em">
              터미널에 이 한 줄만 복붙하세요!
            </div>
          </div>
        </body></html>"""
        await page.set_content(html)
        await page.wait_for_timeout(4000)

        # ── 종료 ────────────────────────────────────────────────
        video_path = await page.video.path()
        await context.close()
        await browser.close()

        # webm → 저장된 경로 확인
        if os.path.exists(video_path):
            os.rename(video_path, OUTPUT_VIDEO)
            size = os.path.getsize(OUTPUT_VIDEO)
            print(f"  ✅ 영상 저장: {OUTPUT_VIDEO} ({size:,} bytes)")
        else:
            print(f"  ❌ 영상 파일 없음: {video_path}")
            return

    # ── TTS 음성 생성 ────────────────────────────────────────────
    print("\n🎙️  나레이션 음성 생성 중...")
    with open("/tmp/part03_narration.txt", "w") as f:
        f.write(NARRATION)

    tts_cmd = [
        "/Users/mac/Library/Python/3.9/bin/edge-tts",
        "--voice", "ko-KR-SunHiNeural",
        "-f", "/tmp/part03_narration.txt",
        "--write-media", "production/audio/part03-demo.mp3",
    ]
    result = subprocess.run(tts_cmd, capture_output=True)
    if result.returncode != 0:
        print("  ❌ TTS 실패:", result.stderr.decode())
        return
    print("  ✅ 음성 저장: production/audio/part03-demo.mp3")

    # ── FFmpeg: webm + mp3 → mp4 ─────────────────────────────────
    print("\n🎞️  영상 + 음성 합치는 중...")
    ffmpeg_path = "/usr/local/bin/ffmpeg"
    if not os.path.exists(ffmpeg_path):
        # ffmpeg 없으면 webm만 열기
        print("  ⚠️  ffmpeg 없음 → 영상만 재생합니다")
        subprocess.run(["open", OUTPUT_VIDEO])
        return

    merge_cmd = [
        ffmpeg_path, "-y",
        "-stream_loop", "-1", "-i", OUTPUT_VIDEO,
        "-i", "production/audio/part03-demo.mp3",
        "-c:v", "libx264", "-preset", "ultrafast",
        "-c:a", "aac", "-shortest",
        OUTPUT_MP4,
    ]
    result = subprocess.run(merge_cmd, capture_output=True)
    if result.returncode == 0:
        size = os.path.getsize(OUTPUT_MP4)
        print(f"  ✅ 최종 영상: {OUTPUT_MP4} ({size:,} bytes)")
        subprocess.run(["open", OUTPUT_MP4])
    else:
        print("  ⚠️  합성 실패 → 영상만 재생")
        subprocess.run(["open", OUTPUT_VIDEO])


if __name__ == "__main__":
    asyncio.run(run_demo())
