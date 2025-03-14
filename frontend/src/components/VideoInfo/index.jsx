import './VideoInfo.css';
import DownloadButtons from '../DownloadButtons';

const VideoInfo = ({ videoInfo, onDownload }) => {
  if (!videoInfo) return null;

  return (
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
      
      <DownloadButtons onDownload={onDownload} />
    </div>
  );
};

export default VideoInfo;
