import React from 'react';
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

  return (
    <Card variant="hover" borderColor={episode.color}>
      <div className="space-y-4">
        {/* Episode Info */}
        <div>
          <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${getTitleHoverColor(episode.color)}`}>
            {episode.episodeNumber}: {episode.title}
          </h3>
          <p className="text-gray-400 mb-2 leading-relaxed">
            {episode.description}
          </p>
          <div className="text-sm text-gray-500">
            {episode.duration} • Released {episode.releaseDate}
          </div>
        </div>

        {/* Audio Player */}
        {episode.audioUrl && (
          <AudioPlayer 
            src={episode.audioUrl}
            title={`${episode.episodeNumber}: ${episode.title}`}
            variant={episode.color}
            compact={true}
            className="mt-4"
          />
        )}
      </div>
    </Card>
  );
};
