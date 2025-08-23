import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRSSFeed, generateAtomFeed, generateJSONFeed } from '@/utils/rss'
import type { Episode } from '@/utils/seo'

// API endpoint to validate and preview RSS feeds before publishing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get sample episodes for validation
    const sampleEpisodes: Episode[] = [
      {
        id: '1',
        title: 'Sample Episode for Validation',
        description: 'This is a sample episode used for feed validation and testing purposes.',
        duration: '30 minutes',
        releaseDate: 'January 1, 2024',
        episodeNumber: 'EP 001',
        slug: 'sample-episode-validation',
        topics: ['testing', 'validation'],
        keywords: ['rss', 'feed', 'podcast', 'validation']
      }
    ]

    const feedType = req.query.type as string || 'rss'
    const format = req.query.format as string || 'xml'

    let feedContent: string | object
    let contentType: string

    switch (feedType) {
      case 'rss':
        feedContent = generateRSSFeed(sampleEpisodes)
        contentType = 'application/rss+xml'
        break
      
      case 'atom':
        feedContent = generateAtomFeed(sampleEpisodes)
        contentType = 'application/atom+xml'
        break
      
      case 'json':
        feedContent = generateJSONFeed(sampleEpisodes)
        contentType = 'application/json'
        break
      
      default:
        return res.status(400).json({ error: 'Invalid feed type. Use: rss, atom, or json' })
    }

    // Validation results
    const validation = {
      feedType,
      isValid: true,
      warnings: [] as string[],
      recommendations: [] as string[],
      timestamp: new Date().toISOString()
    }

    // Basic validation checks
    if (feedType === 'rss' && typeof feedContent === 'string') {
      if (!feedContent.includes('<rss version="2.0"')) {
        validation.isValid = false
        validation.warnings.push('Missing RSS version declaration')
      }
      
      if (!feedContent.includes('<itunes:')) {
        validation.warnings.push('Missing iTunes-specific tags for better podcast distribution')
      }
      
      if (!feedContent.includes('xmlns:googleplay')) {
        validation.recommendations.push('Consider adding Google Podcasts namespace for better compatibility')
      }
    }

    if (format === 'json') {
      res.status(200).json({
        validation,
        preview: typeof feedContent === 'string' ? feedContent.substring(0, 1000) + '...' : feedContent
      })
    } else {
      res.setHeader('Content-Type', contentType)
      res.status(200).send(feedContent)
    }

  } catch (error) {
    console.error('Feed validation error:', error)
    res.status(500).json({ 
      error: 'Failed to validate feed',
      timestamp: new Date().toISOString()
    })
  }
}
