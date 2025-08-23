import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'black' | 'gradient-gray' | 'gradient-red-green';
  id?: string;
}

const backgroundVariants = {
  black: 'bg-black',
  'gradient-gray': 'bg-gradient-to-r from-gray-900 via-black to-gray-900',
  'gradient-red-green': 'bg-gradient-to-r from-red-500/10 via-black to-green-400/10'
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'black',
  id,
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20',
        backgroundVariants[background],
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};
