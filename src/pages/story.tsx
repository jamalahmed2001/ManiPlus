import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Header, Section, Card, Button } from '@/components';
import Link from 'next/link';

export default function Story() {
  return (
    <>
      <Head>
        <title>Mani&apos;s Story | The Beating Edge</title>
        <meta 
          name="description" 
          content="The incredible journey of Mani+, from heart failure to heart transplant, kidney failure to dialysis, and the birth of The Beating Edge podcast. A story of resilience, hope, and finding purpose in the face of medical challenges." 
        />
        <meta name="keywords" content="heart transplant, dialysis, kidney failure, medical story, patient journey, transplant recipient, chronic illness, resilience, hope, medical podcast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-black text-white pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="mb-8">
              <Image 
                src="/mani+logo.png" 
                width={128}
                height={64}
                alt="Mani+ Logo" 
                className="w-32 h-auto mx-auto drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-red-400">From Patient</span>{' '}
              <span className="text-green-400">to Podcaster</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              This is the story of how two life-altering medical events transformed me 
              from a patient fighting for survival into a voice for the medical community.
            </p>
          </div>
        </section>

        {/* Part 1: The Whisper */}
        <Section background="black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-red-400">Part 1:</span> The Whisper
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-green-400 mx-auto"></div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                <p>
                  When my heart began to fail, it didn&apos;t announce itself with a dramatic crash. 
                  It was quieter than that — a breath I couldn&apos;t quite catch, stairs that felt 
                  steeper than they used to, a kind of tiredness that sleep didn&apos;t fix.
                </p>
                <p>
                  The doctors called it congestive heart failure, also left side ventricle like 
                  it was some technical glitch. But to me, it felt like my body had started 
                  whispering a secret it had been holding for years: something&apos;s not right.
                </p>
                <p>
                  At first, I ignored it. I pushed through, like I always did. I told myself I 
                  was just getting older. Just tired. Just busy. But then came the night I 
                  couldn&apos;t get out of bed without feeling like I was drowning in air. That was 
                  the night my denial ran out.
                </p>
                <p>
                  The hospital lights were too bright. The monitors beeped like they were keeping 
                  time for a song I didn&apos;t know the words to. I watched nurses move around me 
                  like I was part of a machine — a thing to stabilize. But inside, I was unraveling.
                </p>
                <p className="text-red-400 font-medium italic border-l-4 border-red-400 pl-6">
                  What no one tells you is that when your heart begins to fail, so do all the 
                  illusions you had about being invincible. The plans. The independence. The idea 
                  that there will always be time later.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Chapter 1: The Beginning */}
        <Section background="gradient-gray">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-red-400">Part 2:</span> The Diagnosis
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-green-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <Card variant="gradient">
                <div className="text-center">
                  <div className="text-6xl mb-4">💔</div>
                  <h3 className="text-xl font-bold text-white mb-2">Heart Failure Diagnosis</h3>
                  <p className="text-gray-300">
                    Life was normal until it wasn&apos;t. The diagnosis came like a thunderbolt – 
                    my heart was failing, and without intervention, I had months to live.
                  </p>
                </div>
              </Card>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  I was living what I thought was a healthy life. Working, exercising, 
                  spending time with loved ones. But my body had other plans. The 
                  shortness of breath I&apos;d been ignoring, the fatigue I attributed to 
                  stress – they were all signs of something much more serious.
                </p>
                <p>
                  When the cardiologist delivered the news, time seemed to stop. 
                  &quot;Your heart is failing,&quot; he said. &quot;We need to talk about a transplant.&quot;
                </p>
                <blockquote className="border-l-4 border-red-400 pl-4 italic text-red-300">
                  &quot;In that moment, I realized that life isn&apos;t about the time you have – 
                  it&apos;s about what you do with whatever time you&apos;re given.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </Section>

        {/* Chapter 2: The Transplant */}
        <Section background="black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-green-400">Part 3:</span> A New Heart, A New Beginning
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-red-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  The wait for a heart transplant is unlike anything else. You&apos;re literally 
                  waiting for someone else&apos;s tragedy to become your salvation. The guilt, 
                  the gratitude, the fear – they all swirl together in ways that are 
                  impossible to describe to someone who hasn&apos;t been there.
                </p>
                <p>
                  When the call came at 3 AM, I knew this was it. Within hours, I was on 
                  an operating table, about to receive the greatest gift imaginable – 
                  a second chance at life.
                </p>
                <p>
                  The surgery was successful, but recovery was just the beginning. Learning 
                  to live with a new heart, managing anti-rejection medications, navigating 
                  the complex emotions of carrying someone else&apos;s heart – it was all 
                  overwhelming and miraculous at the same time.
                </p>
              </div>

              <Card variant="gradient">
                <div className="text-center">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-xl font-bold text-white mb-2">The Gift of Life</h3>
                  <p className="text-gray-300 mb-4">
                    On a cold winter morning, a stranger&apos;s ultimate act of generosity 
                    gave me a future I thought I&apos;d lost forever.
                  </p>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">
                      &quot;To the donor family: Your loved one&apos;s heart beats strong in my chest. 
                      Their legacy lives on through every life I touch, every story I share, 
                      every person I help through this podcast.&quot;
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* Chapter 3: The Next Challenge */}
        <Section background="gradient-gray">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-red-400">Part 4:</span> When Kidneys Fail
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-green-400 mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Just when I thought I had beaten the odds, life threw another curveball. 
                  The anti-rejection medications that kept my heart healthy were slowly 
                  damaging my kidneys. Three years after my heart transplant, I faced 
                  kidney failure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="hover" borderColor="red">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🏥</div>
                    <h4 className="font-bold text-white mb-2">Diagnosis</h4>
                    <p className="text-gray-400 text-sm">
                      Chronic kidney disease, stage 5. The medications that saved my heart 
                      were now threatening my kidneys.
                    </p>
                  </div>
                </Card>

                <Card variant="hover" borderColor="white">
                  <div className="text-center">
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="font-bold text-white mb-2">Dialysis</h4>
                    <p className="text-gray-400 text-sm">
                      Four times a week, four hours each session. Dialysis became my 
                      lifeline and my new routine.
                    </p>
                  </div>
                </Card>

                <Card variant="hover" borderColor="green">
                  <div className="text-3xl mb-3">💪</div>
                  <h4 className="font-bold text-white mb-2">Resilience</h4>
                  <p className="text-gray-400 text-sm">
                    I learned that strength isn&apos;t about not falling down – it&apos;s about 
                    getting up every time you do.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Section>

        {/* Chapter 4: Finding Purpose */}
        <Section background="black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-green-400">Part 5:</span> The Birth of The Beating Edge
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-red-400 mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Sitting in that dialysis chair for hours, four times a week, I had a lot 
                  of time to think. I met incredible people – fellow patients fighting their 
                  own battles, healthcare workers who were true heroes, doctors pushing the 
                  boundaries of what&apos;s possible.
                </p>
                <p className="text-lg text-red-400 font-semibold">
                  That&apos;s when I realized: these stories needed to be told.
                </p>
              </div>

              <Card variant="gradient" className="max-w-3xl mx-auto">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-white">The Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The Beating Edge isn&apos;t just a podcast – it&apos;s a platform for the voices 
                    that often go unheard in healthcare. It&apos;s where patients share their 
                    journeys, doctors explain breakthrough treatments, and researchers 
                    discuss what&apos;s on the horizon.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-500/10 p-4 rounded-lg">
                      <h4 className="font-bold text-red-400 mb-2">Patient Stories</h4>
                      <p className="text-gray-400">
                        Raw, honest conversations about living with chronic conditions, 
                        navigating the healthcare system, and finding hope in dark times.
                      </p>
                    </div>
                    <div className="bg-green-400/10 p-4 rounded-lg">
                      <h4 className="font-bold text-green-400 mb-2">Medical Insights</h4>
                      <p className="text-gray-400">
                        Leading specialists share their expertise, breakthrough research, 
                        and what the future holds for patient care.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* Current Chapter */}
        <Section background="gradient-red-green">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Today:</span> Living on The Beating Edge
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Today, I continue my journey with a transplanted heart and regular dialysis. 
              But I&apos;ve never felt more purposeful. Every episode we record, every story 
              we share, every connection we make in the medical community feels like 
              fulfilling the promise I made to my donor and to myself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg">
                  🎧 Listen to The Beating Edge
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  💬 Share Your Story
                </Button>
              </Link>
            </div>

            <div className="mt-12 p-6 bg-gray-900/50 rounded-xl max-w-2xl mx-auto">
              <p className="text-gray-400 italic">
                &quot;Every beat of this heart is borrowed time made meaningful. Every story we 
                share is a reminder that behind every medical statistic is a human being 
                with hopes, fears, dreams, and an incredible capacity for resilience.&quot;
              </p>
              <p className="text-white font-semibold mt-4">— Mani+</p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
