import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when menu closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = 'unset';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Small delay to ensure menu closes and scroll is restored before navigating
    setTimeout(() => {
    if (router.pathname === '/') {
      // If we're on the homepage, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage with anchor
      void router.push(`/#${sectionId}`);
    }
    }, 150);
  };

  return (
    <>
    <header
      className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/mani+logo.png" 
              width={120}
              height={60}
              alt="The Beating Edge with Mani+ Logo" 
              className="h-8 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <span className="font-bold text-white hidden lg:block">
              <span className="text-red-400">The Beating Edge</span>{' '}
              <span className="text-gray-400">with</span>{' '}
              <span className="text-green-500">Mani+</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
          <button
              onClick={() => navigateToSection('about')}
              className="text-gray-300 hover:text-green-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigateToSection('episodes')}
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              Episodes
            </button>
         
            <Link href="/story" className="text-gray-300 hover:text-white transition-colors">
              Mani&apos;s Story
            </Link>
            <Link href="/charity" className="text-gray-300 hover:text-red-400 transition-colors">
              Charity
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateToSection('subscribe')}
            >
              🎧 Subscribe
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-red-400 transition-colors duration-200 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with fade-in animation */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] md:hidden opacity-0 animate-[fadeIn_0.3s_ease-out_forwards] will-change-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel - Full Screen Immersive */}
            <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-black z-[60] md:hidden opacity-0 translate-y-[-20px] animate-[slideIn_0.4s_ease-out_0.1s_forwards] will-change-transform">
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-6 py-8 overflow-y-auto">
                {/* Close Button - Top Right */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-red-400 transition-all duration-200 p-2 rounded-lg hover:bg-white/5 active:scale-95 opacity-0 animate-[fadeIn_0.3s_ease-out_0.2s_forwards] z-10"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Podcast Branding */}
                <div className="flex flex-col items-center mb-8 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.25s_forwards]">
                  <div className="relative">
                    {/* Logo Image */}
                    <div className="flex items-center justify-center">
                      <Image 
                        src="/mani+logo.png" 
                        width={280}
                        height={140}
                        alt="The Beating Edge with Mani+ Logo" 
                        className="w-48 sm:w-56 h-auto opacity-0 scale-95 animate-[scaleIn_0.5s_ease-out_0.3s_forwards] drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Links - Centered */}
                <nav className="flex flex-col items-center gap-4 mb-8 w-full">
                  <button
                    onClick={() => navigateToSection('episodes')}
                    className="text-lg text-white hover:text-red-500 transition-all duration-300 text-center py-3 w-full opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.65s_forwards] hover:scale-105"
                  >
                    Episodes
                  </button>
                  <button
                    onClick={() => navigateToSection('about')}
                    className="text-lg text-white hover:text-green-500 transition-all duration-300 text-center py-3 w-full opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.7s_forwards] hover:scale-105"
                  >
                    About
                  </button>
                  <Link 
                    href="/story" 
                    className="text-lg text-white hover:text-red-400 transition-all duration-300 text-center py-3 w-full opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.75s_forwards] hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mani&apos;s Story
                  </Link>
                  <Link 
                    href="/charity" 
                    className="text-lg text-white hover:text-red-400 transition-all duration-300 text-center py-3 w-full opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.8s_forwards] hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Charity
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-lg text-white hover:text-white transition-all duration-300 text-center py-3 w-full opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.85s_forwards] hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>

                {/* Subscribe Button */}
                <div className="mb-8 opacity-0 translate-y-4 animate-[fadeInUp_0.4s_ease-out_0.9s_forwards] w-full max-w-xs">
                  <Button 
                    variant="outline" 
                    size="md" 
                    className="w-full justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => navigateToSection('subscribe')}
                  >
                    <span className="mr-2">🎧</span>
                    Subscribe
                  </Button>
                </div>

                {/* Tagline */}
                <div className="opacity-0 translate-y-4 animate-[fadeInUp_0.5s_ease-out_0.95s_forwards]">
                  <p className="text-lg sm:text-xl text-white text-center font-light leading-relaxed">
                    Resilience. Medicine.<br />
                    Innovation. The Human<br />
                    Spirit.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
    </>
  );
};
