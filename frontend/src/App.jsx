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
      setLoading(true);
      window.location.href = `/api/download?url=${encodeURIComponent(url)}&format=${format}`;
    } catch (err) {
      setError('Download failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>YouTube Video Downloader</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={fetchVideoInfo} disabled={loading}>
          {loading ? 'Loading...' : 'Get Video Info'}
        </button>
      </div>
      
      {error && <p className="error">{error}</p>}
      
      {videoInfo && (
        <div className="video-info">
          <h2>{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail} alt={videoInfo.title} />
          <div className="duration">Duration: {videoInfo.duration}</div>
          <div className="author">Channel: {videoInfo.uploader}</div>
          
          <div className="download-buttons">
            <button onClick={() => downloadVideo('mp4')}>
              Download Video (MP4)
            </button>
            <button onClick={() => downloadVideo('mp3')}>
              Download Audio (MP3)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
