# Ubuntu Setup Guide - YouTube Downloader

## Prerequisites Installation

First, make sure you have the necessary packages:

```bash
# Install Python and virtual environment support
sudo apt update
sudo apt install python3 python3-venv python3-full ffmpeg -y
```

## Backend Setup

```bash
# Navigate to the backend directory
cd ~/Documents/projects/lune/lune/backend

# Create a virtual environment with python3
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies within the virtual environment
pip install flask flask-cors yt-dlp
# Or if you have requirements.txt:
# pip install -r requirements.txt
```

## Running the Backend

```bash
# Make sure you're in the backend directory with activated venv
cd ~/Documents/projects/lune/lune/backend
source venv/bin/activate

# Run the application
python3 app.py
```

The backend will run on http://localhost:5000

## Frontend Setup

In a new terminal:

```bash
# Navigate to the frontend directory
cd ~/Documents/projects/lune/lune

# Install Node.js dependencies
npm install
```

## Running the Frontend

```bash
# Start the development server
npm run dev
```

The frontend will be available at http://localhost:5173

## Common Issues & Solutions

### "Command 'python' not found"
Use `python3` instead of `python` for all commands

### "externally-managed-environment" Error
This error occurs when trying to use pip outside a virtual environment.
Always ensure you've activated the virtual environment:
```bash
source venv/bin/activate
```

### "No such file or directory" for activate
Make sure you've correctly created the virtual environment using:
```bash
python3 -m venv venv
```

### FFmpeg Issues
Verify FFmpeg is installed:
```bash
ffmpeg -version
```
