import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import DownloadForm from './components/DownloadForm'
import VideoPreview from './components/VideoPreview'

function App() {
  const [videoInfo, setVideoInfo] = useState(null);
  
  return (
    <div className="container">
      <Header />
      <main>
        <DownloadForm onVideoInfoReceived={setVideoInfo} />
        {videoInfo && <VideoPreview videoInfo={videoInfo} />}
      </main>
    </div>
  )
}

export default App
