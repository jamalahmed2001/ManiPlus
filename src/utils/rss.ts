import { Feed } from 'feed'
import { siteConfig, type Episode } from './seo'

interface PodcastRSSConfig {
  title: string
  description: string
  siteUrl: string
  feedUrl: string
  imageUrl: string
  language: string
  copyright: string
  author: string
  owner: {
    name: string
    email: string
  }
  category: string[]
  explicit: boolean
  type: 'episodic' | 'serial'
  complete?: boolean
}

interface JSONFeedItem {
  id: string
  title: string
  content_html?: string
  summary?: string
  url?: string
  date_published?: string
  [key: string]: unknown
}

interface JSONFeedStructure {
  version: string
  title: string
  description?: string
  home_page_url?: string
  feed_url?: string
  items: JSONFeedItem[]
  [key: string]: unknown
}

export const podcastConfig: PodcastRSSConfig = {
  title: siteConfig.siteName,
  description: siteConfig.description,
  siteUrl: siteConfig.siteUrl,
  feedUrl: `${siteConfig.siteUrl}/api/feed.xml`,
  imageUrl: `${siteConfig.siteUrl}/mani+logo.png`, // Using existing logo
  language: 'en-us',
  copyright: `© ${new Date().getFullYear()} ${siteConfig.siteName}. All rights reserved.`,
  author: siteConfig.author,
  owner: {
    name: siteConfig.author,
    email: 'hello@thebeatingedge.com' // Replace with actual email
  },
  category: [
    'Health & Fitness',
    'Medicine',
    'Health & Fitness:Alternative Health',
    'Society & Culture:Personal Journals',
    'Education:How To'
  ],
  explicit: false,
  type: 'episodic'
}

// Convert duration from "X minutes" to seconds or iTunes format
export const formatDuration = (duration: string): { seconds: number; formatted: string } => {
  const match = /(\d+)\s*minutes?/i.exec(duration)
  if (match?.[1]) {
    const minutes = parseInt(match[1])
    const seconds = minutes * 60
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    return {
      seconds,
      formatted: hours > 0 ? `${hours}:${remainingMinutes.toString().padStart(2, '0')}:00` : `${minutes}:00`
    }
  }
  
  return { seconds: 0, formatted: '0:00' }
}

// Convert release date to RFC 2822 format
export const formatRSSDate = (dateString: string): string => {
  // Parse "January 15, 2024" format
  const date = new Date(dateString)
  return date.toUTCString()
}

// Create a properly configured Feed instance
export const createFeedInstance = (): Feed => {
  return new Feed({
    title: podcastConfig.title,
    description: podcastConfig.description,
    id: podcastConfig.siteUrl,
    link: podcastConfig.siteUrl,
    language: podcastConfig.language,
    image: podcastConfig.imageUrl,
    favicon: `${podcastConfig.siteUrl}/favicon.ico`,
    copyright: podcastConfig.copyright,
    updated: new Date(),
    generator: 'ManiPlus Podcast Feed Generator (powered by Feed library)',
    feedLinks: {
      rss2: podcastConfig.feedUrl,
      atom: `${podcastConfig.siteUrl}/api/atom.xml`,
      json: `${podcastConfig.siteUrl}/api/feed.json`
    },
    author: {
      name: podcastConfig.author,
      email: podcastConfig.owner.email,
      link: podcastConfig.siteUrl
    }
  })
}

// Generate RSS 2.0 feed using Feed library
export const generateRSSFeed = (episodes: Episode[]): string => {
  const feed = createFeedInstance()
  
  // Add episodes to feed
  episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .forEach((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      const { seconds } = formatDuration(episode.duration)
      
      feed.addItem({
        title: `${episode.episodeNumber}: ${episode.title}`,
        id: episodeUrl,
        link: episodeUrl,
        description: episode.description,
        content: `
          <p>${episode.description}</p>
          ${episode.transcript ? `<p><a href="${episodeUrl}/transcript">Read full transcript</a></p>` : ''}
          <p><strong>Duration:</strong> ${episode.duration}</p>
          <p><strong>Episode:</strong> ${episode.episodeNumber}</p>
          ${episode.topics?.length ? `<p><strong>Topics:</strong> ${episode.topics.join(', ')}</p>` : ''}
          ${episode.keywords?.length ? `<p><strong>Keywords:</strong> ${episode.keywords.join(', ')}</p>` : ''}
          <hr/>
          <p><strong>Listen to more episodes:</strong> <a href="${siteConfig.siteUrl}">${siteConfig.siteName}</a></p>
        `,
        author: [{
          name: podcastConfig.author,
          email: podcastConfig.owner.email,
          link: podcastConfig.siteUrl
        }],
        date: new Date(episode.releaseDate),
        image: podcastConfig.imageUrl,
        // Add custom extensions for podcasting
        extensions: [{
          name: '_itunes',
          objects: {
            duration: seconds,
            episode: parseInt(episode.episodeNumber.replace(/\D/g, '')),
            episodeType: 'full',
            explicit: 'no'
          }
        }]
      })
      
      // Add categories
      episode.topics?.forEach(topic => {
        feed.addCategory(topic)
      })
    })
  
  return feed.rss2()
}

// Generate Atom 1.0 feed using Feed library
export const generateAtomFeed = (episodes: Episode[]): string => {
  const feed = createFeedInstance()
  
  // Add episodes to feed
  episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .forEach((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      
      feed.addItem({
        title: `${episode.episodeNumber}: ${episode.title}`,
        id: episodeUrl,
        link: episodeUrl,
        description: episode.description,
        content: `
          <p>${episode.description}</p>
          ${episode.transcript ? `<p><a href="${episodeUrl}/transcript">Read full transcript</a></p>` : ''}
          <p><strong>Duration:</strong> ${episode.duration}</p>
          <p><strong>Episode:</strong> ${episode.episodeNumber}</p>
          ${episode.topics?.length ? `<p><strong>Topics:</strong> ${episode.topics.join(', ')}</p>` : ''}
        `,
        author: [{
          name: podcastConfig.author,
          email: podcastConfig.owner.email,
          link: podcastConfig.siteUrl
        }],
        date: new Date(episode.releaseDate),
        image: podcastConfig.imageUrl
      })
      
      // Add categories
      episode.topics?.forEach(topic => {
        feed.addCategory(topic)
      })
    })
  
  return feed.atom1()
}

// Generate JSON Feed 1.1 using Feed library
export const generateJSONFeed = (episodes: Episode[]): JSONFeedStructure => {
  const feed = createFeedInstance()
  
  // Add episodes to feed
  episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .forEach((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      
      feed.addItem({
        title: `${episode.episodeNumber}: ${episode.title}`,
        id: episodeUrl,
        link: episodeUrl,
        description: episode.description,
        content: `
          <p>${episode.description}</p>
          ${episode.transcript ? `<p><a href="${episodeUrl}/transcript">Read full transcript</a></p>` : ''}
          <p><strong>Duration:</strong> ${episode.duration}</p>
          <p><strong>Episode:</strong> ${episode.episodeNumber}</p>
          ${episode.topics?.length ? `<p><strong>Topics:</strong> ${episode.topics.join(', ')}</p>` : ''}
        `,
        author: [{
          name: podcastConfig.author,
          email: podcastConfig.owner.email,
          link: podcastConfig.siteUrl
        }],
        date: new Date(episode.releaseDate),
        image: podcastConfig.imageUrl
      })
      
      // Add categories
      episode.topics?.forEach(topic => {
        feed.addCategory(topic)
      })
    })
  
  return JSON.parse(feed.json1()) as JSONFeedStructure
}
