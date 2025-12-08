import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Image from 'next/image'
import { Header, Section, Card, Button } from '@/components'
import { generateStoryPageSEO, PersonStructuredData, BreadcrumbStructuredData } from '@/components/SEO'

export default function Story() {
  const breadcrumbItems = [
    {
      position: 1,
      name: 'Home',
      item: 'https://mani.plus'
    },
    {
      position: 2,
      name: "Mani+'s Story",
      item: 'https://mani.plus/story'
    }
  ]

  return (
    <>
      <NextSeo {...generateStoryPageSEO()} />
      
      <PersonStructuredData
        person={{
          name: "Mani+",
          description: "Heart transplant recipient, dialysis patient, health advocate, and storyteller sharing powerful healthcare stories",
          jobTitle: "Healthcare Advocate & Storyteller",
          worksFor: "The Beating Edge with Mani+"
        }}
      />
      
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <Section background="gradient-gray" className="pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-red-400">Mani&apos;s</span>{' '}
                <span className="text-green-400">Story</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A raw journey through heart failure, transplant, and dialysis — and how resilience, medicine, and innovation revealed the human spirit in healthcare. This mission is to amplify voices at the bedside and at the bench.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/20 to-green-400/20 p-8 rounded-2xl backdrop-blur-sm border border-gray-800">
                <Image 
                  src="/mani+logo.png" 
                  width={400}
                  height={200}
                  alt="Mani+ - Heart transplant recipient and podcast host" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* The Beginning */}
        <Section background="black">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">When Everything</span>{' '}
            <span className="text-red-400">Changed</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                My heart began to fail quietly — not with drama, but with whispers I tried to ignore. 
                The shortness of breath climbing stairs. The fatigue that sleep couldn&apos;t cure. The night 
                I woke up gasping, unable to breathe, knowing something fundamental had shifted.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Hospital lights became my new normal. Beeping monitors, the shuffle of nurses&apos; feet, 
                the weight of uncertainty pressing down on everything. Congestive heart failure, they said. 
                Your heart is tired. We need to help it, or find you a new one.
              </p>
              <blockquote className="border-l-4 border-red-400 pl-6 my-8">
                <p className="text-xl italic text-red-400">
                  &quot;When your heart begins to fail, so do the illusions about being invincible. 
                  But what emerges is something more powerful — the courage to share what we&apos;ve learned in the darkness.&quot;
                </p>
              </blockquote>
            </Card>
          </div>
        </Section>

        {/* The Transplant Journey */}
        <Section background="gradient-gray">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-green-400">A New</span>{' '}
            <span className="text-white">Beginning</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">The Call</h3>
              <p className="text-gray-300 leading-relaxed">
                3:47 AM. The phone rings with the news every transplant patient both hopes for and fears: 
                &quot;We have a heart for you.&quot; Someone else&apos;s tragedy became my second chance. 
                The weight of that gift — the responsibility, the gratitude, the complex emotions — 
                it changes you in ways medical textbooks can&apos;t capture.
              </p>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Recovery & Reality</h3>
              <p className="text-gray-300 leading-relaxed">
                Recovery isn&apos;t a straight line. It&apos;s learning to live with someone else&apos;s heart, 
                daily medications, constant monitoring, and the knowledge that this gift comes with 
                an expiration date. But it also brings clarity about what truly matters — 
                the stories we tell, the connections we make, the hope we can offer others walking similar paths.
              </p>
            </Card>
          </div>
        </Section>

        {/* Dialysis Reality */}
        <Section background="black">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">The</span>{' '}
            <span className="text-red-400">Continuing Journey</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                The heart transplant was just the beginning. Kidney failure followed — another challenge, 
                another adaptation. Four times a week, I sit in dialysis chairs, connected to machines 
                that do what my kidneys can&apos;t. Three and a half hours at a time, watching my blood 
                cycle through filters, cleaning toxins my body can no longer handle alone.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                But here&apos;s what I discovered in those dialysis chairs: I wasn&apos;t alone. Around me sat 
                warriors — people fighting battles most of the world never sees. Veterans dealing with 
                service-related kidney disease. Mothers managing diabetes complications while raising families. 
                Elderly patients with stories spanning decades of medical challenges.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Each had a story. Each had wisdom earned through suffering. Each deserved to be heard.
              </p>
            </Card>
          </div>
        </Section>

        {/* The Mission */}
        <Section background="gradient-red-green">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-red-400">Why</span>{' '}
            <span className="text-green-400">The Beating Edge?</span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card variant="hover" className="p-6 text-center">
                <div className="text-4xl mb-4">🫀</div>
                <h3 className="text-xl font-bold text-red-400 mb-3">Amplify Voices</h3>
                <p className="text-gray-300">
                  Healthcare stories that usually remain whispered in hospital corridors 
                  deserve to be heard by the world.
                </p>
              </Card>
              
              <Card variant="hover" className="p-6 text-center">
                <div className="text-4xl mb-4">🩺</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Bridge Understanding</h3>
                <p className="text-gray-300">
                  Connect patients, families, and healthcare providers through 
                  shared experiences and mutual understanding.
                </p>
              </Card>
              
              <Card variant="hover" className="p-6 text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-white mb-3">Inspire Hope</h3>
                <p className="text-gray-300">
                  Show that even in our darkest medical moments, 
                  we can find strength, purpose, and reasons to keep going.
                </p>
              </Card>
            </div>
          </div>
        </Section>

        {/* Personal Details */}
        <Section background="black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-white">Living</span>{' '}
              <span className="text-green-400">The Reality</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">Daily Reality</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                    15+ medications daily
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                    Dialysis 4 times per week
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                    Regular cardiac monitoring
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                    Ongoing transplant follow-up
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">What I&apos;ve Learned</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    Vulnerability is strength
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    Every day is borrowed time
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    Community heals as much as medicine
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    Stories have the power to save lives
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <Section background="gradient-gray">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-red-400">Join</span>{' '}
              <span className="text-green-400">The Conversation</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              If you have a healthcare story that deserves to be heard, if you&apos;re walking 
              a similar path, or if you simply believe in the power of authentic human connection 
              in medicine — I&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg" icon="📧">
                  Share Your Story
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" icon="🎧">
                  Listen to Episodes
                </Button>
              </Link>
            </div>
          </div>
        </Section>

        {/* Footer Note */}
        <Section background="black" className="py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 italic">
              &quot;Where resilience meets medicine, innovation serves humanity, and the human spirit transforms healthcare. 
              Every conversation advances care. Every story builds understanding.&quot;
            </p>
            <p className="text-gray-500 mt-4">— Mani+</p>
          </div>
        </Section>
      </main>
    </>
  )
}