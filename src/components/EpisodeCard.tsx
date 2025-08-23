import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  episodeNumber: string;
  color: 'red' | 'green' | 'white';
}

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episodeId: string) => void;
  isPlaying?: boolean;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onPlay,
  isPlaying = false
}) => {
  const getButtonVariant = (color: string) => {
    switch (color) {
      case 'red': return 'primary';
      case 'green': return 'secondary';
      case 'white': return 'ghost';
      default: return 'primary';
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
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
        <Button
          variant={getButtonVariant(episode.color)}
          onClick={() => onPlay(episode.id)}
          disabled={isPlaying}
          isLoading={isPlaying}
          icon={!isPlaying ? "▶" : undefined}
        >
          {isPlaying ? 'Playing...' : 'Play'}
        </Button>
      </div>
    </Card>
  );
};
