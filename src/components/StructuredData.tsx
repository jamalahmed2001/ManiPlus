import React from 'react';
import Head from 'next/head';
import { siteConfig } from '@/utils/seo';

interface Episode {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  duration: string;
  episodeNumber: number;
}

interface PodcastStructuredDataProps {
  episodes?: Episode[];
}

export const PodcastStructuredData: React.FC<PodcastStructuredDataProps> = ({ episodes = [] }) => {
  const podcastJsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "The Beating Edge with Mani+",
    "description": "Resilience, medicine, innovation, and the human spirit in healthcare. Honest conversations with patients, clinicians, and researchers about transplant care, dialysis, breakthroughs, and the human side of modern medicine.",
    "url": siteConfig.siteUrl,
    "image": `${siteConfig.siteUrl}/mani+logo.png`,
    "author": {
      "@type": "Person",
      "name": "Mani+",
      "description": "Heart transplant recipient, dialysis patient, health advocate, and storyteller"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Beating Edge",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}/mani+logo.png`
      }
    },
    "genre": ["Health", "Medicine", "Patient Stories", "Healthcare"],
    "inLanguage": "en-US",
    "keywords": "heart transplant, dialysis, chronic illness, patient advocacy, medical stories, healthcare podcast, transplant recipient, kidney failure, medical innovation, patient journey",
    "episodeList": episodes.map(episode => ({
      "@type": "PodcastEpisode",
      "name": episode.name,
      "description": episode.description,
      "url": episode.url,
      "datePublished": episode.datePublished,
      "duration": episode.duration,
      "episodeNumber": episode.episodeNumber,
      "partOfSeries": {
        "@type": "PodcastSeries",
        "name": "The Beating Edge with Mani+"
      }
    }))
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Beating Edge with Mani+",
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/mani+logo.png`,
    "description": "Resilience, medicine, innovation, and the human spirit in healthcare — stories that move, insights that matter.",
    "founder": {
      "@type": "Person",
      "name": "Mani+",
      "description": "Heart transplant recipient and dialysis patient sharing stories of medical resilience"
    },
    "sameAs": [
      // Add social media links when available
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Beating Edge with Mani+",
    "url": siteConfig.siteUrl,
    "description": "Resilience in healthcare, medicine and innovation — human stories from patients, clinicians, and researchers.",
    "publisher": {
      "@type": "Organization",
      "name": "The Beating Edge"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Head>
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
    </Head>
  );
};
