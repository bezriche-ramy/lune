import React from 'react';
import './VideoPreview.css';

function VideoPreview({ videoInfo }) {
  return (
    <div className="video-preview card">
      <div className="preview-content">
        <div className="thumbnail">
          <img src={videoInfo.thumbnail} alt={videoInfo.title} />
        </div>
        <div className="info">
          <h3>{videoInfo.title}</h3>
          <p className="channel">{videoInfo.channel}</p>
          <p className="details">
            {videoInfo.duration} • {videoInfo.views} views
          </p>
          <button 
            className="download-btn" 
            onClick={videoInfo.handleDownload}
          >
            Download {videoInfo.quality}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPreview;
