import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// TafTube Logo SVG Component
const TafTubeLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 flex items-center justify-center">
      {/* YouTube SVG Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
        <defs>
          <linearGradient id="ytb_grad" x1="9.816" x2="41.246" y1="9.871" y2="41.301" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f44f5a" />
            <stop offset=".443" stopColor="#ee3d4a" />
            <stop offset="1" stopColor="#e52030" />
          </linearGradient>
        </defs>
        <path fill="url(#ytb_grad)" d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40 c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56 c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267 C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"></path>
        <path d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376 v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624 c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z" opacity=".05"></path>
        <path d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334 c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z" opacity=".07"></path>
        <path fill="#fff" d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549 l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"></path>
      </svg>
    </div>
    <span className="text-2xl font-bold text-gray-900 dark:text-white">TafTube</span>
  </div>
);

// Search Icon
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Microphone Icon
const MicIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
  </svg>
);

// Create/Plus Icon
const CreateIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

// Notifications/Bell Icon
const NotificationIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

// Menu Icon
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Home Icon
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z"/>
  </svg>
);

// Shorts Icon
const ShortsIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 9.35L15 12l-5 2.65V9.35M12 6a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h7m7-3a1 1 0 011 1v16a1 1 0 01-1 1h-7a1 1 0 01-1-1V4a1 1 0 011-1h7z"/>
  </svg>
);

// Subscriptions Icon
const SubscriptionsIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2z"/>
  </svg>
);

// History Icon
const HistoryIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

// Playlists Icon
const PlaylistIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/>
  </svg>
);

// Your Videos Icon
const VideoIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
  </svg>
);

// Watch Later Icon
const WatchLaterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
  </svg>
);

// Liked Videos Icon
const LikeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
  </svg>
);

// Trending Icon
const TrendingIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.53 11.2c-.23-.3-.5-.56-.77-.82-.81-.79-1.98-1.34-3.16-1.34s-2.35.55-3.16 1.34c-.27.26-.54.52-.77.82L7.1 8.64c.18-.18.37-.35.57-.5 1.41-1.09 3.16-1.69 4.93-1.69s3.52.6 4.93 1.69c.2.15.39.32.57.5l-2.57 2.56zm-4.26 8.8c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
  </svg>
);

// Settings Icon
const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

// Dark Mode Icon
const DarkModeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
  </svg>
);

// Light Mode Icon
const LightModeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
  </svg>
);

// User Avatar Dropdown Component
const UserDropdown = ({ darkMode, toggleDarkMode, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const menuItems = [
    { label: 'Your channel', icon: '👤' },
    { label: 'YouTube Studio', icon: '🎬' },
    { label: 'Switch account', icon: '🔄' },
    { label: 'Sign out', icon: '🚪' },
    { label: 'Settings', icon: <SettingsIcon /> },
  ];

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-12 w-64 bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50"
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">User Name</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">user@example.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {typeof item.icon === 'string' ? item.icon : item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </span>
          <span>Appearance: {darkMode ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </div>
  );
};

// Utility hook for media query
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(window.matchMedia(query).matches);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}

// Header Component
export const Header = ({ sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(localSearchQuery.trim())}`);
      setMobileSearchOpen(false); // close overlay on mobile
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className={`flex items-center justify-between px-2 sm:px-4 py-2 ${isMobile ? 'gap-2' : ''}`}>
        {/* Left section - Menu and Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            aria-label="Open sidebar menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors sm:block"
          >
            <MenuIcon />
          </button>
          <Link to="/" className="flex items-center">
            <TafTubeLogo />
          </Link>
        </div>

        {/* Center section - Search (collapses on mobile) */}
        {!isMobile && (
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="flex flex-1">
                <div className="flex flex-1">
                  <input
                    type="text"
                    placeholder="Search"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-50 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </form>
              <button className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <MicIcon />
              </button>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="flex-1 flex justify-end">
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={() => setMobileSearchOpen(true)}
            >
              <SearchIcon />
            </button>
          </div>
        )}

        {/* Right section - Create, Notifications, User menu */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button aria-label="Create" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <CreateIcon />
          </button>
          <button aria-label="Notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors relative">
            <NotificationIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          <div className="relative">
            <button
              aria-label="User menu"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold hover:bg-red-700 transition-colors"
            >
              U
            </button>
            <UserDropdown 
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              isOpen={dropdownOpen}
              setIsOpen={setDropdownOpen}
            />
          </div>
        </div>
      </div>
      {/* Mobile Search Overlay */}
      {isMobile && mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-start justify-center">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md mx-auto mt-8 flex bg-white dark:bg-gray-900 rounded-full shadow-lg overflow-hidden animate-fadeIn"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Search"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-lg border-0 focus:outline-none bg-transparent dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-3 text-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
              aria-label="Submit search"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="px-4 py-3 text-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
              aria-label="Cancel search"
              onClick={() => setMobileSearchOpen(false)}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  // Sidebar section arrays (restored)
  const mainItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/' },
    { icon: <ShortsIcon />, label: 'Shorts', path: '/shorts' },
    { icon: <SubscriptionsIcon />, label: 'Subscriptions', path: '/subscriptions' },
    { icon: <PlaylistIcon />, label: 'Library', path: '/playlists' },
  ];

  const youItems = [
    { icon: <HistoryIcon />, label: 'History', path: '/history' },
    { icon: <PlaylistIcon />, label: 'Playlists', path: '/playlists' },
    { icon: <VideoIcon />, label: 'Your videos', path: '/your-videos' },
    { icon: <WatchLaterIcon />, label: 'Watch later', path: '/watch-later' },
    { icon: <LikeIcon />, label: 'Liked videos', path: '/liked-videos' },
  ];

  // Mock subscriptions data
  const subscriptions = [
    { name: 'MrBeast', avatar: 'MB', verified: true },
    { name: 'Marques Brownlee', avatar: 'MB', verified: true },
    { name: 'Veritasium', avatar: 'V', verified: true },
    { name: 'Kurzgesagt', avatar: 'K', verified: true },
    { name: 'Linus Tech Tips', avatar: 'LT', verified: true },
  ];

  // Helper for active state
  const isActive = (path) => location.pathname === path;

  // Helper for tooltips
  const Tooltip = ({ children, label }) => (
    <div className="group relative flex items-center justify-center">
      {children}
      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity duration-200">
        {label}
      </span>
    </div>
  );

  // Hide sidebar on /watch route (desktop and mobile)
  if (location.pathname.startsWith('/watch')) {
    return null;
  }

  // Hide sidebar on mobile unless open
  if (isMobile) {
    return (
      <>
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
            onClick={e => {
              e.stopPropagation();
              if (typeof window !== 'undefined') {
                const evt = new CustomEvent('closeSidebar');
                window.dispatchEvent(evt);
              }
            }}
          />
        )}
        <aside
          className={`fixed left-0 top-16 h-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 overflow-y-auto
            ${sidebarOpen ? 'w-20' : 'w-0'}
            ${!sidebarOpen ? 'pointer-events-none' : ''}
          `}
          style={!sidebarOpen ? { visibility: 'hidden' } : {}}
          aria-label="Sidebar navigation"
        >
          <nav className="p-2 flex flex-col items-center space-y-2">
            {mainItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-300`}
                aria-label={item.label}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        </aside>
        {/* Bottom Navigation Bar for Mobile (not on /watch) */}
        {!location.pathname.startsWith('/watch') && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around py-1 sm:hidden">
            {mainItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center w-12 h-12 text-gray-600 dark:text-gray-300 hover:text-red-600"
                aria-label={item.label}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </>
    );
  }

  // Desktop sidebar
  if (!sidebarOpen) {
    // Closed: Only show main section icons, centered, with tooltips
    return (
      <aside
        className={`sticky top-16 h-[calc(100vh-4rem)] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 overflow-y-auto w-16`}
        aria-label="Sidebar navigation"
      >
        <nav className="flex flex-col items-center mt-2">
          {mainItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group flex flex-col items-center justify-center w-12 h-12 rounded-lg mb-1 transition-colors
                ${isActive(item.path) ? 'bg-gray-100 dark:bg-gray-800 font-bold text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200'}`}
              aria-label={item.label}
            >
              <Tooltip label={item.label}>
                <span className="text-xl">{item.icon}</span>
              </Tooltip>
            </button>
          ))}
        </nav>
      </aside>
    );
  }

  // Desktop sidebar open: show all sections
  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 overflow-y-auto w-60`}
      aria-label="Sidebar navigation"
    >
      <nav className="flex flex-col h-full">
        {/* Main Section */}
        <div className="mt-2">
          {mainItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group flex items-center w-full px-3 py-3 rounded-lg mb-1 transition-colors
                ${isActive(item.path) ? 'bg-gray-100 dark:bg-gray-800 font-bold text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200'}
                justify-start space-x-6`}
              aria-label={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-2 mx-3" />
        {/* You Section */}
        <div>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">You</div>
          {youItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group flex items-center w-full px-3 py-2 rounded-lg mb-1 transition-colors
                ${isActive(item.path) ? 'bg-gray-100 dark:bg-gray-800 font-bold text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200'}
                justify-start space-x-6`}
              aria-label={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-2 mx-3" />
        {/* Subscriptions Section */}
        <div className="flex-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Subscriptions</div>
          {subscriptions.map((sub, index) => (
            <button
              key={index}
              className={`group flex items-center w-full px-3 py-2 rounded-lg mb-1 transition-colors
                hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200
                justify-start space-x-3`}
              aria-label={sub.name}
            >
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {sub.avatar}
              </div>
              <span className="text-sm truncate">{sub.name}</span>
              {sub.verified && (
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

// Shorts Card Component
const ShortsCard = ({ video }) => {
  const navigate = useNavigate();
  
  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.default?.url;
  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;

  const handleClick = () => {
    saveVideoToHistory(video);
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="relative mb-2">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-[9/16] object-cover rounded-xl group-hover:rounded-lg transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          Shorts
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-5">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {channelTitle}
        </p>
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video, isSearchResult = false }) => {
  const navigate = useNavigate();
  
  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.default?.url;
  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const publishedAt = video.snippet?.publishedAt;
  const viewCount = video.statistics?.viewCount;

  const formatViewCount = (count) => {
    if (!count) return 'No views';
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(now - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleClick = () => {
    saveVideoToHistory(video);
    navigate(`/watch?v=${videoId}`);
  };

  if (isSearchResult) {
    return (
      <div 
        onClick={handleClick}
        className="flex space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
      >
        <div className="relative flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-48 h-28 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {formatViewCount(viewCount)} • {formatDate(publishedAt)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {channelTitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="relative mb-3">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover rounded-xl group-hover:rounded-lg transition-all duration-200"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-5">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {channelTitle}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatViewCount(viewCount)} • {formatDate(publishedAt)}
        </p>
      </div>
    </div>
  );
};

// Video Grid Component
export const VideoGrid = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {videos.map((video, index) => (
        <VideoCard key={video.id || index} video={video} />
      ))}
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ videos }) => {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <VideoCard key={video.id?.videoId || index} video={video} isSearchResult />
      ))}
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ video, relatedVideos }) => {
  const videoId = video.id;
  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const description = video.snippet?.description;
  const viewCount = video.statistics?.viewCount;
  const likeCount = video.statistics?.likeCount;
  const publishedAt = video.snippet?.publishedAt;

  const formatViewCount = (count) => {
    if (!count) return 'No views';
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="lg:flex lg:space-x-6">
      {/* Main video section */}
      <div className="lg:flex-1">
        {/* Video Player */}
        <div className="relative w-full aspect-video mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            className="w-full h-full rounded-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {channelTitle?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{channelTitle}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatViewCount(viewCount)} views • {formatDate(publishedAt)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <LikeIcon />
                <span className="text-sm font-medium">{formatViewCount(likeCount)}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Related videos sidebar */}
      <div className="lg:w-96 mt-6 lg:mt-0">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Related Videos</h3>
        <div className="space-y-3">
          {relatedVideos.slice(0, 10).map((video, index) => (
            <VideoCard key={video.id?.videoId || index} video={video} isSearchResult />
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Export ShortsCard for use in App.js
export { ShortsCard };

// --- Topic Suggestions Bar ---
const topics = [
  'All',
  'Music',
  'Science fiction',
  'News',
  'Gaming',
  'Live',
  'AI',
  'Sports',
  'Programming',
  'Podcasts',
  'Movies',
  'Learning',
  'Fashion',
  'Travel',
  'Comedy',
  'Recently uploaded',
  'Watched',
  'New to you',
];

export const TopicBar = ({ selected, onSelect }) => (
  <nav className="sticky top-14 z-40 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 overflow-x-auto w-full">
    <div className="flex space-x-2 px-2 py-2 overflow-x-auto hide-scrollbar">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect && onSelect(topic)}
          className={`whitespace-nowrap px-4 py-1 rounded-full text-sm font-medium border transition-colors
            ${selected === topic
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black border-gray-900 dark:border-white'
              : 'bg-gray-100 text-gray-800 dark:bg-white/20 dark:text-white border-gray-200 dark:border-transparent hover:bg-gray-200 dark:hover:bg-white/30'}
          `}
          style={{ minWidth: 'fit-content' }}
        >
          {topic}
        </button>
      ))}
    </div>
  </nav>
);

// Utility: Save video to history in localStorage
function saveVideoToHistory(video) {
  if (!video || !video.id) return;
  const historyKey = 'taftube_history';
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(historyKey)) || [];
  } catch (e) {}
  // Remove if already exists
  history = history.filter(v => v.id !== video.id && v.id?.videoId !== video.id?.videoId);
  // Add to front
  history.unshift({
    id: video.id?.videoId || video.id,
    title: video.snippet?.title,
    thumbnail: video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.default?.url,
    channelTitle: video.snippet?.channelTitle,
    publishedAt: video.snippet?.publishedAt,
  });
  // Limit to 100
  if (history.length > 100) history = history.slice(0, 100);
  localStorage.setItem(historyKey, JSON.stringify(history));
}

// --- History Page ---
export const HistoryPage = () => {
  const [history, setHistory] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem('taftube_history')) || [];
      setHistory(h);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem('taftube_history');
    setHistory([]);
  };

  if (!history.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">History</h1>
        <p className="text-gray-600 dark:text-gray-300">No videos watched yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">History</h1>
        <button
          onClick={handleClear}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
        >
          Clear History
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {history.map((video, idx) => (
          <div
            key={video.id || idx}
            className="cursor-pointer group bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition p-2"
            onClick={() => navigate(`/watch?v=${video.id}`)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover rounded-lg mb-2"
            />
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-5">{video.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{video.channelTitle}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};