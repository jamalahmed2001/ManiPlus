import React from 'react';
import Head from 'next/head';

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
    "description": "Raw, honest conversations about life after heart transplant, kidney failure, and the resilience of the human spirit. Join Mani+, a heart transplant recipient and dialysis patient, for powerful conversations with doctors, researchers, and fellow patients sharing breakthrough treatments, inspiring recovery stories, and the human side of modern medicine.",
    "url": "https://thebeatingedge.com",
    "image": "https://thebeatingedge.com/mani+logo.png",
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
        "url": "https://thebeatingedge.com/mani+logo.png"
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
    "url": "https://thebeatingedge.com",
    "logo": "https://thebeatingedge.com/mani+logo.png",
    "description": "A podcast dedicated to sharing stories of resilience, medical innovation, and the human spirit in healthcare",
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
    "url": "https://thebeatingedge.com",
    "description": "Transformative healthcare stories and medical insights from patients, doctors, and healthcare professionals",
    "publisher": {
      "@type": "Organization",
      "name": "The Beating Edge"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thebeatingedge.com/search?q={search_term_string}",
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
