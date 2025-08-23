import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJSONFeed } from '@/utils/rss'
import type { Episode } from '@/utils/seo'

// This would typically come from your database or CMS
const getEpisodes = (): Episode[] => {
  return [
    {
      id: '1',
      title: 'The Day Everything Changed',
      description: 'Mani+ opens up about his journey from diagnosis to heart transplant, sharing the raw emotions, unexpected challenges, and profound gratitude that shaped his perspective on life and medicine.',
      duration: '45 minutes',
      releaseDate: 'January 15, 2024',
      episodeNumber: 'EP 001',
      slug: 'the-day-everything-changed',
      topics: ['heart transplant', 'diagnosis', 'patient journey', 'medical transformation'],
      keywords: ['heart failure', 'transplant surgery', 'medical recovery', 'patient story']
    },
    {
      id: '2', 
      title: 'Dr. Sarah Chen on Breakthrough Immunosuppression',
      description: 'Leading transplant immunologist Dr. Sarah Chen discusses revolutionary new protocols that are reducing rejection rates while minimizing long-term medication side effects, offering hope for better patient outcomes.',
      duration: '52 minutes',
      releaseDate: 'January 22, 2024',
      episodeNumber: 'EP 002',
      slug: 'dr-sarah-chen-immunosuppression',
      topics: ['immunosuppression', 'transplant medicine', 'medical research', 'rejection prevention'],
      keywords: ['immunology', 'transplant drugs', 'medical innovation', 'organ rejection']
    },
    {
      id: '3',
      title: "Maria's Marathon - Running with a New Heart", 
      description: 'Heart transplant recipient Maria Torres shares her incredible journey from ICU to completing her first marathon just 18 months post-transplant, proving that limitation is often just a state of mind.',
      duration: '38 minutes',
      releaseDate: 'January 29, 2024', 
      episodeNumber: 'EP 003',
      slug: 'marias-marathon-new-heart',
      topics: ['recovery', 'marathon', 'athletic achievement', 'inspiration'],
      keywords: ['heart transplant recovery', 'post-transplant exercise', 'athletic inspiration', 'medical recovery']
    }
  ]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set caching headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/feed+json; charset=utf-8')
    res.setHeader('X-Robots-Tag', 'noindex, follow')
    
    const episodes = getEpisodes()
    const jsonFeed = generateJSONFeed(episodes)
    
    res.status(200).json(jsonFeed)
  } catch (error) {
    console.error('Error generating JSON feed:', error)
    res.status(500).json({ error: 'Failed to generate JSON feed' })
  }
}
