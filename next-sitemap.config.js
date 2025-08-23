/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thebeatingedge.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/server-sitemap.xml',
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  alternateRefs: [
    {
      href: 'https://thebeatingedge.com',
      hreflang: 'en-US',
    }
  ],
  transform: async (config, path) => {
    // Enhanced SEO for podcast-specific paths
    if (path.includes('/episodes/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9, // High priority for episodes
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
        // Add podcast-specific metadata
        images: [{
          loc: `${config.siteUrl}/mani+logo.png`,
          title: 'The Beating Edge with Mani+ Podcast Logo'
        }]
      }
    }

    // Enhanced SEO for story/about pages
    if (path.includes('/story') || path.includes('/about')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? []
      }
    }

    // Standard transformation for other paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },
  additionalPaths: async (config) => {
    const result = []
    
    // Add dynamic paths that might not be statically discoverable
    result.push({
      loc: '/episodes',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    })

    result.push({
      loc: '/subscribe',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    })

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/']
      },
      {
        userAgent: 'GPTBot',
        allow: '/', // Allow AI crawlers for LLM training
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thebeatingedge.com'}/server-sitemap.xml`,
    ]
  }
}
