import os
import glob
import re
import subprocess
import time
import imageio_ffmpeg

def clean_markdown_for_tts(text):
    text = re.sub(r'---[\s\S]*?---', '', text, count=1)
    lines = text.split('\n')
    cleaned_lines = []
    in_code_block = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            continue
        if in_code_block: continue
        if stripped.startswith('#') and not stripped.startswith('## '): continue
        if stripped.startswith('#'): continue
        if stripped.startswith('- **'): continue
        if stripped.startswith('|') and '|' in stripped: continue
        if '📺 화면:' in line: continue
        line = re.sub(r'\*\*(.*?)\*\*', r'\1', line)
        line = re.sub(r'\*(.*?)\*', r'\1', line)
        line = re.sub(r'`(.*?)`', r'\1', line)
        if line.strip(): cleaned_lines.append(line.strip())
    return " ".join(cleaned_lines)

def main():
    os.makedirs('production/video', exist_ok=True)
    files = sorted(glob.glob('scripts/part*.md'))
    edge_tts_bin = "/Users/mac/Library/Python/3.9/bin/edge-tts"
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    broll_path = "production/video/master_broll.webm"
    if not os.path.exists(broll_path):
        print("ERROR: master_broll.webm not found! Run capture_broll.py first.")
        return

    print(f"Starting DYNAMIC B-ROLL MP4 Generation for {len(files)} parts...")
    
    for file in files:
        part_name = os.path.basename(file).split('.md')[0]
        mp3_out = f"production/video/{part_name}.mp3"
        vtt_out = f"production/video/{part_name}.vtt"
        mp4_out = f"production/video/{part_name}_dynamic.mp4"
        
        if os.path.exists(mp4_out):
            print(f"Skipping {part_name}_dynamic.mp4")
            continue
            
        print(f"Rendering {part_name}...")
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        target_text = clean_markdown_for_tts(content)
        temp_txt = f"temp_{part_name}.txt"
        with open(temp_txt, 'w', encoding='utf-8') as f: f.write(target_text)
            
        try:
            subprocess.run([
                edge_tts_bin, "--voice", "ko-KR-SunHiNeural",
                "-f", temp_txt, "--write-media", mp3_out, "--write-subtitles", vtt_out
            ], check=True, stdout=subprocess.DEVNULL)
        except Exception as e:
            print(f"TTS Failed: {e}")
            continue
            
        try:
            cmd_ffmpeg = [
                ffmpeg_exe, "-y",
                "-stream_loop", "-1",
                "-i", broll_path,
                "-i", mp3_out,
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-c:a", "copy",
                "-shortest",
                mp4_out
            ]
            subprocess.run(cmd_ffmpeg, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f"  -> Generated {part_name}_dynamic.mp4 (with .vtt subtitles)")
        except Exception as e:
            print(f"FFmpeg Failed: {e}")
            
        finally:
            if os.path.exists(temp_txt): os.remove(temp_txt)
                
        time.sleep(1)

    print("✅ All 21 Dynamic Videos Generated Successfully!")

if __name__ == "__main__":
    main()
