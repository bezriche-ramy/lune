from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
import yt_dlp
import re
import os
import tempfile
import shutil
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)

def format_duration(seconds):
    """Format seconds to HH:MM:SS format"""
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    
    if hours > 0:
        return f"{hours}:{minutes:02d}:{seconds:02d}"
    else:
        return f"{minutes}:{seconds:02d}"

def sanitize_filename(filename):
    """Remove invalid characters from filename"""
    return re.sub(r'[\\/*?:"<>|]', "", filename)

@app.route('/video-info', methods=['GET'])
def get_video_info():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'URL parameter is required'}), 400
    
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Format duration as mm:ss
            duration_seconds = info.get('duration')
            minutes, seconds = divmod(duration_seconds, 60)
            hours, minutes = divmod(minutes, 60)
            
            if hours > 0:
                duration_str = f"{hours}:{minutes:02d}:{seconds:02d}"
            else:
                duration_str = f"{minutes}:{seconds:02d}"
            
            return jsonify({
                'id': info.get('id'),
                'title': info.get('title'),
                'uploader': info.get('uploader'),
                'thumbnail': info.get('thumbnail'),
                'duration': duration_str,
                'description': info.get('description')
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    format_type = request.args.get('format', 'mp4')
    
    if not url:
        return jsonify({'error': 'URL parameter is required'}), 400
    
    try:
        with yt_dlp.YoutubeDL({}) as ydl:
            info = ydl.extract_info(url, download=False)
            title = sanitize_filename(info.get('title', 'video'))
        
        temp_dir = tempfile.mkdtemp()
        
        if format_type == 'mp3':
            filename = f"{title}.mp3"
            filepath = os.path.join(temp_dir, filename)
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
            }
        else:  # mp4
            filename = f"{title}.mp4"
            filepath = os.path.join(temp_dir, filename)
            ydl_opts = {
                'format': 'best[ext=mp4]/bestvideo[ext=mp4]+bestaudio/best',
                'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
            }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            
            # Find the downloaded file
            for file in os.listdir(temp_dir):
                if file.endswith('.mp3') if format_type == 'mp3' else file.endswith('.mp4'):
                    filepath = os.path.join(temp_dir, file)
                    break
            
            return send_file(
                filepath,
                as_attachment=True,
                download_name=filename,
                mimetype='audio/mp3' if format_type == 'mp3' else 'video/mp4'
            )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
