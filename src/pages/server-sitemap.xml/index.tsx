import { getServerSideSitemapLegacy } from 'next-sitemap'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // This would typically fetch from your CMS, database, or API
  // For now, we'll create dynamic entries for episodes and other content
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebeatingedge.com'
  
  // Sample episodes - replace with actual data fetching
  const episodes = [
    {
      id: '1',
      title: 'The Day Everything Changed',
      slug: 'the-day-everything-changed',
      releaseDate: '2024-01-15'
    },
    {
      id: '2', 
      title: 'Dr. Sarah Chen on Breakthrough Immunosuppression',
      slug: 'dr-sarah-chen-immunosuppression',
      releaseDate: '2024-01-22'
    },
    {
      id: '3',
      title: "Maria's Marathon - Running with a New Heart",
      slug: 'marias-marathon-new-heart',
      releaseDate: '2024-01-29'
    }
  ]

  const fields = [
    // Dynamic episode pages
    ...episodes.map(episode => ({
      loc: `${baseUrl}/episodes/${episode.slug}`,
      lastmod: new Date(episode.releaseDate).toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.9
    })),
    
    // Other dynamic content
    {
      loc: `${baseUrl}/episodes`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}/subscribe`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}/newsletter`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.6
    }
  ]

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null
}
