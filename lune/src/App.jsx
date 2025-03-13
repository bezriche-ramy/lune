import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import DownloadForm from './components/DownloadForm'
import VideoPreview from './components/VideoPreview'
import DownloadList from './components/DownloadList'
import Footer from './components/Footer'

function App() {
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToDownloads = (downloadInfo) => {
    setDownloads([...downloads, downloadInfo]);
  };

  const removeDownload = (id) => {
    setDownloads(downloads.filter(download => download.id !== id));
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <DownloadForm 
          setVideoInfo={setVideoInfo} 
          addToDownloads={addToDownloads}
          loading={loading}
          setLoading={setLoading}
        />
        {videoInfo && <VideoPreview videoInfo={videoInfo} />}
        <DownloadList downloads={downloads} removeDownload={removeDownload} />
      </main>
      <Footer />
    </div>
  )
}

export default App
