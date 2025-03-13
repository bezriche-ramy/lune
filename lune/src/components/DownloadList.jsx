import React, { useEffect, useState } from 'react';
import './DownloadList.css';
import DownloadProgress from './DownloadProgress';

function DownloadList({ downloads, removeDownload }) {
  const [downloadStatuses, setDownloadStatuses] = useState({});
  
  useEffect(() => {
    if (downloads.length === 0) return;
    
    const eventSource = new EventSource('http://localhost:5000/api/download-status');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDownloadStatuses(prev => ({
        ...prev,
        [data.downloadId]: data
      }));
      
      // Close the connection when all downloads are completed
      const allCompleted = Object.values(downloadStatuses).every(
        status => status.status === 'completed' || status.status === 'error'
      );
      
      if (allCompleted) {
        eventSource.close();
      }
    };
    
    eventSource.onerror = () => {
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, [downloads.length]);
  
  if (downloads.length === 0) {
    return null;
  }
  
  return (
    <div className="download-list card">
      <h2>Downloads</h2>
      {downloads.map(download => (
        <DownloadProgress
          key={download.id}
          download={download}
          status={downloadStatuses[download.id]}
          onRemove={() => removeDownload(download.id)}
        />
      ))}
    </div>
  );
}

export default DownloadList;
