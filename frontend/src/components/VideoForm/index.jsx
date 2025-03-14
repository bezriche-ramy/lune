import { useState } from 'react';
import './VideoForm.css';
import LoadingSpinner from '../LoadingSpinner';

const VideoForm = ({ onFetchInfo, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchInfo(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onFetchInfo(url);
    }
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="input-wrapper">
        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Get Info'}
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
