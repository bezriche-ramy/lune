# How to Run the YouTube Video Downloader

This guide will walk you through setting up and running the YouTube Video Downloader application on Ubuntu.

## Prerequisites

Before starting, ensure you have:

1. Python 3.6+
2. Node.js 14+
3. npm
4. FFmpeg (required for audio conversion)

## Step 1: Install FFmpeg (if not already installed)

```bash
sudo apt update
sudo apt install ffmpeg -y
```

Verify the installation:
```bash
ffmpeg -version
```

## Step 2: Set up the Python Backend

1. Navigate to the project's backend directory:
```bash
cd ~/Documents/projects/lune/lune/backend
```

2. Create and activate a Python virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate
```

3. Install the required Python dependencies:
```bash
pip install -r requirements.txt
```
   
   Or install them directly:
```bash
pip install flask flask-cors yt-dlp
```

4. Start the Flask server:
```bash
python app.py
```
   
   The backend will run on http://localhost:5000

## Step 3: Set up the Frontend

1. Open a new terminal window

2. Navigate to the project root directory:
```bash
cd ~/Documents/projects/lune/lune
```

3. Install the Node.js dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```
   
   The frontend will run on http://localhost:5173 (or another port if 5173 is in use)

## Step 4: Use the Application

1. Open your web browser
2. Navigate to http://localhost:5173
3. Paste a YouTube URL into the input field
4. Click "Get Video Info" to load the video details
5. Choose whether to download as video (MP4) or audio (MP3)

## Troubleshooting

- **If the backend fails to start**:
  - Ensure Python and the required packages are installed
  - Check if port 5000 is already in use by another application

- **If the frontend fails to start**:
  - Ensure Node.js and npm are installed
  - Check if there are any dependency issues in the console output

- **If video/audio downloads fail**:
  - Verify FFmpeg is properly installed: `which ffmpeg`
  - Check your internet connection
  - Ensure the YouTube URL is valid and the video is available
