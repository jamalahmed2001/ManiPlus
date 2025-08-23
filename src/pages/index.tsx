import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>The Beating Edge with Mani+ | Health & Transplant Stories</title>
        <meta name="description" content="Join Mani+, a heart transplant recipient and dialysis patient, as he interviews doctors, health professionals, and fellow patients sharing their inspiring journeys and medical insights." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Microphone SVG */}
            <div className="mb-8 flex justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-red-400 drop-shadow-2xl">
                <defs>
                  <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M60 20 C50 20, 42 28, 42 38 L42 62 C42 72, 50 80, 60 80 C70 80, 78 72, 78 62 L78 38 C78 28, 70 20, 60 20 Z" 
                      fill="currentColor" filter="url(#neonGlow)" />
                <path d="M30 62 C30 82, 46 98, 66 98 L66 108 L54 108 L54 114 L66 114 L66 114" 
                      fill="none" stroke="currentColor" strokeWidth="4" filter="url(#neonGlow)" />
                <path d="M90 62 C90 82, 74 98, 54 98" 
                      fill="none" stroke="currentColor" strokeWidth="4" filter="url(#neonGlow)" />
                <path d="M46 38 L46 44 M46 50 L46 56 M74 38 L74 44 M74 50 L74 56" 
                      stroke="currentColor" strokeWidth="2" />
                {/* Heartbeat line */}
                <path d="M10 60 L25 60 L30 45 L35 75 L40 30 L45 90 L50 60 L90 60 L95 45 L100 75 L105 60 L110 60" 
                      fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-red-400 drop-shadow-2xl font-extrabold tracking-wider">THE BEATING EDGE</span>
              <br />
              <span className="text-gray-300 text-3xl md:text-4xl lg:text-5xl font-light">with</span>
              <br />
              <span className="text-green-400 drop-shadow-2xl font-extrabold tracking-wider animate-pulse">Mani+</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Raw, honest conversations about life after heart transplant, kidney failure, and the resilience of the human spirit
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                🎧 Listen Now
              </button>
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                📖 Read Mani+&#39;s Story
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg width="24" height="24" fill="none" stroke="currentColor" className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* About Mani+ Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-green-400">Meet</span> <span className="text-red-400">Mani+</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Life changed forever when my heart began to fail. After receiving a life-saving heart transplant, 
                    I thought the hardest part was behind me. Then came kidney failure and the reality of dialysis 
                    four times a week.
                  </p>
                  <p>
                    But I discovered something powerful in these challenges: every patient, every doctor, every 
                    healthcare worker has a story that needs to be heard. Stories of resilience, innovation, 
                    hope, and the incredible advances in modern medicine.
                  </p>
                  <p className="text-red-400 font-semibold">
                    The Beating Edge isn&#39;t just about surviving – it&#39;s about thriving and sharing the wisdom 
                    gained along the way.
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
                      <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                      <span className="text-gray-300">Dialysis Patient (4x/week)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-700"></span>
                      <span className="text-gray-300">Health Advocate & Storyteller</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-red-400">What We</span> <span className="text-green-400">Explore</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Deep conversations that matter, with the people who know medicine from the inside out
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-400/50 transition-all duration-300 group hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🫀</div>
                <h3 className="text-xl font-bold text-red-400 mb-3">Patient Stories</h3>
                <p className="text-gray-300">Real experiences from transplant recipients, chronic illness warriors, and those navigating complex medical journeys.</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 group hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Medical Insights</h3>
                <p className="text-gray-300">Leading doctors and specialists share breakthrough treatments, research, and what&#39;s on the horizon for patient care.</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💪</div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">Living Fully</h3>
                <p className="text-gray-300">Practical advice on thriving with chronic conditions, from mental health to daily life hacks that actually work.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-red-400">Latest</span> <span className="text-green-400">Episodes</span>
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-red-400/30 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      EP 001: The Day Everything Changed
                    </h3>
                    <p className="text-gray-400 mb-2">Mani+ shares his personal journey from diagnosis to transplant, and the unexpected challenges that followed.</p>
                    <div className="text-sm text-gray-500">45 minutes • Released Jan 15, 2024</div>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors">
                    ▶ Play
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/30 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      EP 002: Dr. Sarah Chen on Breakthrough Immunosuppression
                    </h3>
                    <p className="text-gray-400 mb-2">Leading transplant immunologist discusses new protocols reducing rejection while minimizing side effects.</p>
                    <div className="text-sm text-gray-500">52 minutes • Released Jan 22, 2024</div>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors">
                    ▶ Play
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-400/30 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      EP 003: Maria&#39;s Marathon - Running with a New Heart
                    </h3>
                    <p className="text-gray-400 mb-2">Heart transplant recipient Maria Torres on how she went from ICU to completing her first marathon in 18 months.</p>
                    <div className="text-sm text-gray-500">38 minutes • Released Jan 29, 2024</div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors">
                    ▶ Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-20 bg-gradient-to-r from-red-500/10 via-black to-green-400/10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-red-400">Never Miss</span> <span className="text-green-400">A Beat</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get notified when new episodes drop and join a community that understands the journey.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <span className="text-green-400">🎵</span> Spotify
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <span className="text-purple-400">🍎</span> Apple Podcasts
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <span className="text-orange-400">🎧</span> Google Podcasts
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <span className="text-red-400">📱</span> RSS Feed
              </Link>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Stay Connected</h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors"
                />
                <button className="w-full bg-gradient-to-r from-red-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-green-500 transition-all duration-300">
                  Subscribe for Updates
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">
                <span className="text-red-400">The Beating Edge</span> <span className="text-gray-400">with</span> <span className="text-green-400">Mani+</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Sharing stories of resilience, medical innovation, and the human spirit in healthcare.
              Every heartbeat tells a story.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <Link href="#" className="hover:text-red-400 transition-colors">Contact</Link>
              <Link href="#" className="hover:text-green-400 transition-colors">About</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Privacy</Link>
            </div>
            <p className="text-gray-600 text-sm mt-6">
              © 2024 The Beating Edge with Mani+. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
