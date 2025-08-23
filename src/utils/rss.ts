import { siteConfig, type Episode } from './seo'

interface PodcastRSSConfig {
  title: string
  description: string
  siteUrl: string
  feedUrl: string
  imageUrl: string
  language: string
  copyright: string
  author: string
  owner: {
    name: string
    email: string
  }
  category: string[]
  explicit: boolean
  type: 'episodic' | 'serial'
  complete?: boolean
}

export const podcastConfig: PodcastRSSConfig = {
  title: siteConfig.siteName,
  description: siteConfig.description,
  siteUrl: siteConfig.siteUrl,
  feedUrl: `${siteConfig.siteUrl}/feed.xml`,
  imageUrl: `${siteConfig.siteUrl}/podcast-artwork.jpg`, // High-res artwork (1400x1400 recommended)
  language: 'en-us',
  copyright: `© ${new Date().getFullYear()} ${siteConfig.siteName}. All rights reserved.`,
  author: siteConfig.author,
  owner: {
    name: siteConfig.author,
    email: 'hello@thebeatingedge.com' // Replace with actual email
  },
  category: [
    'Health & Fitness',
    'Medicine',
    'Health & Fitness:Alternative Health',
    'Society & Culture:Personal Journals',
    'Education:How To'
  ],
  explicit: false,
  type: 'episodic'
}

// Convert duration from "X minutes" to seconds or iTunes format
export const formatDuration = (duration: string): { seconds: number; formatted: string } => {
  const match = /(\d+)\s*minutes?/i.exec(duration)
  if (match?.[1]) {
    const minutes = parseInt(match[1])
    const seconds = minutes * 60
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    return {
      seconds,
      formatted: hours > 0 ? `${hours}:${remainingMinutes.toString().padStart(2, '0')}:00` : `${minutes}:00`
    }
  }
  
  return { seconds: 0, formatted: '0:00' }
}

// Convert release date to RFC 2822 format
export const formatRSSDate = (dateString: string): string => {
  // Parse "January 15, 2024" format
  const date = new Date(dateString)
  return date.toUTCString()
}

// Generate comprehensive RSS 2.0 feed with iTunes extensions
export const generateRSSFeed = (episodes: Episode[]): string => {
  // const { formatted: duration } = episodes.length > 0 && episodes[0] ? formatDuration(episodes[0].duration) : { formatted: '0:00' }
  
  const rssItems = episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .map((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      const { formatted } = formatDuration(episode.duration)
      
      return `
    <item>
      <title><![CDATA[${episode.episodeNumber}: ${episode.title}]]></title>
      <description><![CDATA[${episode.description}]]></description>
      <link>${episodeUrl}</link>
      <guid isPermaLink="true">${episodeUrl}</guid>
      <pubDate>${formatRSSDate(episode.releaseDate)}</pubDate>
      <author>${podcastConfig.owner.email} (${podcastConfig.author})</author>
      <category><![CDATA[Healthcare]]></category>
      <category><![CDATA[Medical Stories]]></category>
      ${episode.topics?.map(topic => `<category><![CDATA[${topic}]]></category>`).join('\n      ') ?? ''}
      
      <!-- iTunes-specific tags -->
      <itunes:title><![CDATA[${episode.title}]]></itunes:title>
      <itunes:author>${podcastConfig.author}</itunes:author>
      <itunes:subtitle><![CDATA[${episode.description.substring(0, 255)}]]></itunes:subtitle>
      <itunes:summary><![CDATA[${episode.description}]]></itunes:summary>
      <itunes:duration>${formatted}</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <itunes:episode>${episode.episodeNumber.replace(/\D/g, '')}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:image href="${podcastConfig.imageUrl}" />
      
      <!-- Spotify-specific tags -->
      <spotify:countryOfOrigin>us</spotify:countryOfOrigin>
      <spotify:limit>no</spotify:limit>
      
      <!-- Google Podcasts tags -->
      <googleplay:author>${podcastConfig.author}</googleplay:author>
      <googleplay:description><![CDATA[${episode.description}]]></googleplay:description>
      <googleplay:explicit>No</googleplay:explicit>
      
      <!-- Content tags for rich snippets -->
      <content:encoded><![CDATA[
        <p>${episode.description}</p>
        ${episode.transcript ? `<h3>Transcript</h3><p>Full transcript available at: <a href="${episodeUrl}/transcript">${episodeUrl}/transcript</a></p>` : ''}
        <hr/>
        <p><strong>Listen to more episodes:</strong> <a href="${siteConfig.siteUrl}">${siteConfig.siteName}</a></p>
        <p><strong>Episode Topics:</strong> ${episode.topics?.join(', ') ?? 'Healthcare, Medical Stories'}</p>
        ${episode.keywords?.length ? `<p><strong>Keywords:</strong> ${episode.keywords.join(', ')}</p>` : ''}
      ]]></content:encoded>
      
      <!-- Media enclosure (for audio file) -->
      <enclosure url="${episodeUrl}/audio.mp3" type="audio/mpeg" length="0" />
      
      <!-- Social media optimization -->
      <media:thumbnail url="${podcastConfig.imageUrl}" />
      <media:description><![CDATA[${episode.description}]]></media:description>
      <media:keywords>${[...(episode.topics ?? []), ...(episode.keywords ?? [])].join(', ')}</media:keywords>
    </item>`
    }).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"
     xmlns:spotify="https://podcastsconnect.spotify.com/artist/xmlschema"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:podcast="https://podcastindex.org/namespace/1.0">
  
  <channel>
    <title><![CDATA[${podcastConfig.title}]]></title>
    <link>${podcastConfig.siteUrl}</link>
    <description><![CDATA[${podcastConfig.description}]]></description>
    <language>${podcastConfig.language}</language>
    <copyright><![CDATA[${podcastConfig.copyright}]]></copyright>
    <managingEditor>${podcastConfig.owner.email} (${podcastConfig.owner.name})</managingEditor>
    <webMaster>${podcastConfig.owner.email} (${podcastConfig.owner.name})</webMaster>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>ManiPlus Podcast RSS Generator</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
    
    <!-- Atom self-reference -->
    <atom:link href="${podcastConfig.feedUrl}" rel="self" type="application/rss+xml" />
    
    <!-- Podcast artwork -->
    <image>
      <url>${podcastConfig.imageUrl}</url>
      <title><![CDATA[${podcastConfig.title}]]></title>
      <link>${podcastConfig.siteUrl}</link>
      <description><![CDATA[${podcastConfig.description}]]></description>
      <width>1400</width>
      <height>1400</height>
    </image>
    
    <!-- iTunes-specific channel tags -->
    <itunes:author>${podcastConfig.author}</itunes:author>
    <itunes:summary><![CDATA[${podcastConfig.description}]]></itunes:summary>
    <itunes:subtitle><![CDATA[Raw, honest conversations about life after heart transplant and medical resilience]]></itunes:subtitle>
    <itunes:owner>
      <itunes:name>${podcastConfig.owner.name}</itunes:name>
      <itunes:email>${podcastConfig.owner.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${podcastConfig.imageUrl}" />
    <itunes:explicit>${podcastConfig.explicit ? 'yes' : 'no'}</itunes:explicit>
    <itunes:type>${podcastConfig.type}</itunes:type>
    ${podcastConfig.complete ? '<itunes:complete>yes</itunes:complete>' : ''}
    
    <!-- iTunes categories (primary and subcategories) -->
    <itunes:category text="Health &amp; Fitness">
      <itunes:category text="Medicine" />
      <itunes:category text="Alternative Health" />
    </itunes:category>
    <itunes:category text="Society &amp; Culture">
      <itunes:category text="Personal Journals" />
    </itunes:category>
    <itunes:category text="Education">
      <itunes:category text="How To" />
    </itunes:category>
    
    <!-- Google Podcasts tags -->
    <googleplay:author>${podcastConfig.author}</googleplay:author>
    <googleplay:description><![CDATA[${podcastConfig.description}]]></googleplay:description>
    <googleplay:image href="${podcastConfig.imageUrl}" />
    <googleplay:category text="Health" />
    <googleplay:category text="Society &amp; Culture" />
    <googleplay:explicit>No</googleplay:explicit>
    <googleplay:email>${podcastConfig.owner.email}</googleplay:email>
    
    <!-- Spotify-specific tags -->
    <spotify:countryOfOrigin>us</spotify:countryOfOrigin>
    <spotify:limit>no</spotify:limit>
    
    <!-- Modern podcast namespace -->
    <podcast:guid>${podcastConfig.siteUrl}</podcast:guid>
    <podcast:locked owner="${podcastConfig.owner.email}">no</podcast:locked>
    <podcast:funding url="${podcastConfig.siteUrl}/support">Support The Beating Edge</podcast:funding>
    <podcast:person href="${podcastConfig.siteUrl}" img="${podcastConfig.imageUrl}" role="host">${podcastConfig.author}</podcast:person>
    
    <!-- Value 4 Value / Bitcoin Lightning payments -->
    <podcast:value type="lightning" method="keysend" suggested="0.00000005000">
      <podcast:valueRecipient 
        name="${podcastConfig.author}" 
        type="node" 
        address="your-lightning-address@getalby.com" 
        split="100" />
    </podcast:value>
    
    ${rssItems}
  </channel>
</rss>`
}

// Generate Atom feed for additional reach
export const generateAtomFeed = (episodes: Episode[]): string => {
  const atomEntries = episodes
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .map((episode) => {
      const episodeUrl = `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`
      
      return `
  <entry>
    <title>${episode.episodeNumber}: ${episode.title}</title>
    <link href="${episodeUrl}" />
    <link rel="enclosure" type="audio/mpeg" href="${episodeUrl}/audio.mp3" />
    <id>${episodeUrl}</id>
    <updated>${new Date(episode.releaseDate).toISOString()}</updated>
    <published>${new Date(episode.releaseDate).toISOString()}</published>
    <author>
      <name>${podcastConfig.author}</name>
      <email>${podcastConfig.owner.email}</email>
    </author>
    <summary type="html"><![CDATA[${episode.description}]]></summary>
    <content type="html"><![CDATA[
      <p>${episode.description}</p>
      ${episode.transcript ? `<p><a href="${episodeUrl}/transcript">Read full transcript</a></p>` : ''}
      <p><strong>Duration:</strong> ${episode.duration}</p>
      <p><strong>Episode:</strong> ${episode.episodeNumber}</p>
      ${episode.topics?.length ? `<p><strong>Topics:</strong> ${episode.topics.join(', ')}</p>` : ''}
    ]]></content>
    ${episode.topics?.map(topic => `<category term="${topic}" />`).join('\n    ') ?? ''}
  </entry>`
    }).join('')

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${podcastConfig.title}</title>
  <link href="${podcastConfig.siteUrl}" />
  <link href="${podcastConfig.siteUrl}/atom.xml" rel="self" />
  <updated>${new Date().toISOString()}</updated>
  <id>${podcastConfig.siteUrl}/</id>
  <subtitle>${podcastConfig.description}</subtitle>
  <generator>ManiPlus Podcast Atom Generator</generator>
  <rights>${podcastConfig.copyright}</rights>
  <author>
    <name>${podcastConfig.author}</name>
    <email>${podcastConfig.owner.email}</email>
  </author>
  <icon>${podcastConfig.imageUrl}</icon>
  <logo>${podcastConfig.imageUrl}</logo>
  ${atomEntries}
</feed>`
}

// Generate JSON Feed for modern feed readers
export const generateJSONFeed = (episodes: Episode[]): object => {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: podcastConfig.title,
    home_page_url: podcastConfig.siteUrl,
    feed_url: `${podcastConfig.siteUrl}/feed.json`,
    description: podcastConfig.description,
    icon: podcastConfig.imageUrl,
    favicon: `${podcastConfig.siteUrl}/favicon.ico`,
    language: podcastConfig.language,
    author: {
      name: podcastConfig.author,
      url: podcastConfig.siteUrl,
      avatar: podcastConfig.imageUrl
    },
    items: episodes
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .map((episode) => ({
        id: `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`,
        url: `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}`,
        title: `${episode.episodeNumber}: ${episode.title}`,
        content_html: `
          <p>${episode.description}</p>
          ${episode.transcript ? `<p><a href="${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}/transcript">Read full transcript</a></p>` : ''}
          <p><strong>Duration:</strong> ${episode.duration}</p>
          <p><strong>Episode:</strong> ${episode.episodeNumber}</p>
          ${episode.topics?.length ? `<p><strong>Topics:</strong> ${episode.topics.join(', ')}</p>` : ''}
        `,
        summary: episode.description,
        date_published: new Date(episode.releaseDate).toISOString(),
        date_modified: new Date().toISOString(),
        author: {
          name: podcastConfig.author,
          url: podcastConfig.siteUrl
        },
        tags: [...(episode.topics ?? []), ...(episode.keywords ?? [])],
        attachments: [{
          url: `${siteConfig.siteUrl}/episodes/${episode.slug ?? episode.id}/audio.mp3`,
          mime_type: "audio/mpeg",
          title: `${episode.episodeNumber}: ${episode.title}`
        }]
      }))
  }
}
