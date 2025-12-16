import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const VideoCard = ({ video }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { 
    title = 'Unknown', 
    channel = 'Unknown Channel',
    thumbnail = '/api/placeholder/320/180',
    url,
    videoId = 'unknown',
    description
  } = video;

  // Function to add to watch history
  const addToWatchHistory = async () => {
    if (!auth?.user?._id || !auth?.token) return;
    
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const api = axios.create({
        baseURL: `${API_URL}/api`
      });
      
      // Add to watch history
      await api.post(
        `/user/${auth.user._id}/add-watch`,
        {
          videoId: videoId,
          videoTitle: title,
          videoThumbnail: thumbnail,
          videoChannel: channel
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      
      console.log('Added to watch history:', title);
    } catch (error) {
      console.error('Failed to add to watch history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle watch video click
  const handleWatchClick = (e) => {
    // Add to history but don't prevent default navigation
    addToWatchHistory();
  };

  return (
    <div className="card group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-bold text-lg mb-1 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
          {channel}
        </p>
        
        {description && (
          <p className="text-xs text-muted-foreground/80 line-clamp-2 mb-4">
            {description}
          </p>
        )}
        
        <a 
          href={url || `https://www.youtube.com/watch?v=${videoId}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleWatchClick}
          className="btn btn-primary w-full text-sm py-2 mt-auto"
        >
          {loading ? 'Loading...' : 'Watch Video'}
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
