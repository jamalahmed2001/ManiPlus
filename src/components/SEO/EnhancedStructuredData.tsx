import React from 'react'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  SocialProfileJsonLd,
  WebPageJsonLd,
  SiteLinksSearchBoxJsonLd,
  OrganizationJsonLd
} from 'next-seo'
import { siteConfig, type Episode } from '@/utils/seo'

interface PodcastEpisodeStructuredDataProps {
  episodes?: Episode[]
}

interface PersonProfileStructuredDataProps {
  person: {
    name: string
    description: string
    image?: string
    sameAs?: string[]
    jobTitle?: string
    worksFor?: string
  }
}

interface BreadcrumbItem {
  position: number
  name: string
  item: string
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[]
}

// Enhanced podcast structured data with comprehensive schema
export const PodcastStructuredData: React.FC<PodcastEpisodeStructuredDataProps> = ({ episodes = [] }) => {
  const podcastJsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": siteConfig.siteName,
    "description": siteConfig.description,
    "url": siteConfig.siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": siteConfig.author,
      "description": "Heart transplant recipient, dialysis patient, health advocate, and storyteller",
      "url": siteConfig.siteUrl,
      "sameAs": [
        // Add social media links when available
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
        "width": 400,
        "height": 400
      },
      "url": siteConfig.siteUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteConfig.siteUrl
    },
    "genre": ["Health", "Medicine", "Patient Stories", "Healthcare", "Medical Education", "Personal Health"],
    "inLanguage": "en-US",
    "keywords": siteConfig.keywords.join(', '),
    "contentRating": "General Audiences",
    "isFamilyFriendly": true,
    "accessMode": ["auditory", "textual"],
    "accessModeSufficient": ["auditory"],
    "accessibilityFeature": ["transcript", "captions"],
    "accessibilityHazard": "none",
    "accessibilityControl": ["fullKeyboardControl", "fullMouseControl"],
    "isAccessibleForFree": true,
    "creativeWorkStatus": "Published",
    "dateCreated": "2024-01-01T00:00:00Z",
    "dateModified": new Date().toISOString(),
    "datePublished": "2024-01-01T00:00:00Z",
    "episodeList": episodes.map(episode => ({
      "@type": "PodcastEpisode",
      "name": `${episode.episodeNumber}: ${episode.title}`,
      "description": episode.description,
      "url": `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`,
      "datePublished": new Date(episode.releaseDate).toISOString(),
      "duration": episode.duration,
      "episodeNumber": parseInt(episode.episodeNumber.replace(/\D/g, '')),
      "partOfSeries": {
        "@type": "PodcastSeries",
        "name": siteConfig.siteName,
        "url": siteConfig.siteUrl
      },
      "author": {
        "@type": "Person",
        "name": siteConfig.author
      },
      "publisher": {
        "@type": "Organization",
        "name": siteConfig.siteName
      },
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
      "keywords": episode.topics?.join(', ') ?? siteConfig.keywords.slice(0, 10).join(', '),
      "transcript": episode.transcript ? `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}/transcript` : undefined
    }))
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "alternateName": "The Beating Edge",
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
      "width": 400,
      "height": 400
    },
    "description": "A podcast dedicated to sharing stories of resilience, medical innovation, and the human spirit in healthcare",
    "foundingDate": "2024-01-01",
    "founder": {
      "@type": "Person",
      "name": siteConfig.author,
      "description": "Heart transplant recipient and dialysis patient sharing stories of medical resilience"
    },
    "sameAs": [
      // Add social media links when available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${siteConfig.siteUrl}/contact`,
      "availableLanguage": "English"
    },
    "knowsAbout": [
      "Heart Transplant",
      "Dialysis",
      "Patient Advocacy",
      "Medical Stories",
      "Healthcare Innovation",
      "Chronic Illness",
      "Medical Research",
      "Patient Experience"
    ],
    "publishingPrinciples": `${siteConfig.siteUrl}/privacy`,
    "diversityPolicy": "We welcome and celebrate diversity in all forms, ensuring our content represents the full spectrum of human experience in healthcare.",
    "ethicsPolicy": "We are committed to sharing authentic, respectful, and medically responsible content while protecting patient privacy and dignity."
  }

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.siteName,
    "alternateName": "The Beating Edge",
    "url": siteConfig.siteUrl,
    "description": "Transformative healthcare stories and medical insights from patients, doctors, and healthcare professionals",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "url": siteConfig.siteUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "PodcastSeries",
      "name": siteConfig.siteName,
      "url": siteConfig.siteUrl
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastJsonLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd)
        }}
      />
    </>
  )
}

// Website structured data with search functionality
export const WebsiteStructuredData: React.FC = () => {
  return (
    <>
      <WebPageJsonLd
        description={siteConfig.description}
        id={siteConfig.siteUrl}
        lastReviewed={new Date().toISOString()}
        reviewedBy={{
          type: 'Person',
          name: siteConfig.author
        }}
      />
      
      <SiteLinksSearchBoxJsonLd
        url={siteConfig.siteUrl}
        potentialActions={[
          {
            target: `${siteConfig.siteUrl}/search?q`,
            queryInput: 'search_term_string'
          }
        ]}
      />
    </>
  )
}

// Person/Author structured data
export const PersonStructuredData: React.FC<PersonProfileStructuredDataProps> = ({ person }) => {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "url": siteConfig.siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": person.image ?? `${siteConfig.siteUrl}${siteConfig.defaultImage}`
    },
    "sameAs": person.sameAs ?? [],
    "jobTitle": person.jobTitle ?? "Healthcare Advocate & Storyteller",
    "worksFor": {
      "@type": "Organization",
      "name": person.worksFor ?? siteConfig.siteName,
      "url": siteConfig.siteUrl
    },
    "description": person.description,
    "knowsAbout": [
      "Heart Transplant",
      "Dialysis",
      "Patient Advocacy",
      "Healthcare Stories",
      "Medical Resilience"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personJsonLd)
      }}
    />
  )
}

// Social profile structured data
export const SocialProfileStructuredData: React.FC<{ sameAs: string[] }> = ({ sameAs }) => {
  return (
    <SocialProfileJsonLd
      type="Person"
      name={siteConfig.author}
      url={siteConfig.siteUrl}
      sameAs={sameAs}
    />
  )
}

// Organization structured data
export const OrganizationStructuredData: React.FC = () => {
  return (
    <OrganizationJsonLd
      type="Organization"
      id={siteConfig.siteUrl}
      name={siteConfig.siteName}
      url={siteConfig.siteUrl}
      logo={`${siteConfig.siteUrl}${siteConfig.defaultImage}`}
      description={siteConfig.description}
      address={{
        addressCountry: 'US',
        addressLocality: 'United States'
      }}
      contactPoints={[
        {
          contactType: 'customer service',
          url: `${siteConfig.siteUrl}/contact`
        }
      ]}
    />
  )
}

// Enhanced breadcrumb structured data
export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ items }) => {
  return (
    <BreadcrumbJsonLd
      itemListElements={items.map(item => ({
        position: item.position,
        name: item.name,
        item: item.item
      }))}
    />
  )
}

// Episode-specific structured data
export const EpisodeStructuredData: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <ArticleJsonLd
      type="BlogPosting"
      url={`${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`}
      title={`${episode.episodeNumber}: ${episode.title}`}
      images={[`${siteConfig.siteUrl}${siteConfig.defaultImage}`]}
      datePublished={new Date(episode.releaseDate).toISOString()}
      dateModified={new Date().toISOString()}
      authorName={[{
        name: siteConfig.author,
        url: siteConfig.siteUrl
      }]}
      publisherName={siteConfig.siteName}
      publisherLogo={`${siteConfig.siteUrl}${siteConfig.defaultImage}`}
      description={episode.description}
      isAccessibleForFree={true}
    />
  )
}
