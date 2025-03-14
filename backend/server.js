const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const contentDisposition = require('content-disposition');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/info', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(url);
    
    // Format video info
    const videoInfo = {
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      channel: info.videoDetails.author.name,
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url
    };

    res.json(videoInfo);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
});

app.get('/api/download', async (req, res) => {
  try {
    const { videoId, format } = req.query;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(url);
    
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    
    if (format === 'mp3') {
      // Audio only
      res.setHeader('Content-Disposition', contentDisposition(`${videoTitle}.mp3`));
      ytdl(url, { 
        filter: 'audioonly',
        quality: 'highestaudio'
      }).pipe(res);
    } else {
      // Video (mp4)
      res.setHeader('Content-Disposition', contentDisposition(`${videoTitle}.mp4`));
      ytdl(url, { 
        filter: format => format.container === 'mp4',
        quality: 'highest'
      }).pipe(res);
    }
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Helper function to format duration
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  return [
    h > 0 ? h : null,
    h > 0 ? String(m).padStart(2, '0') : m,
    String(s).padStart(2, '0')
  ].filter(Boolean).join(':');
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
