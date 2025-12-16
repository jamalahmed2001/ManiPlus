import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Header, Section, Card, Button } from '@/components'
import { generateCharityPageSEO, siteConfig } from '@/utils/seo'
import { BreadcrumbStructuredData } from '@/components/SEO'

export default function Charity() {

  const breadcrumbItems = [
    {
      position: 1,
      name: 'Home',
      item: siteConfig.siteUrl
    },
    {
      position: 2,
      name: 'Charity Partners',
      item: `${siteConfig.siteUrl}/charity`
    }
  ]

  const charityStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Charity Partners - The Beating Edge",
    "url": `${siteConfig.siteUrl}/charity`,
    "description": "Learn about the charities we support and work with to make a difference in organ transplant care and patient support.",
    "relatedLink": [
      "https://www.kidneyresearchuk.org/andycolefund/mystory",
      "https://www.newstartcharity.org"
    ]
  }

  return (
    <>
      <NextSeo {...generateCharityPageSEO()} />
      
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(charityStructuredData)
        }}
      />

      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <Section background="gradient-gray" className="pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="text-green-400 font-semibold">🤝 Supporting Change Together</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Charity</span>{' '}
              <span className="text-green-400">Partners</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Working alongside organizations making a real difference in organ transplant care, 
              research, and patient support. Learn about the charities we support and how you can help.
            </p>
          </div>
        </Section>

        {/* Our Mission Section */}
        <Section background="black">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">Our</span>{' '}
              <span className="text-white">Mission</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Through The Beating Edge with Mani+, we raise awareness about organ transplantation 
              and support charities dedicated to helping patients and advancing medical research.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card variant="default">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  As a heart transplant recipient and dialysis patient, I understand firsthand the 
                  challenges patients face. Through this platform, we aim to shine a light on 
                  organizations doing incredible work in the organ transplant community.
                </p>
                <p>
                  We partner with established charities that support kidney research, patient care, 
                  and families navigating the transplant journey. Every story we share, every 
                  conversation we have, helps build awareness and understanding.
                </p>
                <p className="text-green-400 font-semibold">
                  Together, we can make a difference — one story, one conversation, one heartbeat at a time.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Partner Charities Section */}
        <Section background="gradient-gray" id="charities">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Featured</span>{' '}
              <span className="text-green-400">Charities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These organizations are doing vital work in organ transplant research, patient support, 
              and advancing life-saving care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card variant="hover" borderColor="green">
                <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-2xl font-bold text-green-400 mb-3">
                  Kidney Research UK
                </h3>
                <p className="text-lg text-white mb-2">Andy Cole Fund</p>
                </div>
              <div className="space-y-4 mb-6 text-gray-300">
                <p>
                  Kidney Research UK funds research into the prevention, treatment and management 
                  of kidney disease. The Andy Cole Fund specifically supports kidney patients and 
                  advances kidney transplant research.
                </p>
                <p>
                  Andy Cole, the legendary footballer, became an advocate after his own kidney 
                  transplant journey, using his platform to raise awareness and support research.
                </p>
                    </div>
              <a 
                href="https://www.kidneyresearchuk.org/andycolefund/mystory" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="secondary" size="lg" className="w-full" icon="🔗">
                  Visit Kidney Research UK
                </Button>
              </a>
              </Card>

            <Card variant="hover" borderColor="white">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🫀</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  New Start Charity
                </h3>
                <p className="text-lg text-gray-400 mb-2">Supporting Transplant Patients</p>
              </div>
              <div className="space-y-4 mb-6 text-gray-300">
                <p>
                  New Start Charity is dedicated to supporting organ transplant patients and their 
                  families throughout their journey. They provide resources, support networks, and 
                  assistance during one of life&apos;s most challenging times.
                </p>
                <p>
                  Their work helps patients navigate the complexities of transplantation and 
                  provides vital support when it&apos;s needed most.
                </p>
              </div>
              <a 
                href="https://www.newstartcharity.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" size="lg" className="w-full" icon="🔗">
                  Visit New Start Charity
                </Button>
              </a>
              </Card>
            </div>
        </Section>

        {/* How You Can Help */}
        <Section background="black" id="help">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-red-400">How You</span>{' '}
              <span className="text-white">Can Help</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              There are many ways to support the organ transplant community and make a real difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card variant="hover" borderColor="green">
              <div className="text-center">
                <div className="text-5xl mb-4">💚</div>
                <h3 className="text-2xl font-bold text-green-400 mb-3">Donate Directly</h3>
                <p className="text-gray-300 mb-6">
                  Visit the partner charity websites to make a direct donation. Your contribution 
                  supports vital research and patient care programs.
                </p>
              </div>
            </Card>

            <Card variant="hover" borderColor="red">
              <div className="text-center">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3">Become a Donor</h3>
                <p className="text-gray-300 mb-6">
                  Register as an organ donor and potentially save lives. It&apos;s the ultimate 
                  gift and takes just minutes to sign up.
                </p>
              </div>
            </Card>

            <Card variant="hover" borderColor="white">
              <div className="text-center">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-2xl font-bold text-white mb-3">Spread Awareness</h3>
                <p className="text-gray-300 mb-6">
                  Share patient stories, educate others about organ donation, and help break down 
                  the stigma around transplantation.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Why This Matters */}
        <Section background="gradient-gray">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Why This</span>{' '}
              <span className="text-green-400">Matters</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the impact of organ transplantation and research
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card variant="default">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Research Saves Lives</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Medical research into kidney disease, transplant rejection, and immunosuppression 
                  is constantly improving outcomes. Organizations like Kidney Research UK fund 
                  groundbreaking studies that lead to better treatments and longer, healthier lives 
                  for transplant recipients.
                </p>
              </div>
            </Card>

            <Card variant="default">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Support Makes a Difference</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  The transplant journey is challenging — emotionally, physically, and financially. 
                  Patient support organizations provide vital resources, guidance, and community for 
                  those navigating this difficult path. No one should face it alone.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section background="black">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Frequently Asked</span>{' '}
              <span className="text-green-400">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card variant="default">
              <h3 className="text-xl font-bold text-white mb-3">How can I donate to these charities?</h3>
              <p className="text-gray-300 leading-relaxed">
                Visit the charity websites directly using the links provided above. Each organization 
                has secure donation platforms where you can contribute and learn more about their specific programs.
              </p>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-bold text-white mb-3">Why are you featuring these specific charities?</h3>
              <p className="text-gray-300 leading-relaxed">
                These organizations align with our mission and are doing impactful work in the organ 
                transplant community. As a heart transplant recipient and dialysis patient, I&apos;ve seen 
                firsthand the importance of research and patient support.
              </p>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-bold text-white mb-3">How does The Beating Edge support these charities?</h3>
              <p className="text-gray-300 leading-relaxed">
                We raise awareness through our podcast, share patient stories, and direct listeners to 
                these organizations. Our platform amplifies their message and helps connect people who 
                want to help with charities making a difference.
              </p>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-bold text-white mb-3">Can I suggest other charities to feature?</h3>
              <p className="text-gray-300 leading-relaxed">
                Absolutely! We&apos;re always looking to highlight organizations doing meaningful work 
                in organ transplantation and patient care. <Link href="/contact" className="text-green-400 hover:text-green-300">Contact us</Link> with 
                your suggestions.
              </p>
            </Card>
          </div>
        </Section>


        {/* Final CTA */}
        <Section background="gradient-red-green">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Together, We</span>{' '}
              <span className="text-green-400">Make a Difference</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Every transplant is a miracle made possible by medical research, dedicated healthcare 
              professionals, and compassionate communities. Support these charities and help create 
              second chances for patients and families facing life&apos;s biggest challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#charities">
                <Button variant="primary" size="lg" icon="🫀">
                  View Charities
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="ghost" size="lg" icon="✉️">
                  Contact Us
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-300 mt-8 italic">
              &quot;Through sharing stories and supporting meaningful causes, we can help build 
              a better future for the transplant community.&quot; — Mani+
            </p>
          </div>
        </Section>

        {/* Footer Note */}
        <Section background="black" className="py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              The Beating Edge with Mani+ is a podcast platform dedicated to raising awareness about 
              organ transplantation and supporting established charities in this space. We do not directly 
              collect or process donations.
            </p>
            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <span>•</span>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  )
}

