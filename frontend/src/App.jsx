import { useState } from 'react';
import axios from 'axios';
import './App.css';

// Import components
import Header from './components/Header';
import VideoForm from './components/VideoForm';
import ErrorMessage from './components/ErrorMessage';
import VideoInfo from './components/VideoInfo';

function App() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVideoInfo = async (inputUrl) => {
    if (!inputUrl?.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    // Update the current URL
    setUrl(inputUrl);
    
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`/api/video-info?url=${encodeURIComponent(inputUrl)}`);
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

  return (
    <div className="container">
      <Header />
      
      <VideoForm 
        onFetchInfo={fetchVideoInfo} 
        loading={loading} 
      />
      
      <ErrorMessage message={error} />
      
      <VideoInfo 
        videoInfo={videoInfo} 
        onDownload={downloadVideo} 
      />
    </div>
  );
}

export default App;
