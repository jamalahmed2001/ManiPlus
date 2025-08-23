import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Header, Section, Card, Button, EpisodeCard, Newsletter, PodcastStructuredData } from '@/components';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlayingEpisode, setCurrentPlayingEpisode] = useState<string | null>(null);
  const [statsCounter, setStatsCounter] = useState({ episodes: 0, listeners: 0, countries: 0 });
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const timer = setTimeout(() => {
      setStatsCounter({ episodes: 25, listeners: 10000, countries: 45 });
    }, 1000);

    // Handle hash-based navigation
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Wait a bit for the page to render, then scroll
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    };

    // Handle hash on initial load
    handleHashNavigation();

    // Handle hash changes
    const handleRouteChange = () => {
      handleHashNavigation();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Episode data
  const episodes = [
    {
      id: '1',
      title: 'The Day Everything Changed',
      description: 'Mani+ opens up about his journey from diagnosis to heart transplant, sharing the raw emotions, unexpected challenges, and profound gratitude that shaped his perspective on life and medicine.',
      duration: '45 minutes',
      releaseDate: 'January 15, 2024',
      episodeNumber: 'EP 001',
      color: 'red' as const
    },
    {
      id: '2', 
      title: 'Dr. Sarah Chen on Breakthrough Immunosuppression',
      description: 'Leading transplant immunologist Dr. Sarah Chen discusses revolutionary new protocols that are reducing rejection rates while minimizing long-term medication side effects, offering hope for better patient outcomes.',
      duration: '52 minutes',
      releaseDate: 'January 22, 2024',
      episodeNumber: 'EP 002',
      color: 'green' as const
    },
    {
      id: '3',
      title: "Maria's Marathon - Running with a New Heart", 
      description: 'Heart transplant recipient Maria Torres shares her incredible journey from ICU to completing her first marathon just 18 months post-transplant, proving that limitation is often just a state of mind.',
      duration: '38 minutes',
      releaseDate: 'January 29, 2024', 
      episodeNumber: 'EP 003',
      color: 'white' as const
    }
  ];

  const handlePlayEpisode = (episodeId: string) => {
    setCurrentPlayingEpisode(episodeId);
    // Simulate playing for 3 seconds
    setTimeout(() => {
      setCurrentPlayingEpisode(null);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>The Beating Edge with Mani+ | Transformative Healthcare Stories & Medical Insights</title>
        <meta name="description" content="When hearts whisper, we listen. Intimate conversations from hospital rooms, dialysis chairs, and the quiet moments when everything changes. The stories that live between the medical charts." />
        <meta name="keywords" content="heart transplant podcast, dialysis stories, medical podcast, healthcare stories, patient advocacy, transplant recipient, chronic illness, medical innovation, healthcare professionals, patient journey, organ transplant, kidney failure, medical research, health podcast" />
        <meta name="author" content="Mani+" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thebeatingedge.com/" />
        <meta property="og:title" content="The Beating Edge with Mani+ | Healthcare Stories That Transform Lives" />
        <meta property="og:description" content="The conversations that happen in hospital rooms, dialysis chairs, and the quiet moments when everything changes. Where medicine meets the stories we don&apos;t always tell." />
        <meta property="og:image" content="/mani+logo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thebeatingedge.com/" />
        <meta property="twitter:title" content="The Beating Edge with Mani+ | Healthcare Stories That Transform Lives" />
        <meta property="twitter:description" content="The conversations that happen in hospital rooms and the quiet moments when everything changes." />
        <meta property="twitter:image" content="/mani+logo.png" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://thebeatingedge.com/" />
      </Head>

      <PodcastStructuredData
        episodes={episodes.map(ep => ({
          name: `${ep.episodeNumber}: ${ep.title}`,
          description: ep.description,
          url: `https://thebeatingedge.com/episodes/${ep.id}`,
          datePublished: ep.releaseDate.replace(/(\w+) (\d+), (\d+)/, '$3-$1-$2'),
          duration: ep.duration,
          episodeNumber: parseInt(ep.id)
        }))}
      />

      <Header />

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black pt-16">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
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
              <span className="text-white drop-shadow-xl">When Hearts Whisper, We Listen</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              The conversations that happen in hospital rooms, dialysis chairs, and the quiet moments when everything changes. This is where medicine meets the stories we don&apos;t always tell.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-400">{statsCounter.episodes}+</div>
                <div className="text-sm text-gray-400">Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">{statsCounter.listeners.toLocaleString()}+</div>
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
                  <span className="text-green-400">Meet</span> <span className="text-red-400">Mani+</span>
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
                <div className="bg-gradient-to-br from-red-500/20 to-green-400/20 p-8 rounded-2xl backdrop-blur-sm border border-gray-800">
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
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-700"></span>
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
              <span className="text-red-400">What We</span> <span className="text-green-400">Explore</span>
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
                  <h3 className="text-xl font-bold text-green-400 mb-3">Medical Insights</h3>
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

        {/* Latest Episodes Section */}
        <Section background="gradient-gray" id="episodes">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-red-400">Latest</span> <span className="text-green-400">Episodes</span>
            </h2>

            <div className="space-y-6">
              {episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  onPlay={handlePlayEpisode}
                  isPlaying={currentPlayingEpisode === episode.id}
                />
              ))}
            </div>
        </Section>

        {/* Subscribe Section */}
        <Section background="gradient-red-green" id="subscribe">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-red-400">Never Miss</span> <span className="text-green-400">A Beat</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join others who know that the most important conversations happen in quiet moments — 
                when hearts learn to listen and stories find their voice.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  <span className="text-green-400">🎵</span> Spotify
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  <span className="text-purple-400">🍎</span> Apple Podcasts
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  <span className="text-orange-400">🎧</span> Google Podcasts
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  <span className="text-red-400">📱</span> RSS Feed
                </Button>
              </div>

              <Newsletter />
            </div>
        </Section>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">
                <span className="text-red-400">The Beating Edge</span> <span className="text-gray-400">with</span> <span className="text-green-400">Mani+</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              For the whispered fears in waiting rooms, the courage found in unexpected places, and the wisdom that emerges when hearts learn to listen.
              Every heartbeat carries a story. Every story deserves to be heard.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400 mb-6">
              <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
              <Link href="/story" className="hover:text-green-400 transition-colors">Mani&apos;s Story</Link>
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
