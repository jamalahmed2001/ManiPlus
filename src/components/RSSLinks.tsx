import React from 'react'
import { Button } from './Button'

interface RSSLinksProps {
  className?: string
  variant?: 'horizontal' | 'vertical'
  showLabels?: boolean
}

export const RSSLinks: React.FC<RSSLinksProps> = ({ 
  className = '', 
  variant = 'horizontal',
  showLabels = true 
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebeatingedge.com'
  
  const feeds = [
    {
      name: 'RSS Feed',
      url: `${baseUrl}/api/feed.xml`,
      icon: '📡',
      description: 'RSS 2.0 feed for podcast apps'
    },
    {
      name: 'Atom Feed', 
      url: `${baseUrl}/api/atom.xml`,
      icon: '⚛️',
      description: 'Atom feed for modern feed readers'
    },
    {
      name: 'JSON Feed',
      url: `${baseUrl}/api/feed.json`,
      icon: '📋',
      description: 'JSON feed for web applications'
    }
  ]

  const containerClass = variant === 'horizontal' 
    ? 'flex flex-wrap gap-3 justify-center'
    : 'flex flex-col gap-2'

  return (
    <div className={`${containerClass} ${className}`}>
      {feeds.map((feed) => (
        <a 
          key={feed.name}
          href={feed.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          title={feed.description}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <span className="group-hover:animate-pulse">{feed.icon}</span>
            {showLabels && <span>{feed.name}</span>}
          </Button>
        </a>
      ))}
    </div>
  )
}

// Dedicated podcast subscribe component with platform-specific links
export const PodcastSubscribeLinks: React.FC<{ className?: string }> = ({ className = '' }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebeatingedge.com'
  const rssUrl = `${baseUrl}/api/feed.xml`
  
  const platforms = [
    {
      name: 'Apple Podcasts',
      icon: '🍎',
      url: `https://podcasts.apple.com/podcast/id1234567890`, // Replace with actual Apple Podcasts URL
      color: 'purple-400'
    },
    {
      name: 'Spotify',
      icon: '🎵',
      url: `https://open.spotify.com/show/1234567890`, // Replace with actual Spotify URL
      color: 'green-400'
    },
    {
      name: 'Google Podcasts',
      icon: '🔍',
      url: `https://podcasts.google.com/feed/${encodeURIComponent(rssUrl)}`,
      color: 'blue-400'
    },
    {
      name: 'Overcast',
      icon: '☁️',
      url: `https://overcast.fm/itunes1234567890`, // Replace with actual Overcast URL
      color: 'orange-400'
    },
    {
      name: 'Pocket Casts',
      icon: '📱',
      url: `https://pca.st/episode/1234567890`, // Replace with actual Pocket Casts URL
      color: 'red-400'
    },
    {
      name: 'RSS Feed',
      icon: '📡',
      url: rssUrl,
      color: 'gray-400'
    }
  ]

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ${className}`}>
      {platforms.map((platform) => (
        <a 
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          title={`Listen on ${platform.name}`}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex flex-col items-center gap-2 p-4 h-auto transition-all duration-300 hover:scale-105 hover:text-${platform.color} border border-gray-700 hover:border-${platform.color}`}
          >
            <span className="text-2xl group-hover:animate-bounce">{platform.icon}</span>
            <span className="text-xs text-center leading-tight">{platform.name}</span>
          </Button>
        </a>
      ))}
    </div>
  )
}
