import { useState } from 'react';
import './DownloadForm.css';

function DownloadForm({ setVideoInfo, addToDownloads, loading, setLoading }) {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('720p');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();
      setVideoInfo({
        ...data,
        url,
        quality,
      });
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const downloadId = Date.now().toString();
      addToDownloads({
        id: downloadId,
        title: videoInfo.title,
        url,
        quality,
        status: 'downloading',
        progress: 0,
      });

      // Start the download on the server
      await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, quality, downloadId }),
      });

    } catch (err) {
      setError(err.message || 'Download failed');
    }
  };

  return (
    <div className="download-form card">
      <h2>Download YouTube Video</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">YouTube URL</label>
          <div className="input-group">
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Check'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="quality">Video Quality</label>
          <select
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            disabled={loading}
          >
            <option value="360p">360p</option>
            <option value="480p">480p</option>
            <option value="720p">720p (HD)</option>
            <option value="1080p">1080p (Full HD)</option>
            <option value="1440p">1440p (2K)</option>
            <option value="2160p">2160p (4K)</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default DownloadForm;
