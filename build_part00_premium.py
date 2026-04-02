import asyncio
import os
import re
import subprocess
import json
import imageio_ffmpeg
from playwright.async_api import async_playwright
from elevenlabs.client import ElevenLabs

# ElevenLabs 설정 
API_KEY = "sk_2e56dd1f5893dd5eb985bb50ea5d9b9ce6c8758b404e5fa0"
VOICE_ID = "jPmzMeQjhjbwvw4O8bgf" # 보스님이 지정하신 Voice ID
MODEL_ID = "eleven_multilingual_v2" 

client = ElevenLabs(api_key=API_KEY)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT_DIR = "production/premium"

# 샘플용 1개 씬 - 테스트
SCENES = [
    {
        "id": "premium_test_hook",
        "narration": "안녕하세요 보스님! 지금 보시는 이 목소리는 일레븐랩스의 인공지능 한국어 음성입니다. 어떠신가요? 기존 목소리보다 훨씬 자연스럽고 신뢰감이 가지 않나요?",
        "visual": "title_hook"
    }
]

def get_base_style():
    return "* { margin:0; padding:0; box-sizing:border-box; } body { width:1920px; height:1080px; overflow:hidden; font-family: sans-serif; background:#0f172a; }"

HTML_TEMPLATES = {
    "title_hook": """<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{{margin:0;display:flex;align-items:center;justify-content:center;height:1080px;color:white;background:#0f172a;}} .t{{font-size:100px;font-weight:bold;text-align:center;}} .s{{font-size:40px;color:#a78bfa;margin-top:20px;}}</style></head><body><div><div class="t">PREMIUM VOICE TEST</div><div class="s">ElevenLabs (Emma Korean Woman)</div></div></body></html>"""
}

async def generate_premium_audio(text, mp3_path):
    print(f"  🎙️ 일레븐랩스(Emma) 음성 생성 중...")
    audio_generator = client.text_to_speech.convert(
        voice_id=VOICE_ID,
        model_id=MODEL_ID,
        text=text
    )
    with open(mp3_path, "wb") as f:
        for chunk in audio_generator:
            f.write(chunk)

async def generate_scene_video(pw_browser, scene, scene_dir):
    sid = scene["id"]
    mp3_path = os.path.join(scene_dir, f"{sid}.mp3")
    html_path = os.path.join(scene_dir, f"{sid}.html")
    
    await generate_premium_audio(scene["narration"], mp3_path)
    
    dur_cmd = subprocess.run([FFMPEG.replace('ffmpeg','ffprobe') if 'ffprobe' in FFMPEG else FFMPEG,
                              "-v","quiet","-show_entries","format=duration","-of","json", mp3_path],
                             capture_output=True, text=True)
    try:
        dur = float(json.loads(dur_cmd.stdout)["format"]["duration"])
    except:
        dur = 10.0
    dur_ms = int(dur * 1000) + 500
    
    with open(html_path, 'w') as f:
        f.write(HTML_TEMPLATES[scene["visual"]])
    
    context = await pw_browser.new_context(viewport={'width': 1920, 'height': 1080}, record_video_dir=scene_dir)
    page = await context.new_page()
    await page.goto(f"file://{os.path.abspath(html_path)}")
    await page.wait_for_timeout(dur_ms)
    video_path = await page.video.path()
    await context.close()
    
    webm_path = os.path.join(scene_dir, f"{sid}.webm")
    os.rename(video_path, webm_path)
    return {"id": sid, "webm": webm_path, "mp3": mp3_path, "duration": dur}

async def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print("💎 ElevenLabs PREMIUM 엔진 시연 영상 제작 시작")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        results = []
        for scene in SCENES:
            r = await generate_scene_video(browser, scene, OUT_DIR)
            results.append(r)
        await browser.close()
    
    for r in results:
        mp4_path = os.path.join(OUT_DIR, f"{r['id']}_final.mp4")
        subprocess.run([FFMPEG, "-y", "-i", r["webm"], "-i", r["mp3"], "-c:v", "libx264", mp4_path],
                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"  ✨ 프리미엄 영상 완성! -> {mp4_path}")

if __name__ == "__main__":
    asyncio.run(main())
