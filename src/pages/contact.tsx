import React, { useState } from 'react';
import Head from 'next/head';
import { Header, Section, Card, Button } from '@/components';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement actual form submission API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | The Beating Edge with Mani+</title>
        <meta 
          name="description" 
          content="Get in touch with The Beating Edge podcast. Share your story, suggest guests, ask questions, or connect with our community of patients, healthcare professionals, and advocates." 
        />
        <meta name="keywords" content="contact, patient stories, healthcare podcast, medical stories, transplant stories, guest suggestions, podcast contact" />
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
              <span className="text-red-400">Let&apos;s</span>{' '}
              <span className="text-green-400">Connect</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Your story lives in the spaces between diagnosis and hope, in the quiet moments 
              when everything changes. Whether you&apos;re a patient who understands the whisper 
              of failing hearts, a healthcare worker who holds space for others&apos; pain, or 
              someone with wisdom born from unexpected places — we want to listen.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <Section background="gradient-gray">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card variant="hover" borderColor="red">
              <div className="text-center">
                <div className="text-4xl mb-4">🎙️</div>
                <h3 className="text-xl font-bold text-red-400 mb-3">Share Your Story</h3>
                <p className="text-gray-300 mb-4">
                  Your journey through illness, treatment, or recovery holds wisdom that others 
                  need to hear. The courage found in hospital beds, the strength discovered in 
                  vulnerability — these stories matter.
                </p>
                <div className="text-sm text-gray-400">
                  Select &quot;Guest Application&quot; in the form below
                </div>
              </div>
            </Card>

            <Card variant="hover" borderColor="green">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Healthcare Professionals</h3>
                <p className="text-gray-300 mb-4">
                  You&apos;ve held space for others&apos; pain, celebrated small victories, and witnessed 
                  the profound moments when medicine meets humanity. Share what you&apos;ve learned 
                  in those sacred spaces.
                </p>
                <div className="text-sm text-gray-400">
                  Select &quot;Professional Inquiry&quot; below
                </div>
              </div>
            </Card>

            <Card variant="hover" borderColor="white">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-white mb-3">General Inquiries</h3>
                <p className="text-gray-300 mb-4">
                  Questions about episodes, feedback, partnership opportunities, 
                  or just want to say hello.
                </p>
                <div className="text-sm text-gray-400">
                  Select &quot;General Inquiry&quot; below
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Contact Form */}
        <Section background="black">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <Card variant="gradient" className="text-center">
                <div className="space-y-6">
                  <div className="text-6xl">✨</div>
                  <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your message has been received. We read every single message and will 
                    get back to you as soon as possible. Thank you for being part of 
                    The Beating Edge community.
                  </p>
                  <Link href="/">
                    <Button variant="primary">
                      🎧 Back to Episodes
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <Card variant="default">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Get In Touch</h2>
                  <p className="text-gray-400">
                    Fill out the form below and we&apos;ll get back to you within 24-48 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                      Type of Inquiry
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="guest">Guest Application - Share My Story</option>
                      <option value="professional">Healthcare Professional - Medical Expertise</option>
                      <option value="partnership">Partnership/Collaboration</option>
                      <option value="feedback">Feedback/Suggestions</option>
                      <option value="media">Media/Press Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder={
                        formData.type === 'guest' 
                          ? "Tell us about your medical journey, what you'd like to share, and why your story would resonate with our audience..."
                          : formData.type === 'professional'
                          ? "Share your area of expertise, recent research, or topics you'd like to discuss on the show..."
                          : "Tell us more about your inquiry..."
                      }
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy and will never share your information. 
                    Response time is typically 24-48 hours.
                  </p>
                </form>
              </Card>
            )}
          </div>
        </Section>

        {/* Additional Contact Info */}
        <Section background="gradient-gray">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Other Ways to Connect</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">For Urgent Medical Questions</h4>
                <p className="text-gray-300 text-sm">
                  Please contact your healthcare provider directly. The Beating Edge is for 
                  educational and inspirational purposes only and cannot provide medical advice.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Social Media</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Follow us for episode updates and community discussions
                </p>
                <div className="flex justify-center gap-4">
                  <span className="text-gray-500">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
