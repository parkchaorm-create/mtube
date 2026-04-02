import os
import glob
import re
import subprocess
import time

def clean_markdown_for_tts(text):
    text = re.sub(r'---[\s\S]*?---', '', text, count=1) # Remove frontmatter if at start
    
    lines = text.split('\n')
    cleaned_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            continue
            
        if in_code_block:
            continue
            
        # Skip headers
        if stripped.startswith('#'): continue
        
        # Skip metadata lists
        if stripped.startswith('- **'): continue
        
        # Skip tables
        if stripped.startswith('|') and '|' in stripped: continue
        
        # Skip screen instructions
        if '📺 화면:' in line: continue
        
        # Replace bold/italic styling
        line = re.sub(r'\*\*(.*?)\*\*', r'\1', line)
        line = re.sub(r'\*(.*?)\*', r'\1', line)
        
        # Replace inline code
        line = re.sub(r'`(.*?)`', r'\1', line)
        
        if line.strip():
            cleaned_lines.append(line.strip())
            
    return " ".join(cleaned_lines)

def main():
    os.makedirs('production/audio', exist_ok=True)
    files = sorted(glob.glob('scripts/part*.md'))
    
    edge_tts_bin = "/Users/mac/Library/Python/3.9/bin/edge-tts"
    
    print(f"Found {len(files)} script parts. Generating audio...")
    
    for file in files:
        part_name = os.path.basename(file).split('.md')[0]
        out_file = f"production/audio/{part_name}.mp3"
        
        print(f"Processing {part_name}...")
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        clean_text = clean_markdown_for_tts(content)
        
        temp_txt = f"temp_{part_name}.txt"
        with open(temp_txt, 'w', encoding='utf-8') as f:
            f.write(clean_text)
            
        try:
            cmd = [
                edge_tts_bin,
                "--voice", "ko-KR-SunHiNeural",
                "-f", temp_txt,
                "--write-media", out_file
            ]
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)
            print(f"  -> Generated {out_file} ({len(clean_text)} chars)")
        except Exception as e:
            print(f"  -> Failed: {e}")
        finally:
            if os.path.exists(temp_txt):
                os.remove(temp_txt)
                
        time.sleep(1) # Simple throttling

    print("✅ All audio generated successfully in production/audio/ !")

if __name__ == "__main__":
    main()
