// Export all SEO components for easy importing
export {
  PodcastStructuredData,
  WebsiteStructuredData,
  PersonStructuredData,
  SocialProfileStructuredData,
  OrganizationStructuredData,
  BreadcrumbStructuredData,
  EpisodeStructuredData
} from './EnhancedStructuredData'

// Re-export SEO utilities
export {
  siteConfig,
  generateHomepageSEO,
  generateEpisodeSEO,
  generateStoryPageSEO,
  generateEpisodeArticleJsonLd,
  extractKeywords,
  generateContentSummary,
  type Episode
} from '@/utils/seo'
