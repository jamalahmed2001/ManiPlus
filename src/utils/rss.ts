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
    'Health & Fitness:Medicine',
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

// Get file size for podcast enclosures
export const getFileSize = (audioUrl: string): number => {
  const fileSizes: Record<string, number> = {
    '/podcasts/Mani+.mp3': 15135552,
    '/podcasts/mani+2.mp3': 7879896, 
    '/podcasts/Mani+3.mp3': 6046664
  }
  return fileSizes[audioUrl] ?? 0
}

// Get MIME type from audio URL
export const getMimeType = (audioUrl: string): string => {
  if (audioUrl.endsWith('.mp3')) return 'audio/mpeg'
  if (audioUrl.endsWith('.m4a')) return 'audio/x-m4a'
  if (audioUrl.endsWith('.wav')) return 'audio/wav'
  if (audioUrl.endsWith('.ogg')) return 'audio/ogg'
  return 'audio/mpeg' // Default
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

// Generate enhanced RSS 2.0 feed for podcast platforms
export const generateRSSFeed = (episodes: Episode[]): string => {
  const feed = createFeedInstance()
  
  // Add episodes to feed
  episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .forEach((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      // Duration formatting handled elsewhere in the function
      
      // Prepare enclosure data for podcast
      let enclosure = undefined
      if (episode.audioUrl) {
        const audioUrl = `${siteConfig.siteUrl}${episode.audioUrl}`
        const fileSize = getFileSize(episode.audioUrl)
        const mimeType = getMimeType(episode.audioUrl)
        
        enclosure = {
          url: audioUrl,
          type: mimeType,
          length: fileSize
        }
      }
      
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
        // Don't include image here as it conflicts with enclosure
        enclosure
      })
      
      // Add categories
      episode.topics?.forEach(topic => {
        feed.addCategory(topic)
      })
    })
  
  // Post-process RSS to add iTunes namespace and tags
  let rssContent = feed.rss2()
  
  // Add iTunes namespace to RSS tag
  rssContent = rssContent.replace(
    '<rss version="2.0"',
    '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"'
  )
  
  // Add iTunes channel-level metadata after the <copyright> tag
  const iTunesChannelTags = `
    <itunes:author>${podcastConfig.author}</itunes:author>
    <itunes:summary>${podcastConfig.description}</itunes:summary>
    <itunes:type>${podcastConfig.type}</itunes:type>
    <itunes:owner>
        <itunes:name>${podcastConfig.owner.name}</itunes:name>
        <itunes:email>${podcastConfig.owner.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${podcastConfig.imageUrl}"/>
    <itunes:category text="${podcastConfig.category[0]}">
        <itunes:category text="${podcastConfig.category[1]?.split(':')[1] ?? 'Medicine'}"/>
    </itunes:category>
    <itunes:explicit>${podcastConfig.explicit ? 'yes' : 'no'}</itunes:explicit>
    <itunes:keywords>resilience, medicine, innovation, human spirit, healthcare, heart transplant, dialysis, patient stories, medical podcast</itunes:keywords>`
  
  rssContent = rssContent.replace(
    /<\/copyright>/,
    `</copyright>${iTunesChannelTags}`
  )
  
  // Fix enclosures and add iTunes episode-level metadata
  episodes.forEach((episode) => {
    const { formatted } = formatDuration(episode.duration)
    const episodeNumber = parseInt(episode.episodeNumber.replace(/\D/g, ''))
    
    const iTunesItemTags = `
        <itunes:duration>${formatted}</itunes:duration>
        <itunes:episode>${episodeNumber}</itunes:episode>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:explicit>no</itunes:explicit>
        <itunes:summary>${episode.description}</itunes:summary>`
    
    // Find the item with matching title and replace enclosure + add iTunes tags
    if (episode.audioUrl) {
      const audioUrl = `${siteConfig.siteUrl}${episode.audioUrl}`
      const fileSize = getFileSize(episode.audioUrl)
      const mimeType = getMimeType(episode.audioUrl)
      
      const correctEnclosure = `<enclosure url="${audioUrl}" length="${fileSize}" type="${mimeType}"/>`
      
      const itemPattern = new RegExp(
        `(<title><\\!\\[CDATA\\[${episode.episodeNumber}: ${episode.title}\\]\\]><\\/title>[\\s\\S]*?)<enclosure[^>]*\\/>([\\s\\S]*?)<\\/item>`,
        'g'
      )
      rssContent = rssContent.replace(itemPattern, `$1${correctEnclosure}$2${iTunesItemTags}\n        </item>`)
    }
  })
  
  return rssContent
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
