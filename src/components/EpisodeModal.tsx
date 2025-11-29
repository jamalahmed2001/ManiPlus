import React from 'react';
import Image from 'next/image';
import type { Episode } from './SEO';
import { AudioPlayer } from './AudioPlayer';

interface EpisodeModalProps {
  episode: Episode | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (id: string) => void;
}

export const EpisodeModal: React.FC<EpisodeModalProps> = ({ episode, isOpen, onClose, onPlay: _onPlay }) => {
  if (!episode || !isOpen) return null;

  // Extract episode number from episodeNumber field (e.g., "EP 001" -> "1")
  const episodeNumMatch = episode.episodeNumber?.match(/\d+/);
  const episodeNumber = episodeNumMatch ? parseInt(episodeNumMatch[0], 10).toString() : '1';
  const podcastImage = `/podcasts/${episodeNumber}.png`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto shrink-0 bg-black overflow-hidden">
          {/* Blurred background layer */}
          <div className="absolute inset-0">
            <Image
              src={podcastImage}
              alt=""
              fill
              className="object-cover blur-2xl scale-110 opacity-60"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Main Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={podcastImage}
              alt={episode.title}
              width={400}
              height={400}
              className="w-[110%] h-[110%] object-contain"
              onError={(e) => {
                e.currentTarget.src = '/mani+logo.png';
                e.currentTarget.className = 'w-full h-full object-contain p-12';
              }}
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-400 text-xs">
                {new Date(episode.releaseDate).toLocaleDateString()}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {episode.title}
            </h2>
            
            {episode.topics && (
              <div className="flex flex-wrap gap-2 mb-6">
                {episode.topics.map((topic, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-sm max-w-none mb-8 text-gray-300">
              <p>{episode.description}</p>
              {/* If full content/transcript exists, it would go here */}
            </div>
          </div>

          <div className="sticky bottom-0 left-0 right-0 pt-4 bg-gray-900 border-t border-gray-800">
             {episode.audioUrl && (
                <AudioPlayer 
                  src={episode.audioUrl}
                  title={episode.title}
                  variant="red"
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

