import asyncio
from playwright.async_api import async_playwright
import os

async def record_broll():
    os.makedirs('production/video', exist_ok=True)
    html_path = f"file://{os.path.abspath('dynamic_broll.html')}"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            record_video_dir="production/video/",
            record_video_size={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        print("🔗 Loading dynamic HTML terminal and recording (20 seconds)...")
        await page.goto(html_path)
        
        # 20초간 화면 애니메이션 녹화
        await page.wait_for_timeout(20000)
        
        video_path = await page.video.path()
        await context.close()
        await browser.close()
        
        # 고정된 이름으로 변경
        final_path = "production/video/master_broll.webm"
        if os.path.exists(final_path): os.remove(final_path)
        os.rename(video_path, final_path)
        print(f"✅ Dynamic B-roll recorded successfully: {final_path}")

if __name__ == "__main__":
    asyncio.run(record_broll())
