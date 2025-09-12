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

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
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
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
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
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigateToSection('episodes')}
                className="text-gray-300 hover:text-red-500 transition-colors text-left"
              >
                Episodes
              </button>
              <button
                onClick={() => navigateToSection('about')}
                className="text-gray-300 hover:text-green-500 transition-colors text-left"
              >
                About
              </button>
              <Link 
                href="/story" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mani&apos;s Story
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="self-start mt-2"
                onClick={() => navigateToSection('subscribe')}
              >
                🎧 Subscribe
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
