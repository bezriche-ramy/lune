# Quick Start Guide - YouTube Downloader

## Install FFmpeg (one-time setup)

```bash
sudo apt update
sudo apt install ffmpeg -y
```

## Start the Backend

Open a terminal and run:

```bash
cd ~/Documents/projects/lune/lune/backend
python -m venv venv              # Create virtual environment (first time only)
source venv/bin/activate         # Activate virtual environment
pip install -r requirements.txt  # Install dependencies (first time only)
python app.py                    # Start the backend server
```

The backend server will run at http://localhost:5000

## Start the Frontend

Open a new terminal window and run:

```bash
cd ~/Documents/projects/lune/lune
npm install                      # Install dependencies (first time only)
npm run dev                      # Start the frontend server
```

The frontend will be available at http://localhost:5173

## Use the Application

1. Open your browser and go to: http://localhost:5173
2. Paste a YouTube URL in the input box
3. Click "Get Video Info"
4. Choose to download as MP4 or MP3
