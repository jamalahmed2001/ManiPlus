import type { Episode } from '@/utils/seo'

interface ParsedRSSFeed {
  title: string
  description: string
  episodes: Episode[]
  lastBuildDate: string
}

/**
 * Fetches and parses the Anchor RSS feed
 * Returns structured episode data compatible with the site
 */
export async function fetchRSSFeed(): Promise<ParsedRSSFeed> {
  const RSS_URL = 'https://anchor.fm/s/108b17084/podcast/rss'
  
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }
    
    const xmlText = await response.text()
    const episodes = parseRSSToEpisodes(xmlText)
    
    // Extract feed metadata
    const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/
    const descRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/
    const lastBuildRegex = /<lastBuildDate>(.*?)<\/lastBuildDate>/
    
    const titleMatch = titleRegex.exec(xmlText)
    const descMatch = descRegex.exec(xmlText)
    const lastBuildMatch = lastBuildRegex.exec(xmlText)
    
    return {
      title: titleMatch?.[1] ?? 'Mani.Plus',
      description: descMatch?.[1] ?? 'Resilience, medicine, innovation and human spirit in healthcare.',
      episodes,
      lastBuildDate: lastBuildMatch?.[1] ?? new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    throw error
  }
}

/**
 * Sort episodes by release date (newest first)
 */
export function sortEpisodesByDate(episodes: Episode[]): Episode[] {
  return [...episodes].sort((a, b) => {
    const dateA = new Date(a.releaseDate).getTime()
    const dateB = new Date(b.releaseDate).getTime()
    return dateB - dateA // Newest first
  })
}

/**
 * Parses RSS XML into Episode objects
 */
function parseRSSToEpisodes(xmlText: string): Episode[] {
  const episodes: Episode[] = []
  
  // Extract all <item> blocks
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1]
    
    if (!itemXml) continue
    
    try {
      // Extract episode data using regex
      const title = extractCDATA(itemXml, 'title')
      const description = extractCDATA(itemXml, 'description')
      const guid = extractTag(itemXml, 'guid')
      const pubDate = extractTag(itemXml, 'pubDate')
      
      // iTunes specific tags
      const duration = extractTag(itemXml, 'itunes:duration')
      const episodeNum = extractTag(itemXml, 'itunes:episode')
      
      // Enclosure (audio file)
      const enclosureRegex = /<enclosure\s+url="(.*?)"\s+length=".*?"\s+type=".*?"/
      const enclosureMatch = enclosureRegex.exec(itemXml)
      const audioUrl = enclosureMatch?.[1] ?? ''
      
      if (!title) continue
      
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 60)
      
      // Extract topics from description (simple keyword extraction)
      const topics = extractTopics(description, title)
      
      // Extract episode number from title as fallback/verification (e.g., "Episode 7 - Title" -> "7")
      const titleEpisodeMatch = /Episode\s+(\d+)/i.exec(title)
      const titleEpisodeNum = titleEpisodeMatch?.[1]
      
      // Use title episode number if RSS metadata is missing or mismatched
      const verifiedEpisodeNum = episodeNum ?? titleEpisodeNum ?? String(episodes.length + 1)
      
      // Format episode number properly
      const formattedEpisodeNum = `EP ${verifiedEpisodeNum.padStart(3, '0')}`
      
      episodes.push({
        id: guid ?? `episode-${verifiedEpisodeNum}`,
        title,
        description: cleanDescription(description),
        duration: duration || 'Unknown',
        releaseDate: formatDate(pubDate),
        episodeNumber: formattedEpisodeNum,
        slug,
        topics,
        keywords: topics,
        audioUrl
      })
    } catch (error) {
      console.error('Error parsing episode:', error)
      continue
    }
  }
  
  return episodes
}

/**
 * Extract CDATA content from XML tag
 */
function extractCDATA(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}><!\\[CDATA\\[(.*?)\\]\\]><\/${tagName}>`, 's')
  const match = xml.match(regex)
  return match?.[1]?.trim() ?? ''
}

/**
 * Extract plain text content from XML tag
 */
function extractTag(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 's')
  const match = xml.match(regex)
  return match?.[1]?.trim() ?? ''
}

/**
 * Clean HTML and excessive whitespace from description
 */
function cleanDescription(html: string): string {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, ' ')
  // Decode common HTML entities
  text = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim()
  // Limit length for descriptions
  if (text.length > 500) {
    text = text.substring(0, 497) + '...'
  }
  return text
}

/**
 * Format RSS date to readable format
 */
function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown date'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

/**
 * Extract relevant topics from description and title
 */
function extractTopics(description: string, title: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  const topics: string[] = []
  
  // Healthcare-related keywords
  const keywords = [
    'resilience',
    'medicine',
    'healthcare',
    'heart',
    'transplant',
    'surgery',
    'recovery',
    'patient',
    'doctor',
    'medical',
    'health',
    'innovation',
    'burnout',
    'healing',
    'mentors',
    'guides',
    'experts',
    'survival',
    'hope',
    'faith',
    'courage',
    'cardiologist',
    'surgeon'
  ]
  
  keywords.forEach(keyword => {
    if (text.includes(keyword) && !topics.includes(keyword)) {
      topics.push(keyword)
    }
  })
  
  return topics.slice(0, 8) // Limit to 8 topics
}

