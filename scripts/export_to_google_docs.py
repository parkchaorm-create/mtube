import os
import re
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaInMemoryUpload

# 구글 API 권한 범위 (드라이브 및 문서 생성 권한)
SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/documents']

def get_credentials():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds

def collect_scripts():
    script_dir = 'scripts'
    files = [f for f in os.listdir(script_dir) if f.startswith('part') and f.endswith('.md')]
    # 파일명 숫자에 따라 정렬 (part00, part01...)
    files.sort(key=lambda x: int(re.findall(r'\d+', x)[0]) if re.findall(r'\d+', x) else 0)
    
    combined_content = "# 파자마보스 풀코스 스크립트 (전체)\n# 왕초보도 4시간이면 AI 마케팅 팀 만든다 | 클로드 코드 완전 정복\n\n"
    for filename in files:
        path = os.path.join(script_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            title = filename.replace('.md', '').replace('-', ' ').title()
            combined_content += f"\n\n--- \n## {title} \n---\n\n"
            combined_content += content
            
    return combined_content

def upload_to_google_doc(content):
    creds = get_credentials()
    drive_service = build('drive', 'v3', credentials=creds)

    # HTML로 변환 (Python 3.12 미만 호환을 위해 f-string 밖에서 처리)
    body_content = content.replace('# ', '<h1>').replace('\n', '<br>')
    html_content = f"<html><body>{body_content}</body></html>"
    
    file_metadata = {
        'name': '파자마보스 풀코스 스크립트 (전체) - 2026.04.03',
        'mimeType': 'application/vnd.google-apps.document'
    }
    
    media = MediaInMemoryUpload(html_content.encode('utf-8'), mimetype='text/html')
    
    file = drive_service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id, webViewLink'
    ).execute()
    
    print(f"File ID: {file.get('id')}")
    print(f"Success! View your Google Doc here: {file.get('webViewLink')}")

if __name__ == '__main__':
    if not os.path.exists('credentials.json'):
        print("Error: 'credentials.json' 파일을 찾을 수 없습니다. 1단계를 먼저 완료해 주세요.")
    else:
        print("Collecting script files...")
        full_script = collect_scripts()
        print("Uploading to Google Docs...")
        upload_to_google_doc(full_script)
