import { getServerSideSitemapLegacy } from 'next-sitemap'
import type { GetServerSideProps } from 'next'
import { fetchRSSFeed } from '@/utils/rss-fetcher'
import { siteConfig } from '@/utils/seo'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = siteConfig.siteUrl
  const now = new Date().toISOString()
  
  // Fetch real episodes from RSS feed
  let episodes: Array<{
    id: string
    title: string
    slug: string
    releaseDate: string
    episodeNumber: string
  }> = []
  
  try {
    const feedData = await fetchRSSFeed()
    episodes = feedData.episodes.map(episode => ({
      id: episode.id,
      title: episode.title,
      slug: episode.slug ?? episode.id,
      releaseDate: episode.releaseDate,
      episodeNumber: episode.episodeNumber
    }))
  } catch (error) {
    console.error('Error fetching episodes for sitemap:', error)
    // Continue with empty episodes array - static pages will still be included
  }

  // Single source of truth - all pages in one sitemap
  const fields = [
    // Homepage - highest priority
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: 'daily' as const,
      priority: 1.0
    },
    
    // Story page - high priority for personal branding
    {
      loc: `${baseUrl}/story`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.9
    },
    
    // Episodes listing page - high priority for podcast SEO
    {
      loc: `${baseUrl}/episodes`,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 0.9
    },
    
    // Dynamic episode pages - highest priority for podcast SEO
    ...episodes.map(episode => {
      // Parse release date for accurate lastmod
      let lastmod = now
      try {
        const releaseDate = new Date(episode.releaseDate)
        if (!isNaN(releaseDate.getTime())) {
          lastmod = releaseDate.toISOString()
        }
      } catch {
        // Use current date if parsing fails
      }

      return {
        loc: `${baseUrl}/episodes/${episode.slug}`,
        lastmod,
        changefreq: 'weekly' as const,
        priority: 0.9
      }
    }),
    
    // Charity page - important for engagement
    {
      loc: `${baseUrl}/charity`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.8
    },
    
    // Subscribe section (anchor on homepage)
    {
      loc: `${baseUrl}/#subscribe`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.8
    },
    
    // Contact page
    {
      loc: `${baseUrl}/contact`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    
    // Privacy page - low priority but necessary
    {
      loc: `${baseUrl}/privacy`,
      lastmod: now,
      changefreq: 'yearly' as const,
      priority: 0.3
    }
  ]

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null
}





