# Installation Guide for Ubuntu

This guide provides specific installation instructions for running the YouTube Video Downloader on Ubuntu.

## Prerequisites

1. Python 3.6+
2. Node.js 14+
3. npm or yarn
4. FFmpeg (required for audio conversion)

## Installation Steps

### 1. Install FFmpeg

FFmpeg is required for converting videos to MP3 format. Install it using:

```bash
sudo apt update
sudo apt install ffmpeg -y
```

Verify the installation:

```bash
ffmpeg -version
```

### 2. Clone the repository

```bash
git clone <repository-url>
cd lune
```

### 3. Set up the backend

```bash
cd backend
# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate
# Install dependencies
pip install flask flask-cors yt-dlp
```

### 4. Set up the frontend

```bash
cd ..  # Return to the project root
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
source venv/bin/activate  # If using a virtual environment
python app.py
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Open your browser and navigate to: http://localhost:5173

## Troubleshooting

If you encounter any issues with MP3 conversion, ensure FFmpeg is correctly installed:

```bash
which ffmpeg
```

This should return a path like `/usr/bin/ffmpeg`. If it doesn't, check your FFmpeg installation.
