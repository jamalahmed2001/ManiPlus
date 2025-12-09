import React from 'react';
import Image from 'next/image';
import { AudioPlayer } from './AudioPlayer';
import { Card } from './Card';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  episodeNumber: string;
  color: 'red' | 'green' | 'white';
  audioUrl?: string;
}

interface EpisodeCardProps {
  episode: Episode;
  onPlay?: (episodeId: string) => void;
  isPlaying?: boolean;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onPlay: _onPlay,
  isPlaying: _isPlaying = false
}) => {
  const getTitleHoverColor = (color: string) => {
    switch (color) {
      case 'red': return 'group-hover:text-red-400';
      case 'green': return 'group-hover:text-green-400';
      case 'white': return 'group-hover:text-white';
      default: return 'group-hover:text-red-400';
    }
  };

  // Extract episode number from episodeNumber field (e.g., "EP 001" -> "1")
  const episodeNumMatch = /\d+/.exec(episode.episodeNumber ?? '');
  const episodeNumber = episodeNumMatch ? parseInt(episodeNumMatch[0], 10).toString() : '1';
  // Use .jpeg for episode 1, .png for all others
  const imageExtension = episodeNumber === '1' ? 'jpeg' : 'png';
  const podcastImage = `/podcasts/${episodeNumber}.${imageExtension}`;

  return (
    <Card variant="hover" borderColor={episode.color}>
      <div className="flex flex-col md:flex-row gap-6" data-episode-id={episode.id}>
        {/* Image Section */}
        <div className="relative w-full md:w-48 lg:w-56 aspect-square md:aspect-square shrink-0 overflow-hidden rounded-xl bg-black">
          {/* Blurred background layer */}
          <div className="absolute inset-0">
            <Image
              src={podcastImage}
              width={400}
              height={400}
              alt=""
              className="w-full h-full object-cover blur-2xl scale-110 opacity-60"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Color Gradient Overlay */}
          <div
            className={`absolute inset-0 ${
              episode.color === 'red'
                ? 'bg-gradient-to-br from-red-600/20 to-black/40'
                : episode.color === 'green'
                ? 'bg-gradient-to-br from-green-600/20 to-black/40'
                : 'bg-gradient-to-br from-white/10 to-black/40'
            } z-10`}
          />
          
          {/* Main Image */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Image
              src={podcastImage}
              width={400}
              height={400}
              alt={`${episode.title} cover`}
              className={`w-full h-full ${episodeNumber === '1' ? 'object-cover scale-110' : 'object-contain w-[90%] h-[90%]'} transform group-hover:scale-105 transition-transform duration-700`}
              onError={(e) => {
                // Fallback to logo if image not found
                e.currentTarget.src = '/mani+logo.png';
                e.currentTarget.className = 'w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700';
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-4">
        <div>
          <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${getTitleHoverColor(episode.color)}`}>
            {episode.title}
          </h3>
            <p className="text-gray-400 mb-2 leading-relaxed line-clamp-3">
            {episode.description}
          </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {episode.releaseDate}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {episode.duration}
              </span>
            </div>
        </div>

        {episode.audioUrl && (
          <AudioPlayer 
            src={episode.audioUrl}
            title={episode.title}
            variant={episode.color}
            compact={true}
            className="mt-4"
          />
        )}
        </div>
      </div>
    </Card>
  );
};
