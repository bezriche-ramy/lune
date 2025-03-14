import React from 'react';
import { downloadVideo } from '../services/api';

const VideoPreview = ({ videoInfo }) => {
  const handleDownload = async (format) => {
    try {
      await downloadVideo(videoInfo.videoId, format);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the video. Please try again.');
    }
  };

  return (
    <div className="video-preview">
      <div className="preview-content">
        <div className="thumbnail">
          <img src={videoInfo.thumbnail} alt={videoInfo.title} />
        </div>
        <div className="info">
          <h2>{videoInfo.title}</h2>
          <p className="channel">{videoInfo.channel}</p>
          <p className="duration">{videoInfo.duration}</p>
          
          <div className="download-options">
            <h3>Download Options</h3>
            <div className="format-buttons">
              <button onClick={() => handleDownload('mp4')} className="download-btn mp4">
                Download MP4 Video
              </button>
              <button onClick={() => handleDownload('mp3')} className="download-btn mp3">
                Download MP3 Audio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
