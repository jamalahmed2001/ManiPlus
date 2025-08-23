import React from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25 border border-red-500/50',
  secondary: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 border border-green-500/50',
  outline: 'border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300',
  ghost: 'bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-white/25 border-2 border-white hover:border-gray-200 transition-all duration-300'
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        'font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled ?? isLoading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : icon}
        {children}
      </div>
    </button>
  );
};
