import React from 'react';
import { FaInstagram, FaTiktok, FaCoffee } from 'react-icons/fa';

interface SocialLinksProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = '', 
  variant = 'horizontal',
  showLabels = true,
  size = 'md'
}) => {
  const socialLinks = [
    {
      name: 'Instagram',
      callToAction: 'Follow for behind-the-scenes',
      url: 'https://instagram.com/thebeatingedge', // Replace with actual Instagram handle
      icon: <FaInstagram className="text-2xl" />,
      bgGradient: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
      hoverEffect: 'hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Follow us on Instagram for daily inspiration and behind-the-scenes content'
    },
    {
      name: 'TikTok',
      callToAction: 'Quick health tips & stories',
      url: 'https://tiktok.com/@thebeatingedge', // Replace with actual TikTok handle
      icon: <FaTiktok className="text-2xl" />,
      bgGradient: 'bg-gradient-to-br from-black to-gray-900',
      hoverEffect: 'hover:shadow-2xl hover:shadow-white/30 hover:scale-110 hover:bg-gradient-to-br hover:from-gray-900 hover:to-black',
      textColor: 'text-white',
      description: 'Watch quick health tips and patient stories on TikTok'
    },
    {
      name: 'Buy Me a Coffee',
      callToAction: 'Support the podcast ☕',
      url: 'https://buymeacoffee.com/thebeatingedge', // Replace with actual Buy Me a Coffee username
      icon: <FaCoffee className="text-2xl" />,
      bgGradient: 'bg-gradient-to-br from-yellow-600 to-orange-500',
      hoverEffect: 'hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-110',
      textColor: 'text-white',
      description: 'Support us with a coffee to help keep the podcast running'
    }
  ];

  const containerClass = variant === 'horizontal' 
    ? 'flex flex-wrap gap-4 justify-center'
    : 'flex flex-col gap-3';

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'px-4 py-3';
      case 'lg': return 'px-8 py-5';
      default: return 'px-6 py-4';
    }
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {socialLinks.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          title={social.description}
        >
          <div 
            className={`
              ${social.bgGradient} 
              ${getButtonSize()}
              rounded-2xl 
              transition-all 
              duration-300 
              ${social.hoverEffect}
              border-2 
              border-white/10 
              hover:border-white/30
              cursor-pointer
              relative
              overflow-hidden
            `}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="flex items-center justify-center gap-3 relative z-10">
              <span className={`${social.textColor} group-hover:animate-pulse`}>
                {social.icon}
              </span>
              {showLabels && (
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className={`${social.textColor} font-bold text-sm sm:text-base whitespace-nowrap`}>
                    {social.name}
                  </span>
                  <span className={`${social.textColor} text-xs opacity-90 whitespace-nowrap`}>
                    {social.callToAction}
                  </span>
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

// Compact version for header/navigation use (currently unused)
export const SocialLinksCompact: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <SocialLinks 
      className={className}
      variant="horizontal"
      showLabels={false}
      size="sm"
    />
  );
};

// Full version with labels and engaging design for main sections
export const SocialLinksFull: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={className}>
      {/* Engaging header text */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          <span className="text-red-400">Connect</span> & <span className="text-green-500">Support</span>
        </h3>
        <p className="text-gray-300 text-sm max-w-md mx-auto">
          Follow our journey, get daily inspiration, and help keep these important conversations alive
        </p>
      </div>
      
      <SocialLinks 
        variant="horizontal"
        showLabels={true}
        size="lg"
      />
    </div>
  );
};
