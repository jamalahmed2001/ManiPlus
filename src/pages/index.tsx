import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import type { GetStaticProps } from 'next';
import { Header, Section, Card, Button, EpisodeCard, PodcastSubscribeLinks, SocialLinksFull, AudioPlayer, EpisodeModal } from '@/components';
import { PodcastStructuredData, WebsiteStructuredData, FAQStructuredData, generateHomepageSEO, type Episode } from '@/components/SEO';
import { episodes as fallbackEpisodes } from '@/data/episodes';
import { fetchRSSFeed, sortEpisodesByDate } from '@/utils/rss-fetcher';

interface HomeProps {
  initialEpisodes: Episode[];
  episodeCount: number;
}

export default function Home({ initialEpisodes, episodeCount }: HomeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlayingEpisode, setCurrentPlayingEpisode] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [statsCounter, setStatsCounter] = useState({ episodes: episodeCount, listeners: 10000, countries: 45 });
  const [episodes, setEpisodes] = useState<Episode[]>(sortEpisodesByDate(initialEpisodes));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [layout, setLayout] = useState<'list' | 'grid'>('list');
  const router = useRouter();

  const refreshEpisodes = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/episodes');
      if (response.ok) {
        const data = await response.json() as { episodes: Episode[] };
        if (data.episodes?.length > 0) {
          const sorted = sortEpisodesByDate(data.episodes);
          setEpisodes(sortOrder === 'newest' ? sorted : sorted.reverse());
          setStatsCounter({ 
            episodes: data.episodes.length, 
            listeners: 10000, 
            countries: 45 
          });
        }
      }
    } catch (error) {
      console.error('Failed to refresh episodes:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSort = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    setEpisodes(prev => [...prev].reverse());
  };

  useEffect(() => {
    setIsVisible(true);

    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    };

    handleHashNavigation();
    router.events.on('routeChangeComplete', handleHashNavigation);

    return () => {
      router.events.off('routeChangeComplete', handleHashNavigation);
    };
  }, [router.events]);

  // Episode data with enhanced SEO metadata and display colors
  const episodesWithColors: (Episode & { color: 'red' | 'green' | 'white' })[] = episodes.map((episode, index) => ({
    ...episode,
    color: ['red', 'green', 'white'][index % 3] as 'red' | 'green' | 'white'
  }));

  const handlePlayEpisode = (episodeId: string) => {
    setCurrentPlayingEpisode(episodeId);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NextSeo {...generateHomepageSEO()} />
      
      <PodcastStructuredData episodes={episodesWithColors} />
      <WebsiteStructuredData />
      <FAQStructuredData />

      <Header />

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black pt-16">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>

          <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Mani+ Logo */}
            <div className="mb-8 flex justify-center">
              <Image 
                src="/mani+logo.png" 
                width={320}
                height={160}
                alt="The Beating Edge with Mani+ Logo" 
                className="w-80 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
              <span className="text-white drop-shadow-xl">Resilience. Medicine. Innovation. The Human Spirit.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Conversations at the intersection of healthcare resilience, cutting-edge medicine, and human-centered innovation — where real patient stories and clinician insights meet.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-400">{statsCounter.episodes}+</div>
                <div className="text-sm text-gray-400">Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-500">{statsCounter.listeners.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Listeners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{statsCounter.countries}+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => scrollToSection('episodes')}
                icon="🎧"
              >
                Listen Now
              </Button>
              <Link href="/story">
                <Button variant="outline" size="lg" icon="📖">
                  Read Mani&apos;s Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-red-400 transition-colors cursor-pointer"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* About Mani+ Section */}
        <Section background="gradient-gray" id="about">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-green-500">Meet</span> <span className="text-red-400">Mani+</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    My heart began to fail quietly — not with drama, but with whispers I tried to ignore. 
                    Hospital lights, beeping monitors, the night I couldn&apos;t breathe. Then came a heart 
                    transplant, kidney failure, and dialysis four times a week.
                  </p>
                  <p>
                    In those dialysis chairs, during those long hours, I met people whose stories demanded 
                    to be heard. Healthcare workers who were heroes without capes. Doctors pushing boundaries. 
                    Patients rewriting what it means to live.
                  </p>
                  <p className="text-red-400 font-semibold italic">
                    When your heart begins to fail, so do the illusions about being invincible. But what 
                    emerges is something more powerful — the courage to share what we&apos;ve learned in the darkness.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500/20 to-green-500/20 p-8 rounded-2xl backdrop-blur-sm border border-gray-800">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                      <span className="text-gray-300">Heart Transplant Recipient</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></span>
                      <span className="text-gray-300">Dialysis Patient</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-700"></span>
                      <span className="text-gray-300">Health Advocate & Storyteller</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Section>

        {/* What We Cover Section */}
        <Section background="black">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-red-400">What We</span> <span className="text-green-500">Explore</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              The stories that live in hospital hallways, the wisdom found in waiting rooms, and the courage discovered when everything changes
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card variant="hover" borderColor="red" className="p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🫀</div>
                  <h3 className="text-xl font-bold text-red-400 mb-3">Patient Stories</h3>
                  <p className="text-gray-300">The whispered fears, unexpected laughter, and profound moments that happen when life takes an unplanned turn. These are the voices that need to be heard.</p>
                </div>
              </Card>

              <Card variant="hover" borderColor="green" className="p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👨‍⚕️</div>
                  <h3 className="text-xl font-bold text-green-500 mb-3">Medical Insights</h3>
                  <p className="text-gray-300">The doctors who stay late, the nurses who remember your name, the researchers changing tomorrow&apos;s medicine. Their dedication deserves spotlight.</p>
                </div>
              </Card>

              <Card variant="hover" borderColor="white" className="p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💪</div>
                  <h3 className="text-xl font-bold text-white mb-3">Thriving Beyond Limits</h3>
                  <p className="text-gray-300">What they don&apos;t teach you in medical school: how to find joy in small victories, strength in vulnerability, and purpose in the unexpected.</p>
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* Episode Overviews Section */}
        <Section background="gradient-gray" id="episodes">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="text-red-400">Latest</span> <span className="text-green-500">Episodes</span>
                </h2>
                <p className="text-xl text-gray-400 mt-2">
                  {episodes.length} episodes • Updated from RSS feed
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex gap-2 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                  <button
                    onClick={() => setLayout('list')}
                    className={`px-3 py-2 rounded transition-all ${
                      layout === 'list'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setLayout('grid')}
                    className={`px-3 py-2 rounded transition-all ${
                      layout === 'grid'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSort}
                  icon={sortOrder === 'newest' ? '↓' : '↑'}
                >
                  {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={refreshEpisodes}
                  isLoading={isRefreshing}
                  icon="🔄"
                >
                  Sync
                </Button>
              </div>
            </div>

            {layout === 'list' ? (
              <div className="space-y-6">
                {episodesWithColors.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    onPlay={handlePlayEpisode}
                    isPlaying={currentPlayingEpisode === episode.id}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {episodesWithColors.map((episode, index) => {
                  // Extract episode number from episodeNumber field (e.g., "EP 001" -> "1")
                  const episodeNumMatch = episode.episodeNumber?.match(/\d+/);
                  const episodeNumber = episodeNumMatch ? parseInt(episodeNumMatch[0], 10).toString() : (index + 1).toString();
                  const podcastImage = `/podcasts/${episodeNumber}.png`;
                  
                  return (
                  <div
                    key={episode.id}
                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10"
                  >
                    {/* Image Section - Square Aspect Ratio */}
                    <div className="relative w-full aspect-square overflow-hidden bg-black shrink-0">
                      {/* Blurred background layer for cohesive feel */}
                      <div className="absolute inset-0">
                        <Image
                          src={podcastImage}
                          width={400}
                          height={400}
                          alt=""
                          className="w-full h-full object-cover blur-2xl scale-110 opacity-60"
                          priority={index < 3}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Color Gradient Overlay */}
                      <div
                        className={`absolute inset-0 ${
                          episode.color === 'red'
                            ? 'bg-gradient-to-br from-red-600/20 to-black/40'
                            : episode.color === 'green'
                            ? 'bg-gradient-to-br from-green-600/20 to-black/40'
                            : 'bg-gradient-to-br from-white/10 to-black/40'
                        } z-10`}
                      />
                      
                      {/* Main Image - Slightly scaled to fill space */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Image
                          src={podcastImage}
                          width={400}
                          height={400}
                          alt={`${episode.title} cover`}
                          className="w-[110%] h-[110%] object-contain transform group-hover:scale-105 transition-transform duration-700"
                          priority={index < 3}
                          onError={(e) => {
                            // Fallback to logo if image not found
                            e.currentTarget.src = '/mani+logo.png';
                            e.currentTarget.className = 'w-full h-full object-contain p-12 transform group-hover:scale-105 transition-transform duration-700';
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom Info Container - Full Width Overlay */}
                    <div className="relative -mt-20 z-20 pt-8 pb-5 px-5 flex-1 flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent"></div>
                      <div className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_top,black_60%,transparent)]"></div>
                      <div className="relative flex-1 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-red-400 transition-colors min-h-[2.5rem]">
                          {episode.title}
                        </h3>
                          </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {episode.releaseDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {episode.duration}
                        </span>
                        </div>

                      {/* Audio Player - Same as List View */}
                      <div className="flex-1 flex flex-col justify-end">
                        {episode.audioUrl && (
                        <div className="mb-3">
                          <AudioPlayer 
                            src={episode.audioUrl}
                            title={episode.title}
                            variant={episode.color}
                            compact={true}
                          />
                      </div>
                      )}

                      {/* More Details Button */}
                      <button
                        onClick={() => setSelectedEpisode(episode)}
                        className="w-full py-2 px-4 rounded-xl bg-gray-800/50 hover:bg-gray-700 border border-white/10 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        More Details
                      </button>
                      </div>
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>
            )}
            <EpisodeModal 
              episode={selectedEpisode} 
              isOpen={!!selectedEpisode} 
              onClose={() => setSelectedEpisode(null)} 
              onPlay={handlePlayEpisode}
            />
        </Section>

        {/* Subscribe Section */}
        <Section background="gradient-red-green" id="subscribe">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-red-400">Subscribe for</span> <span className="text-green-500">Healthcare Resilience & Innovation</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Join others who know that the most important conversations happen in quiet moments — 
                when hearts learn to listen and stories find their voice.
              </p>

              {/* Podcast Platforms */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="text-red-400">Listen</span> <span className="text-green-500">Everywhere</span>
                </h3>
                <PodcastSubscribeLinks />
              </div>

              {/* Social & Support */}
              <SocialLinksFull className="mb-12" />


            </div>
        </Section>

        {/* Charity Section
        <Section background="black">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
              <span className="text-red-400 font-semibold">🫀 Support Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Every</span>{' '}
              <span className="text-red-400">Heartbeat</span>{' '}
              <span className="text-white">Matters</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Support heart transplant patients through critical care, groundbreaking research, 
              and compassionate assistance. Your donation saves lives at the most crucial moment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <Card variant="hover" borderColor="red">
                <div className="text-center">
                  <div className="text-4xl mb-3">💊</div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">Direct Patient Care</h3>
                  <p className="text-sm text-gray-400">Critical medications and post-transplant monitoring</p>
                </div>
              </Card>
              <Card variant="hover" borderColor="green">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔬</div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">Medical Research</h3>
                  <p className="text-sm text-gray-400">Advancing cardiac care and transplant outcomes</p>
                </div>
              </Card>
              <Card variant="hover" borderColor="white">
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="text-lg font-bold text-white mb-2">Patient Support</h3>
                  <p className="text-sm text-gray-400">Counseling, transportation, and family assistance</p>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/charity">
                <Button variant="primary" size="lg" icon="❤️">
                  Make a Difference
                </Button>
              </Link>
              <Link href="/charity#impact">
                <Button variant="outline" size="lg" icon="📊">
                  See Your Impact
                </Button>
              </Link>
            </div>
            </div>
        </Section> */}

        {/* FAQ Section */}
        <Section background="black" id="faq">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                <span className="text-red-400">Your Questions,</span> <span className="text-green-500">Answered</span>
              </h2>
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">What is this podcast about?</h3>
                  <p className="text-gray-300">Resilience, medicine, innovation, and the human spirit in healthcare — through authentic patient stories and clinician insights.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Who is it for?</h3>
                  <p className="text-gray-300">Patients, caregivers, clinicians, researchers, and anyone who believes in human-centered healthcare and evidence-based progress.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Do you cover medical innovation?</h3>
                  <p className="text-gray-300">Yes — we explore evidence-based advances in transplant care, immunosuppression, dialysis, and more.</p>
                </Card>
              </div>
            </div>
        </Section>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">
                <span className="text-red-400">The Beating Edge</span> <span className="text-gray-400">with</span> <span className="text-green-500">Mani+</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Where resilience meets medicine, innovation serves humanity, and the human spirit transforms healthcare.
              Every conversation advances care. Every story builds understanding.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400 mb-6">
              <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
              <Link href="/story" className="hover:text-green-500 transition-colors">Mani&apos;s Story</Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition-colors"
              >
                About
              </button>
              <Link href="/privacy" className="hover:text-gray-200 transition-colors">Privacy</Link>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>
                © 2024 The Beating Edge with Mani+. All rights reserved.
              </p>
              <p>
                Medical information shared on this podcast is for educational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// Server-side data fetching with ISR (Incremental Static Regeneration)
// Fetches episodes at build time and revalidates every hour
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const feedData = await fetchRSSFeed();
    const sortedEpisodes = sortEpisodesByDate(feedData.episodes);
    
    return {
      props: {
        initialEpisodes: sortedEpisodes,
        episodeCount: sortedEpisodes.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching RSS feed for SSR:', error);
    
    return {
      props: {
        initialEpisodes: sortEpisodesByDate(fallbackEpisodes),
        episodeCount: fallbackEpisodes.length
      },
      revalidate: 600
    };
  }
}
