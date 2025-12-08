/**
 * @typedef {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'} Changefreq
 */

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mani.plus',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Disable static sitemap generation - using unified dynamic sitemap
  sitemapSize: 7000,
  changefreq: /** @type {Changefreq} */ ('daily'),
  priority: 0.7,
  exclude: [
    '/sitemap.xml', // Exclude dynamic sitemap from static generation
    '/server-sitemap.xml', // Legacy - can be removed after migration
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  alternateRefs: [
    {
      href: 'https://mani.plus',
      hreflang: 'en-US',
    }
  ],
  transform: async (config, path) => {
    const now = new Date().toISOString()
    
    // Homepage - highest priority
    if (path === '/' || path === '') {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('daily'),
        priority: 1.0,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? [],
        images: [{
          loc: new URL(`${config.siteUrl}/mani+logo.png`),
          title: 'The Beating Edge with Mani+ - Healthcare Resilience Podcast',
          caption: 'Resilience, medicine, innovation, and the human spirit in healthcare'
        }]
      }
    }

    // Episode pages - high priority for SEO
    if (path.includes('/episodes/')) {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('weekly'),
        priority: 0.9,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? [],
        images: [{
          loc: new URL(`${config.siteUrl}/mani+logo.png`),
          title: 'The Beating Edge with Mani+ Podcast Episode'
        }]
      }
    }

    // Story page - high priority for personal branding
    if (path.includes('/story')) {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('monthly'),
        priority: 0.9,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? [],
        images: [{
          loc: new URL(`${config.siteUrl}/mani+logo.png`),
          title: "Mani+'s Healthcare Journey - Heart Transplant & Dialysis Story"
        }]
      }
    }

    // Charity page - important for engagement
    if (path.includes('/charity')) {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('monthly'),
        priority: 0.8,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? []
      }
    }

    // Contact page
    if (path.includes('/contact')) {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('monthly'),
        priority: 0.7,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? []
      }
    }

    // Privacy page - low priority but necessary
    if (path.includes('/privacy')) {
      return {
        loc: path,
        changefreq: /** @type {Changefreq} */ ('yearly'),
        priority: 0.3,
        lastmod: now,
        alternateRefs: config.alternateRefs ?? []
      }
    }

    // Standard transformation for other paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: now,
      alternateRefs: config.alternateRefs ?? []
    }
  },
  // No additional paths - everything is handled by the unified sitemap.xml.tsx
  additionalPaths: async () => {
    return []
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/404', '/500']
      },
      {
        userAgent: 'GPTBot',
        allow: '/', // Allow AI crawlers for LLM training and better discoverability
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
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Sogou',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Exabot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'facebot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'ia_archiver',
        allow: '/',
        crawlDelay: 0
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mani.plus'}/sitemap.xml`
    ]
  }
}
