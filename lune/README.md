# YouTube Video Downloader

A web application that allows you to download videos from YouTube in both MP4 and MP3 formats.

## Features

- Fetch video information by URL
- Download videos as MP4
- Download audio as MP3
- Clean and intuitive user interface

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd lune
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### FFmpeg Installation

The Python backend uses yt-dlp which requires FFmpeg for audio conversion:

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install ffmpeg -y
```

For more detailed Ubuntu installation instructions, see [INSTALL_UBUNTU.md](./INSTALL_UBUNTU.md)

**macOS with Homebrew**:
```bash
brew install ffmpeg
```

**Windows**:
Download and install from https://www.ffmpeg.org/download.html

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```
   The server will run on http://localhost:5000

2. In a separate terminal, start the frontend:
   ```bash
   cd lune
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (or another port if 5173 is in use)

## Usage

1. Open the application in your browser
2. Paste a YouTube URL into the input field
3. Click "Get Video Info" to load the video details
4. Choose whether to download as video (MP4) or audio (MP3)
5. Your download will start automatically

## Technologies Used

- Frontend: React, Vite
- Backend: Python, Flask
- YouTube API: yt-dlp

## Legal Disclaimer

This application is for personal use only. Downloading copyrighted material without permission may be illegal in your country. Users are responsible for complying with local laws and YouTube's Terms of Service.

## Deployment Instructions for Render

### Option 1: Using the Dashboard

1. Create a Render account at https://render.com
2. Click "New +" and select "Static Site"
3. Connect your GitHub/GitLab repository or upload your files
4. Configure the service:
   - **Name**: youtube-video-downloader (or choose your own)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click "Create Static Site"

### Option 2: Using render.yaml (Recommended)

1. Make sure you have the `render.yaml` file in your repository
2. Go to Render Dashboard
3. Click "New +" and select "Blueprint"
4. Connect your repository
5. Render will automatically detect and use the render.yaml file
6. Confirm the deployment settings and click "Apply"

Your app will be deployed and accessible at the provided Render URL.
