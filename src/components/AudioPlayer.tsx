import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  className?: string;
  variant?: 'red' | 'green' | 'white';
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  src, 
  title, 
  className = '', 
  variant = 'red',
  compact = false 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const getColors = (variant: string) => {
    switch (variant) {
      case 'red':
        return {
          accent: 'text-red-400',
          accentBg: 'bg-red-400',
          accentHover: 'hover:bg-red-500',
          accentBorder: 'border-red-400',
          progressBg: 'bg-red-400',
        };
      case 'green':
        return {
          accent: 'text-green-500',
          accentBg: 'bg-green-500',
          accentHover: 'hover:bg-green-600',
          accentBorder: 'border-green-500',
          progressBg: 'bg-green-500',
        };
      case 'white':
        return {
          accent: 'text-white',
          accentBg: 'bg-white',
          accentHover: 'hover:bg-gray-200',
          accentBorder: 'border-white',
          progressBg: 'bg-white',
        };
      default:
        return {
          accent: 'text-red-400',
          accentBg: 'bg-red-400',
          accentHover: 'hover:bg-red-500',
          accentBorder: 'border-red-400',
          progressBg: 'bg-red-400',
        };
    }
  };

  const colors = getColors(variant);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audio.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 15, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <audio ref={audioRef} src={src} preload="metadata" />
        
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full ${colors.accentBg} ${colors.accentHover} flex items-center justify-center transition-all duration-200 disabled:opacity-50`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-300 truncate mb-1">{title}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <div 
              ref={progressRef}
              className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div 
                className={`h-full ${colors.progressBg} rounded-full transition-all duration-150 group-hover:h-1.5`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Title */}
      <div className={`text-lg font-semibold ${colors.accent} mb-4 truncate`}>
        {title}
      </div>

      {/* Main Controls */}
      <div className="flex items-center gap-4 mb-4">
        {/* Skip Backward */}
        <button
          onClick={skipBackward}
          className={`p-2 rounded-full border ${colors.accentBorder} ${colors.accent} hover:bg-gray-800 transition-colors`}
          aria-label="Skip backward 15 seconds"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
            <text x="12" y="15" className="text-xs fill-current">15</text>
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className={`w-12 h-12 rounded-full ${colors.accentBg} ${colors.accentHover} flex items-center justify-center transition-all duration-200 disabled:opacity-50 shadow-lg`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Skip Forward */}
        <button
          onClick={skipForward}
          className={`p-2 rounded-full border ${colors.accentBorder} ${colors.accent} hover:bg-gray-800 transition-colors`}
          aria-label="Skip forward 15 seconds"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
            <text x="12" y="15" className="text-xs fill-current">15</text>
          </svg>
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleMute}
            className={`p-2 ${colors.accent} hover:bg-gray-800 rounded transition-colors`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className={`w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-${variant}`}
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div 
          ref={progressRef}
          className="h-2 bg-gray-700 rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className={`h-full ${colors.progressBg} rounded-full transition-all duration-150 group-hover:h-2.5`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb-red::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          background: #f87171;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider-thumb-green::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider-thumb-white::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          background: #ffffff;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
