import type { NextSeoProps, ArticleJsonLdProps } from 'next-seo'

// Base site configuration
export const siteConfig = {
  siteName: 'The Beating Edge with Mani+',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebeatingedge.com',
  description: 'Raw, honest conversations about life after heart transplant, kidney failure, and the resilience of the human spirit. Join Mani+, a heart transplant recipient and dialysis patient, for powerful conversations with doctors, researchers, and fellow patients.',
  author: 'Mani+',
  twitter: '@thebeatingedge',
  locale: 'en_US',
  defaultImage: '/mani+logo.png',
  keywords: [
    'heart transplant podcast',
    'dialysis stories', 
    'medical podcast',
    'healthcare stories',
    'patient advocacy',
    'transplant recipient',
    'chronic illness',
    'medical innovation',
    'healthcare professionals',
    'patient journey',
    'organ transplant',
    'kidney failure',
    'medical research',
    'health podcast',
    'medical storytelling',
    'patient experience',
    'healthcare insights',
    'medical community',
    'health advocacy',
    'medical resilience'
  ]
}

// Episode interface for type safety
export interface Episode {
  id: string
  title: string
  description: string
  duration: string
  releaseDate: string
  episodeNumber: string
  slug?: string
  transcript?: string
  guests?: string[]
  topics?: string[]
  keywords?: string[]
}

// Generate comprehensive SEO for homepage
export const generateHomepageSEO = (): NextSeoProps => {
  return {
    title: `${siteConfig.siteName} | Transformative Healthcare Stories & Medical Insights`,
    description: siteConfig.description,
    canonical: siteConfig.siteUrl,
    languageAlternates: [
      {
        hrefLang: 'en-US',
        href: siteConfig.siteUrl
      }
    ],
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.siteUrl,
      siteName: siteConfig.siteName,
      title: `${siteConfig.siteName} | Healthcare Stories That Transform Lives`,
      description: 'The conversations that happen in hospital rooms, dialysis chairs, and the quiet moments when everything changes. Where medicine meets the stories we don\'t always tell.',
      images: [
        {
          url: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.siteName} Logo`,
          type: 'image/png'
        },
        {
          url: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
          width: 800,
          height: 600,
          alt: `${siteConfig.siteName} Logo`,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      handle: siteConfig.twitter,
      site: siteConfig.twitter,
      cardType: 'summary_large_image'
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'theme-color',
        content: '#000000'
      },
      {
        name: 'author',
        content: siteConfig.author
      },
      {
        name: 'publisher',
        content: siteConfig.siteName
      },
      {
        name: 'application-name',
        content: siteConfig.siteName
      },
      {
        name: 'apple-mobile-web-app-title',
        content: siteConfig.siteName
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      },
      {
        name: 'msapplication-tap-highlight',
        content: 'no'
      },
      // LLM optimization meta tags
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      },
      {
        property: 'article:publisher',
        content: siteConfig.siteUrl
      },
      {
        property: 'og:updated_time',
        content: new Date().toISOString()
      }
    ],
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        href: '/mani+logo.png',
        sizes: '180x180'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        href: `${siteConfig.siteUrl}/api/feed.xml`
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: `${siteConfig.siteUrl}/api/atom.xml`
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
      }
    ]
  }
}

// Generate SEO for individual episodes
export const generateEpisodeSEO = (episode: Episode): NextSeoProps => {
  const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
  const imageUrl = `${siteConfig.siteUrl}${siteConfig.defaultImage}`
  
  // Enhanced description with keywords
  const enhancedDescription = `${episode.description} ${episode.topics?.join(', ') ?? ''}`
  
  // Generate keywords from episode content
  const episodeKeywords = [
    ...siteConfig.keywords,
    ...(episode.topics ?? []),
    ...(episode.keywords ?? []),
    episode.title.toLowerCase(),
    `episode ${episode.episodeNumber}`,
    'podcast episode',
    'healthcare story'
  ]

  return {
    title: `${episode.episodeNumber}: ${episode.title} | ${siteConfig.siteName}`,
    description: enhancedDescription,
    canonical: episodeUrl,
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url: episodeUrl,
      siteName: siteConfig.siteName,
      title: `${episode.episodeNumber}: ${episode.title}`,
      description: episode.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${episode.title} - ${siteConfig.siteName}`,
          type: 'image/png'
        }
      ],
      article: {
        publishedTime: new Date(episode.releaseDate).toISOString(),
        modifiedTime: new Date().toISOString(),
        authors: [siteConfig.author],
        section: 'Healthcare Podcast',
        tags: episodeKeywords
      }
    },
    twitter: {
      handle: siteConfig.twitter,
      site: siteConfig.twitter,
      cardType: 'summary_large_image'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: episodeKeywords.join(', ')
      },
      {
        name: 'author',
        content: siteConfig.author
      },
      {
        name: 'podcast:episode',
        content: episode.episodeNumber
      },
      {
        name: 'podcast:duration',
        content: episode.duration
      },
      {
        property: 'audio:duration',
        content: episode.duration
      },
      {
        property: 'video:duration',
        content: episode.duration
      },
      // LLM-specific optimization
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      },
      {
        property: 'article:content_tier',
        content: 'free'
      },
      {
        property: 'article:accessible_for_free',
        content: 'true'
      }
    ]
  }
}

// Generate SEO for story/about pages
export const generateStoryPageSEO = (): NextSeoProps => {
  const pageUrl = `${siteConfig.siteUrl}/story`
  
  return {
    title: `Mani+'s Story | ${siteConfig.siteName}`,
    description: 'The personal journey of Mani+, a heart transplant recipient and dialysis patient, sharing his story of resilience, medical challenges, and the human spirit in healthcare.',
    canonical: pageUrl,
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.siteName,
      title: `Mani+'s Story - A Journey Through Heart Transplant and Dialysis`,
      description: 'From heart failure to transplant recipient to dialysis patient - the raw, honest story of resilience and hope in the face of medical challenges.',
      images: [
        {
          url: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: `Mani+'s Story - ${siteConfig.siteName}`,
          type: 'image/png'
        }
      ],
      article: {
        authors: [siteConfig.author],
        section: 'Personal Story',
        tags: ['heart transplant', 'dialysis', 'patient story', 'medical journey', 'resilience', 'healthcare experience']
      }
    },
    twitter: {
      handle: siteConfig.twitter,
      site: siteConfig.twitter,
      cardType: 'summary_large_image'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'heart transplant story, dialysis patient experience, medical journey, patient advocacy, healthcare resilience, transplant recipient, chronic illness story'
      },
      {
        name: 'author',
        content: siteConfig.author
      },
      {
        property: 'article:accessible_for_free',
        content: 'true'
      }
    ]
  }
}

// Generate enhanced Article JSON-LD for episodes
export const generateEpisodeArticleJsonLd = (episode: Episode): ArticleJsonLdProps => {
  return {
    url: `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`,
    title: `${episode.episodeNumber}: ${episode.title}`,
    images: [`${siteConfig.siteUrl}${siteConfig.defaultImage}`],
    datePublished: new Date(episode.releaseDate).toISOString(),
    dateModified: new Date().toISOString(),
    authorName: [{
      name: siteConfig.author,
      url: siteConfig.siteUrl
    }],
    publisherName: siteConfig.siteName,
    publisherLogo: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    description: episode.description,
    isAccessibleForFree: true,
    useAppDir: false
  }
}

// Utility function to extract keywords from content
export const extractKeywords = (content: string, additionalKeywords: string[] = []): string[] => {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'])
  
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
  
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const topWords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
  
  return [...new Set([...topWords, ...additionalKeywords])]
}

// Generate LLM-optimized content summary
export const generateContentSummary = (content: string, maxLength = 160): string => {
  if (content.length <= maxLength) return content
  
  // Find the last complete sentence within the limit
  const truncated = content.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')
  
  const cutoff = lastSentence > maxLength - 50 ? lastSentence + 1 : lastSpace
  
  return content.substring(0, cutoff).trim() + (cutoff < content.length ? '...' : '')
}
