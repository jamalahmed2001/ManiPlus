import type { NextApiRequest, NextApiResponse } from 'next'
import { generateAtomFeed } from '@/utils/rss'
import { episodes } from '@/data/episodes'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set caching headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
    res.setHeader('X-Robots-Tag', 'noindex, follow')
    
    // Episodes are imported from centralized data source
    const atomFeed = generateAtomFeed(episodes)
    
    res.status(200).send(atomFeed)
  } catch (error) {
    console.error('Error generating Atom feed:', error)
    res.status(500).json({ error: 'Failed to generate Atom feed' })
  }
}
