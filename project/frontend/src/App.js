import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { 
  Header, 
  Sidebar, 
  VideoGrid, 
  VideoPlayer, 
  SearchResults,
  LoadingSpinner,
  ShortsCard
} from './components';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Main App Component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App bg-white dark:bg-black min-h-screen">
      <BrowserRouter>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} />
          <main className={`flex-1 transition-all duration-300 pt-16 ${sidebarOpen ? 'ml-60' : 'ml-16'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shorts" element={<ShortsPage />} />
              <Route path="/watch" element={<WatchPage />} />
              <Route path="/results" element={<SearchPage searchQuery={searchQuery} />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

// Shorts Page Component
const ShortsPage = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShorts();
  }, []);

  const fetchShorts = async () => {
    try {
      setLoading(true);
      // Search for short videos (under 60 seconds)
      const response = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&type=video&videoDuration=short&maxResults=20&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setShorts(data.items || []);
    } catch (error) {
      console.error('Error fetching shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Shorts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {shorts.map((short, index) => (
          <ShortsCard key={short.id?.videoId || index} video={short} />
        ))}
      </div>
    </div>
  );
};
const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularVideos();
  }, []);

  const fetchPopularVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${YOUTUBE_API_BASE}/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=24&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error('Error fetching popular videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <VideoGrid videos={videos} />
    </div>
  );
};

// Watch Page Component  
const WatchPage = () => {
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const videoId = new URLSearchParams(location.search).get('v');

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails();
      fetchRelatedVideos();
    }
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE}/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideo(data.items?.[0]);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setRelatedVideos(data.items || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching related videos:', error);
      setLoading(false);
    }
  };

  if (loading || !video) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <VideoPlayer video={video} relatedVideos={relatedVideos} />
    </div>
  );
};

// Search Page Component
const SearchPage = ({ searchQuery }) => {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get('search_query') || searchQuery;

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=20&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
        Search results for "{query}"
      </h2>
      <SearchResults videos={videos} />
    </div>
  );
};

export default App;