import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJSONFeed } from '@/utils/rss'
import { episodes } from '@/data/episodes'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set caching headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/feed+json; charset=utf-8')
    res.setHeader('X-Robots-Tag', 'noindex, follow')
    
    // Episodes are imported from centralized data source
    const jsonFeed = generateJSONFeed(episodes)
    
    res.status(200).json(jsonFeed)
  } catch (error) {
    console.error('Error generating JSON feed:', error)
    res.status(500).json({ error: 'Failed to generate JSON feed' })
  }
}
