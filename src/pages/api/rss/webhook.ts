import type { NextApiRequest, NextApiResponse } from 'next'

// Webhook endpoint for auto-updating RSS feeds when new episodes are published
// This can be triggered by your CMS, content management system, or publishing workflow

interface EpisodeData {
  id: string
  title: string
  description?: string
  duration?: string
  releaseDate?: string
  episodeNumber?: string
  slug?: string
  transcript?: string
  topics?: string[]
  keywords?: string[]
}

interface WebhookRequestBody {
  action: 'episode_published' | 'episode_updated' | 'episode_deleted'
  episode: EpisodeData
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify webhook signature or API key for security
    const authHeader = req.headers.authorization
    const expectedSecret = process.env.RSS_WEBHOOK_SECRET
    
    if (!authHeader || !expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { action, episode } = req.body as WebhookRequestBody

    switch (action) {
      case 'episode_published':
        // Handle new episode publication
        await handleEpisodePublished(episode)
        break
      
      case 'episode_updated':
        // Handle episode updates
        await handleEpisodeUpdated(episode)
        break
      
      case 'episode_deleted':
        // Handle episode deletion
        await handleEpisodeDeleted(episode.id)
        break
      
      default:
        return res.status(400).json({ error: 'Invalid action' })
    }

    // Trigger RSS feed regeneration
    await regenerateFeeds()

    // Optionally trigger sitemap regeneration
    await regenerateSitemaps()

    res.status(200).json({ 
      success: true, 
      message: 'RSS feeds updated successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('RSS webhook error:', error)
    res.status(500).json({ 
      error: 'Failed to update RSS feeds',
      timestamp: new Date().toISOString()
    })
  }
}

async function handleEpisodePublished(episode: EpisodeData) {
  // Logic to handle new episode publication
  console.log('New episode published:', episode.title)
  
  // You could:
  // 1. Save to database
  // 2. Send notifications
  // 3. Update search index
  // 4. Trigger social media posts
  // 5. Send to email subscribers
  
  // Example: Notify subscribers
  await notifySubscribers('new_episode', episode)
}

async function handleEpisodeUpdated(episode: EpisodeData) {
  // Logic to handle episode updates
  console.log('Episode updated:', episode.title)
  
  // Update cached data, search indexes, etc.
}

async function handleEpisodeDeleted(episodeId: string) {
  // Logic to handle episode deletion
  console.log('Episode deleted:', episodeId)
  
  // Clean up references, update archives, etc.
}

async function regenerateFeeds() {
  try {
    // Trigger feed regeneration by making requests to feed endpoints
    // This will cause them to rebuild with fresh data
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mani.plus'
    
    // Trigger RSS feed regeneration
    await fetch(`${baseUrl}/api/feed.xml`)
    await fetch(`${baseUrl}/api/atom.xml`)
    await fetch(`${baseUrl}/api/feed.json`)
    
    console.log('RSS feeds regenerated')
  } catch (error) {
    console.error('Failed to regenerate feeds:', error)
  }
}

async function regenerateSitemaps() {
  try {
    // Trigger sitemap regeneration
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mani.plus'
    await fetch(`${baseUrl}/server-sitemap.xml`)
    
    console.log('Sitemaps regenerated')
  } catch (error) {
    console.error('Failed to regenerate sitemaps:', error)
  }
}

async function notifySubscribers(type: string, episode: EpisodeData) {
  // Implement subscriber notification logic here
  // Could integrate with email services, push notifications, etc.
  
  try {
    // Example: Send to email service
    // await emailService.sendEpisodeNotification(episode)
    
    // Example: Send push notifications
    // await pushService.sendToSubscribers(episode)
    
    // Example: Post to social media
    // await socialMediaService.postNewEpisode(episode)
    
    console.log(`Notifications sent for: ${episode.title}`)
  } catch (error) {
    console.error('Failed to send notifications:', error)
  }
}
