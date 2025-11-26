import type { Episode } from '@/utils/seo'

// Full episode data synced from RSS feed
// This serves as fallback if RSS fetch fails
export const episodes: Episode[] = [
  {
    id: 'episode-7',
    title: 'Episode 7 - The Role of Mentors, Experts & Guides',
    description: 'Assalamu alaikum and welcome back to Mani.Plus. Every great journey has its guides the mentors and experts who light the path when the road ahead feels uncertain. In this episode, I step back from my personal heart transplant story to honour those who helped me through it—the people whose wisdom, skill, and compassion carried me from diagnosis to recovery.',
    duration: '00:04:29',
    releaseDate: 'October 29, 2025',
    episodeNumber: 'EP 007',
    slug: 'episode-7-the-role-of-mentors-experts-guides',
    topics: ['mentors', 'guides', 'experts', 'transplant', 'resilience', 'healthcare'],
    keywords: ['mentors in medicine', 'patient gratitude', 'healthcare guides', 'heart transplant support'],
    audioUrl: 'https://anchor.fm/s/108b17084/podcast/play/110357731/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-9-28%2F410159493-44100-2-2d86e2aaeff53.m4a'
  },
  {
    id: 'episode-6',
    title: 'Episode 6 - The First Whisper',
    description: 'Assalamu alaikum and welcome back to Mani.Plus. Before a heart gives out, it whispers. In this episode, we explore that very first, often-missed sign that your heart might be struggling. It\'s not the dramatic collapse we see in films or the crushing chest pain we imagine — it\'s quieter, subtler, and so easy to ignore.',
    duration: '00:06:45',
    releaseDate: 'October 22, 2025',
    episodeNumber: 'EP 006',
    slug: 'episode-6-the-first-whisper',
    topics: ['heart failure', 'symptoms', 'early warning', 'healthcare', 'diagnosis'],
    keywords: ['heart failure symptoms', 'early signs', 'shortness of breath', 'cardiac health'],
    audioUrl: ''
  },
  {
    id: 'episode-5',
    title: 'Episode 5 - The Patient\'s Path: A Heart Transplant Journey',
    description: 'Assalamu Alaikum, and welcome back to Mani.Plus. In this deeply personal episode, I take you inside one of the most human experiences imaginable — the journey of a heart transplant patient. Not through the lens of science or medicine, but through faith, emotion, and the raw truth of survival.',
    duration: '00:07:47',
    releaseDate: 'October 15, 2025',
    episodeNumber: 'EP 005',
    slug: 'episode-5-the-patients-path-a-heart-transplant-journey',
    topics: ['heart transplant', 'patient journey', 'faith', 'resilience', 'survival'],
    keywords: ['heart transplant journey', 'patient experience', 'transplant surgery', 'faith and healing'],
    audioUrl: ''
  },
  {
    id: 'episode-4',
    title: 'Episode 4 - Spirit',
    description: 'Where medicine meets meaning, and every heartbeat tells a story of faith, healing, and human connection. In this final part of our three-episode series, Spirit: The Heart Beyond Science, host Mani Ahmed reflects on the most profound element of his journey—the unbreakable human spirit.',
    duration: '00:04:18',
    releaseDate: 'October 8, 2025',
    episodeNumber: 'EP 004',
    slug: 'episode-4-spirit',
    topics: ['spirit', 'faith', 'healing', 'human connection', 'recovery'],
    keywords: ['human spirit', 'faith in healing', 'spiritual recovery', 'medical spirituality'],
    audioUrl: ''
  },
  {
    id: 'episode-3',
    title: 'Episode 3 - Innovation',
    description: 'The Beating Edge with Mani+ Where medicine meets meaning. Host Mani Ahmed, seven years strong after a life-saving heart transplant, unpacks the second force that defines his journey: innovation. In this episode, Innovation: The Architects of My Second Chance, Mani explores the groundbreaking medical science that turned a once-terminal diagnosis into a story of hope.',
    duration: '00:04:10',
    releaseDate: 'September 30, 2025',
    episodeNumber: 'EP 003',
    slug: 'episode-3-innovation',
    topics: ['innovation', 'medical science', 'transplant technology', 'research'],
    keywords: ['medical innovation', 'heart transplant technology', 'surgical advances', 'immunosuppression'],
    audioUrl: ''
  },
  {
    id: 'episode-2',
    title: 'Episode 2 - Resilience',
    description: 'The Beating Edge with Mani+ Where medicine meets meaning. Host Mani Ahmed—seven years strong after a life-saving heart transplant returns with a deeply personal reflection on one word: resilience. In this episode, The Unbreakable Spirit: My Journey of Resilience, Mani takes us inside the quiet, relentless fight for survival.',
    duration: '00:05:20',
    releaseDate: 'September 24, 2025',
    episodeNumber: 'EP 002',
    slug: 'episode-2-resilience',
    topics: ['resilience', 'survival', 'recovery', 'patient journey'],
    keywords: ['resilience in healthcare', 'patient resilience', 'survival story', 'heart transplant recovery'],
    audioUrl: 'https://anchor.fm/s/108b17084/podcast/play/108641921/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-8-22%2F28a6e3ab-51ed-2bcb-f913-ba29e5ea5323.mp3'
  },
  {
    id: 'episode-1',
    title: 'Episode 1 - Intro',
    description: 'The Beating Edge with Mani+ Where medicine meets meaning. Host Mani Ahmed—seven years strong after a life-saving heart transplant—dives into stories of resilience, medical innovation, and the human spirit. Each episode explores the realities behind survival, burnout, healing, and second chances.',
    duration: '00:11:14',
    releaseDate: 'September 17, 2025',
    episodeNumber: 'EP 001',
    slug: 'episode-1-intro',
    topics: ['introduction', 'podcast launch', 'patient stories', 'healthcare'],
    keywords: ['podcast intro', 'patient storytelling', 'healthcare podcast', 'medical stories'],
    audioUrl: 'https://anchor.fm/s/108b17084/podcast/play/108394602/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-8-16%2F3b9091ec-4ae0-5b28-c7ac-e4e8377257ef.mp3'
  }
]

// Intro episodes kept for backwards compatibility
export const introEpisodes: Episode[] = episodes
