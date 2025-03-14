const API_BASE_URL = 'http://localhost:5000/api';

export const getVideoInfo = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/info?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch video info');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const downloadVideo = async (videoId, format) => {
  // Open a new window/tab for the download
  window.open(`${API_BASE_URL}/download?videoId=${videoId}&format=${format}`, '_blank');
};
