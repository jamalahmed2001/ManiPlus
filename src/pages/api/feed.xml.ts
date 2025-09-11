import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRSSFeed } from '@/utils/rss'
import { episodes } from '@/data/episodes'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set caching headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('X-Robots-Tag', 'noindex, follow')
    
    // Only include the first episode (Mani+.mp3) in RSS feed
    const rssEpisodes = episodes.filter(episode => episode.id === '1')
    const rssFeed = generateRSSFeed(rssEpisodes)
    
    res.status(200).send(rssFeed)
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    res.status(500).json({ error: 'Failed to generate RSS feed' })
  }
}
