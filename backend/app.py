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

@app.route('/api/info', methods=['GET'])
def get_video_info():
    try:
        url = request.args.get('url')
        if not url:
            return jsonify({"error": "URL is required"}), 400
        
        url = unquote(url)
        
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Format video info similar to the Node.js backend
            video_info = {
                'videoId': info.get('id'),
                'title': info.get('title'),
                'channel': info.get('uploader'),
                'duration': format_duration(info.get('duration', 0)),
                'thumbnail': info.get('thumbnail')
            }
            
            return jsonify(video_info)
            
    except Exception as e:
        print(f"Error fetching video info: {str(e)}")
        return jsonify({"error": "Failed to fetch video info"}), 500

@app.route('/api/download', methods=['GET'])
def download_video():
    try:
        video_id = request.args.get('videoId')
        format_type = request.args.get('format')
        
        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400
            
        url = f"https://www.youtube.com/watch?v={video_id}"
        
        temp_dir = tempfile.mkdtemp()
        
        try:
            # Configure yt-dlp options based on format
            if format_type == 'mp3':
                ydl_opts = {
                    'format': 'bestaudio/best',
                    'outtmpl': f'{temp_dir}/%(title)s.%(ext)s',
                    'postprocessors': [{
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3',
                        'preferredquality': '192',
                    }],
                }
                file_extension = 'mp3'
            else:  # mp4
                ydl_opts = {
                    'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                    'outtmpl': f'{temp_dir}/%(title)s.%(ext)s',
                }
                file_extension = 'mp4'
                
            # Download the file
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                title = info.get('title', video_id)
                # Clean filename
                clean_title = re.sub(r'[^\w\s-]', '', title).strip()
                
            # Find the file in the temp dir
            files = os.listdir(temp_dir)
            if not files:
                return jsonify({"error": "Download failed - no file created"}), 500
                
            file_path = os.path.join(temp_dir, files[0])
            
            # Set up the response
            return send_file(
                file_path,
                as_attachment=True,
                download_name=f"{clean_title}.{file_extension}",
                mimetype=f"{'audio' if format_type == 'mp3' else 'video'}/{file_extension}"
            )
            
        finally:
            # Clean up temp directory when done
            shutil.rmtree(temp_dir, ignore_errors=True)
            
    except Exception as e:
        print(f"Error downloading video: {str(e)}")
        return jsonify({"error": "Failed to download video"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
