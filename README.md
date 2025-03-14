# YouTube Video Downloader

A web application that allows you to download videos from YouTube in both MP4 and MP3 formats.

## Features

- Fetch video information by URL
- Download videos as MP4
- Download audio as MP3
- Clean and intuitive user interface

## Project Structure

```
lune/
├── frontend/     # React frontend application
├── backend/      # Python Flask backend
├── package.json  # Root package.json for deployment
└── render.yaml   # Render deployment configuration
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/bezriche-ramy/lune.git
   cd lune
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
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
   cd frontend
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
2. Click "New +" and select "Blueprint"
3. Connect your GitHub/GitLab repository
4. Render will use the render.yaml file to configure your services
5. Click "Apply" to deploy both frontend and backend

### Option 2: Manual Deployment

For frontend:
1. Create a new Static Site on Render
2. Set the build command to: `cd frontend && npm install && npm run build`
3. Set the publish directory to: `frontend/dist`

For backend:
1. Create a new Web Service on Render
2. Set the build command to: `cd backend && pip install -r requirements.txt`
3. Set the start command to: `cd backend && python app.py`

Your app will be deployed and accessible at the provided Render URLs.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/bezriche-ramy/lune.git
   cd lune
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Build the project:
   ```sh
   cd frontend
   npm install
   npm run build
   mkdir -p ../backend/static
   cp -r dist/* ../backend/static/
   ```

4. Run the backend server:
   ```sh
   cd ../backend
   npm start
   ```

## Troubleshooting

If you encounter any issues, please refer to the [Render troubleshooting guide](https://render.com/docs/troubleshooting-deploys).
