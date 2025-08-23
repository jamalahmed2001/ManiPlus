import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'gradient';
  borderColor?: 'red' | 'green' | 'white' | 'gray';
}

const cardVariants = {
  default: 'bg-gray-900/50 border-gray-800',
  hover: 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:scale-105 transition-all duration-300 group',
  gradient: 'bg-gradient-to-br from-red-500/20 via-white/10 to-green-500/20 backdrop-blur-sm border-gray-800'
};

const borderColors = {
  red: 'hover:border-red-500/70 hover:shadow-red-500/20',
  green: 'hover:border-green-500/70 hover:shadow-green-500/20',
  white: 'hover:border-white/70 hover:shadow-white/20',
  gray: 'hover:border-gray-600'
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  borderColor = 'gray',
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border transition-all duration-300',
        cardVariants[variant],
        borderColors[borderColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
