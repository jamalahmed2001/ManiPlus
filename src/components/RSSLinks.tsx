import React from 'react'
import { Button } from './Button'
import { FaApple, FaSpotify, FaYoutube, FaPatreon, FaRss, FaAmazon } from 'react-icons/fa'

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

// Enhanced podcast subscribe component with engaging design
export const PodcastSubscribeLinks: React.FC<{ className?: string }> = ({ className = '' }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebeatingedge.com'
  const rssUrl = `${baseUrl}/api/feed.xml`
  
  const platforms = [
    {
      name: 'Apple Podcasts',
      callToAction: 'Listen on iOS',
      icon: <FaApple className="text-2xl" />,
      url: `https://podcasts.apple.com/us/podcast/mani-plus/id1835622695`,
      bgGradient: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900',
      hoverEffect: 'hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Listen on Apple Podcasts for iOS and Mac users'
    },
    {
      name: 'Spotify',
      callToAction: 'Stream anywhere',
      icon: <FaSpotify className="text-2xl" />,
      url: `https://open.spotify.com/show/4ICpM5YIPlvPMM2FpOHAkJ`,
      bgGradient: 'bg-gradient-to-br from-green-600 to-green-800',
      hoverEffect: 'hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Stream on Spotify with millions of other listeners'
    },
    {
      name: 'YouTube',
      callToAction: 'Watch & listen',
      icon: <FaYoutube className="text-2xl" />,
      url: `https://www.youtube.com/@Mani-Plus`, // Replace with actual YouTube URL
      bgGradient: 'bg-gradient-to-br from-red-600 to-red-800',
      hoverEffect: 'hover:shadow-2xl hover:shadow-red-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Watch video episodes on YouTube'
    },
    {
      name: 'Prime Music',
      callToAction: 'Prime members',
      icon: <FaAmazon className="text-2xl" />,
      url: `https://music.amazon.co.uk/podcasts/0d545526-333f-4184-a5b9-3b8b0064a391/maniplus`,
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
      hoverEffect: 'hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Listen on Amazon Prime Music'
    },
    {
      name: 'Patreon',
      callToAction: 'Exclusive content',
      icon: <FaPatreon className="text-2xl" />,
      url: `https://www.patreon.com/c/ManiPlus`, // Replace with actual Patreon URL
      bgGradient: 'bg-gradient-to-br from-orange-500 to-red-600',
      hoverEffect: 'hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Support us on Patreon for exclusive content'
    },
    {
      name: 'RSS Feed',
      callToAction: 'Any podcast app',
      icon: <FaRss className="text-2xl" />,
      url: rssUrl,
      bgGradient: 'bg-gradient-to-br from-blue-600 to-blue-800',
      hoverEffect: 'hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Subscribe via RSS for any podcast app'
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
          className="group block"
          title={platform.description}
        >
          <div 
            className={`
              ${platform.bgGradient} 
              px-6 py-4
              rounded-2xl 
              transition-all 
              duration-300 
              ${platform.hoverEffect}
              border-2 
              border-white/10 
              hover:border-white/30
              cursor-pointer
              relative
              overflow-hidden
            `}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="flex items-center justify-center gap-3 relative z-10">
              <span className={`${platform.textColor} group-hover:animate-pulse`}>
                {platform.icon}
              </span>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className={`${platform.textColor} font-bold text-sm sm:text-base whitespace-nowrap`}>
                  {platform.name}
                </span>
                <span className={`${platform.textColor} text-xs opacity-90 whitespace-nowrap`}>
                  {platform.callToAction}
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
