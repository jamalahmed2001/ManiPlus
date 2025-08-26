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
      hoverColors: 'hover:text-purple-400 hover:border-purple-400'
    },
    {
      name: 'Spotify',
      icon: '🎵',
      url: `https://open.spotify.com/show/1234567890`, // Replace with actual Spotify URL
      hoverColors: 'hover:text-green-400 hover:border-green-400'
    },
    {
      name: 'YouTube',
      icon: '🎥',
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      hoverColors: 'hover:text-red-500 hover:border-red-500'
    },
    {
      name: 'Patreon',
      icon: '💰',
      url: `https://patreon.com/thebeatingedge`, // Replace with actual Patreon URL
      hoverColors: 'hover:text-orange-400 hover:border-orange-400'
    },
    {
      name: 'RSS Feed',
      icon: '📡',
      url: rssUrl,
      hoverColors: 'hover:text-gray-300 hover:border-gray-300'
    }
  ]

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
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
            size="md" 
            className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-full transition-all duration-300 hover:scale-105 border border-gray-700 ${platform.hoverColors}`}
          >
            <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-bounce transition-transform">{platform.icon}</span>
            <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">{platform.name}</span>
          </Button>
        </a>
      ))}
    </div>
  )
}
