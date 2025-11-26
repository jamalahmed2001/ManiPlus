import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchRSSFeed } from '@/utils/rss-fetcher'
import type { Episode } from '@/utils/seo'

interface EpisodesResponse {
  episodes: Episode[]
  feedTitle: string
  feedDescription: string
  lastUpdated: string
  error?: string
}

/**
 * API endpoint that fetches and returns episodes from the RSS feed
 * Implements caching to avoid excessive requests to Anchor
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EpisodesResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      episodes: [],
      feedTitle: '',
      feedDescription: '',
      lastUpdated: '',
      error: 'Method not allowed'
    })
    return
  }

  try {
    const feedData = await fetchRSSFeed()
    
    // Set cache headers (cache for 1 hour)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
    
    res.status(200).json({
      episodes: feedData.episodes,
      feedTitle: feedData.title,
      feedDescription: feedData.description,
      lastUpdated: feedData.lastBuildDate
    })
  } catch (error) {
    console.error('Error in episodes API:', error)
    
    // Return error but with fallback data
    res.status(500).json({
      episodes: [],
      feedTitle: 'Mani.Plus',
      feedDescription: 'Resilience, medicine, innovation and human spirit in healthcare.',
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch episodes from RSS feed'
    })
  }
}

