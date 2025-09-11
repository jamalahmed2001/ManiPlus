import type { Episode } from '@/utils/seo'

// Episode overviews/intros for the homepage
export const introEpisodes: Episode[] = [
  {
    id: 'intro1',
    title: 'Authenticity & Real Stories',
    description: 'Mani+ opens up about the power of authentic storytelling in healthcare. When we share our real experiences - the messy, beautiful, and complicated truth - we create connections that heal both storyteller and listener.',
    duration: '3 minutes',
    releaseDate: 'January 1, 2024',
    episodeNumber: 'INTRO 01',
    slug: 'authenticity-real-stories',
    topics: ['authenticity', 'real stories', 'healthcare narratives', 'genuine connection'],
    keywords: ['authentic storytelling', 'real patient experiences', 'healthcare stories', 'genuine narratives'],
    audioUrl: '/intro1.mp3'
  },
  {
    id: 'intro2',
    title: 'Lessons You Can Use',
    description: 'Beyond the medical jargon and clinical outcomes lie practical wisdom and life lessons. Mani+ shares actionable insights from his journey that you can apply whether you\'re facing health challenges or supporting someone who is.',
    duration: '4 minutes',
    releaseDate: 'January 2, 2024',
    episodeNumber: 'INTRO 02',
    slug: 'lessons-you-can-use',
    topics: ['practical wisdom', 'life lessons', 'actionable insights', 'healthcare guidance'],
    keywords: ['practical lessons', 'healthcare wisdom', 'actionable advice', 'patient insights'],
    audioUrl: '/intro2.mp3'
  },
  {
    id: 'intro3',
    title: 'A Unique Perspective',
    description: 'Having lived through heart transplant and ongoing dialysis, Mani+ offers a rare dual perspective - both as patient and advocate. This unique vantage point reveals truths about resilience, hope, and the healthcare system that few can share.',
    duration: '5 minutes',
    releaseDate: 'January 3, 2024',
    episodeNumber: 'INTRO 03',
    slug: 'unique-perspective',
    topics: ['unique perspective', 'dual experience', 'patient advocacy', 'healthcare insights'],
    keywords: ['patient perspective', 'healthcare advocate', 'unique insights', 'medical experience'],
    audioUrl: '/intro3.mp3'
  },
  {
    id: 'intro4',
    title: 'For Dreamers & Doers',
    description: 'This isn\'t just for patients or medical professionals - it\'s for anyone who dreams of making a difference and has the courage to act. Mani+ explores how health challenges can become catalysts for purpose and positive change.',
    duration: '4 minutes',
    releaseDate: 'January 4, 2024',
    episodeNumber: 'INTRO 04',
    slug: 'for-dreamers-doers',
    topics: ['dreamers', 'doers', 'purpose', 'positive change', 'catalyst for action'],
    keywords: ['dreamers and doers', 'purpose-driven', 'positive change', 'health advocacy'],
    audioUrl: '/intro4.mp3'
  }
]

// Full episode data with proper audio file references
export const episodes: Episode[] = [
  {
    id: '1',
    title: 'The Day Everything Changed',
    description: 'Mani+ opens up about his journey from diagnosis to heart transplant, sharing the raw emotions, unexpected challenges, and profound gratitude that shaped his perspective on life and medicine.',
    duration: '23 minutes',
    releaseDate: 'January 15, 2024',
    episodeNumber: 'EP 001',
    slug: 'the-day-everything-changed',
    topics: ['heart transplant', 'diagnosis', 'patient journey', 'medical transformation'],
    keywords: ['heart failure', 'transplant surgery', 'medical recovery', 'patient story'],
    audioUrl: '/podcasts/Mani+.mp3'
  },
  {
    id: '2', 
    title: 'Breakthrough Insights with Dr. Chen',
    description: 'Leading transplant immunologist Dr. Sarah Chen discusses revolutionary new protocols that are reducing rejection rates while minimizing long-term medication side effects, offering hope for better patient outcomes.',
    duration: '12 minutes',
    releaseDate: 'January 22, 2024',
    episodeNumber: 'EP 002',
    slug: 'breakthrough-insights-dr-chen',
    topics: ['immunosuppression', 'transplant medicine', 'medical research', 'rejection prevention'],
    keywords: ['immunology', 'transplant drugs', 'medical innovation', 'organ rejection'],
    audioUrl: '/podcasts/mani+2.mp3'
  },
  {
    id: '3',
    title: "Finding Hope in the Journey", 
    description: 'Mani+ shares profound insights about resilience, hope, and the unexpected gifts that come from life\'s greatest challenges. A deeply personal reflection on transformation through adversity.',
    duration: '10 minutes',
    releaseDate: 'January 29, 2024', 
    episodeNumber: 'EP 003',
    slug: 'finding-hope-in-the-journey',
    topics: ['recovery', 'resilience', 'hope', 'inspiration', 'personal growth'],
    keywords: ['hope', 'resilience', 'inspiration', 'personal transformation', 'life challenges'],
    audioUrl: '/podcasts/Mani+3.mp3'
  }
]
