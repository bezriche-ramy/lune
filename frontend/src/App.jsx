import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`/api/video-info?url=${encodeURIComponent(url)}`);
      setVideoInfo(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch video information');
      setVideoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async (format) => {
    if (!videoInfo) return;
    
    try {
      window.location.href = `/api/download?url=${encodeURIComponent(url)}&format=${format}`;
    } catch (err) {
      setError('Download failed');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchVideoInfo();
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/lune-logo.svg" alt="Lune Logo" className="logo" />
      </div>
      <h1>YouTube Video Downloader</h1>
      
      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button onClick={fetchVideoInfo} disabled={loading}>
            {loading ? <span className="loader"></span> : 'Get Info'}
          </button>
        </div>
      </div>
      
      {error && <p className="error">{error}</p>}
      
      {videoInfo && (
        <div className="video-info">
          <div className="video-thumbnail">
            <img src={videoInfo.thumbnail} alt={videoInfo.title} />
            <div className="duration-badge">{videoInfo.duration}</div>
          </div>
          
          <div className="video-details">
            <h2 className="video-title">{videoInfo.title}</h2>
            <div className="video-author">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" strokeWidth="2" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{videoInfo.uploader}</span>
            </div>
          </div>
          
          <div className="download-buttons">
            <button className="download-button video" onClick={() => downloadVideo('mp4')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.2V7.5C21 6.12 20.12 5.25 18.75 5.25H5.25C3.88 5.25 3 6.12 3 7.5V16.5C3 17.88 3.88 18.75 5.25 18.75H18.75C20.12 18.75 21 17.88 21 16.5V16.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.25 10.5L14.25 12L11.25 13.5V10.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Video
            </button>
            <button className="download-button audio" onClick={() => downloadVideo('mp3')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V12L9 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 18V12L15 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 14H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 14H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
