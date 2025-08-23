import React from 'react';
import Head from 'next/head';
import { Header, Section, Card } from '@/components';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Beating Edge with Mani+</title>
        <meta 
          name="description" 
          content="Privacy Policy for The Beating Edge podcast. Learn how we protect your personal information and respect your privacy when you interact with our content and community." 
        />
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-red-400">Privacy</span>{' '}
              <span className="text-green-400">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Your privacy matters to us. Here&apos;s how we protect your personal information 
              and respect your privacy when you engage with The Beating Edge community.
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <Section background="gradient-gray">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" className="mb-8">
              <div className="text-center">
                <p className="text-gray-400">
                  <strong>Last Updated:</strong> January 2024
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This Privacy Policy may be updated from time to time. We will notify you of any material changes.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Privacy Sections */}
        <Section background="black">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Information We Collect */}
            <div>
              <h2 className="text-3xl font-bold text-red-400 mb-6">Information We Collect</h2>
              <Card variant="default">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Personal Information You Provide</h3>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Email addresses when you subscribe to our newsletter</li>
                      <li>Name and contact information when you submit guest applications or contact us</li>
                      <li>Medical stories and experiences you choose to share</li>
                      <li>Comments and feedback you provide</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Website usage data and analytics</li>
                      <li>Device information and browser type</li>
                      <li>IP address and location data (aggregated and anonymized)</li>
                      <li>Podcast listening statistics</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-3xl font-bold text-green-400 mb-6">How We Use Your Information</h2>
              <Card variant="default">
                <div className="space-y-4">
                  <ul className="text-gray-300 space-y-3 list-disc list-inside">
                    <li><strong>Communication:</strong> To send you episode updates, newsletters, and respond to your inquiries</li>
                    <li><strong>Content Creation:</strong> To feature guest stories and experiences (with explicit consent)</li>
                    <li><strong>Website Improvement:</strong> To analyze usage patterns and improve user experience</li>
                    <li><strong>Community Building:</strong> To connect patients, healthcare professionals, and advocates</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Medical Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Medical Information & Stories</h2>
              <Card variant="gradient">
                <div className="space-y-4">
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">⚠️ Important Notice</h3>
                    <p className="text-gray-300">
                      Any medical information or personal health stories you share with us will only be used 
                      with your explicit written consent. We will never share your medical information 
                      without your permission.
                    </p>
                  </div>
                  
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>All medical stories are anonymized unless you specifically request otherwise</li>
                    <li>You can request removal of your story at any time</li>
                    <li>We do not provide medical advice or replace professional medical care</li>
                    <li>Stories are for educational and inspirational purposes only</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="text-3xl font-bold text-red-400 mb-6">Information Sharing</h2>
              <Card variant="default">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    We <strong>DO NOT</strong> sell, rent, or trade your personal information. We may share 
                    your information only in these limited circumstances:
                  </p>
                  
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li><strong>With Your Consent:</strong> When you explicitly agree to share your story or information</li>
                    <li><strong>Service Providers:</strong> With trusted third parties who help us operate the podcast (email services, analytics)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>Aggregated Data:</strong> Anonymous, aggregated statistics that cannot identify individuals</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-3xl font-bold text-green-400 mb-6">Your Privacy Rights</h2>
              <Card variant="default">
                <div className="space-y-4">
                  <p className="text-gray-300">You have the right to:</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-400/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">Access & Update</h4>
                      <p className="text-gray-300 text-sm">Request access to your personal information and update or correct it</p>
                    </div>
                    
                    <div className="bg-red-400/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Delete</h4>
                      <p className="text-gray-300 text-sm">Request deletion of your personal information and stories</p>
                    </div>
                    
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Opt-Out</h4>
                      <p className="text-gray-300 text-sm">Unsubscribe from communications at any time</p>
                    </div>
                    
                    <div className="bg-gray-500/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-400 mb-2">Portability</h4>
                      <p className="text-gray-300 text-sm">Request a copy of your information in a portable format</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Data Security</h2>
              <Card variant="default">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Encrypted data transmission (HTTPS/SSL)</li>
                    <li>Secure storage with limited access</li>
                    <li>Regular security audits and updates</li>
                    <li>Staff training on privacy and security practices</li>
                  </ul>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">
                      <strong>Note:</strong> While we strive to protect your information, no method of transmission 
                      over the internet is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-red-400 mb-6">Contact Us</h2>
              <Card variant="gradient">
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    If you have any questions about this Privacy Policy or how we handle your information, 
                    please don&apos;t hesitate to contact us.
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-white font-semibold">Privacy Questions & Requests</p>
                    <Link href="/contact" className="text-green-400 hover:text-green-300 transition-colors">
                      Contact us through our contact form
                    </Link>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-4">
                    We will respond to privacy-related inquiries within 30 days.
                  </p>
                </div>
              </Card>
            </div>

          </div>
        </Section>
      </main>
    </>
  );
}
