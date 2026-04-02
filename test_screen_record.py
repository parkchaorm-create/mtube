#!/usr/bin/env python3
"""
가장 간단한 화면 녹화 테스트
- macOS screencapture 명령어로 5초 녹화
- 별도 설치 없음
"""

import subprocess
import time
import os

output_file = "production/video/test_recording.mov"
os.makedirs("production/video", exist_ok=True)

print("📹 3초 후 화면 녹화 시작 (5초간)...")
print("   아무 화면이나 움직여보세요!")
time.sleep(3)

print("🔴 녹화 중...")

# screencapture -v: 비디오 녹화, -V 5: 5초
proc = subprocess.Popen(
    ["screencapture", "-v", output_file],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL
)

time.sleep(5)
proc.terminate()
proc.wait()

if os.path.exists(output_file):
    size = os.path.getsize(output_file)
    print(f"✅ 완료: {output_file} ({size:,} bytes)")
    print(f"   재생: open {output_file}")
else:
    print("❌ 파일 생성 실패")
    print("   시스템 설정 → 개인정보 보호 → 화면 녹화 → 터미널 허용 필요")
