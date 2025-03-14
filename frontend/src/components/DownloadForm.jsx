import React, { useState } from 'react';
import { getVideoInfo } from '../services/api';

const DownloadForm = ({ onVideoInfoReceived }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim() || !url.includes('youtube.com/') && !url.includes('youtu.be/')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const videoInfo = await getVideoInfo(url);
      onVideoInfoReceived(videoInfo);
    } catch (err) {
      setError('Failed to fetch video information. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="url-input"
            placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loading...' : 'Get Video Info'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default DownloadForm;
