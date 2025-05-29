import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderBarProps {
  className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50', // Ensures header stays at the top and above other content
        'flex justify-center items-center h-16 w-full', // Layout as per requirements: centered content, fixed height
        'bg-card', // Uses card background, which maps to 'surface' color from PRD theme
        'border-b border-border', // Adds a subtle bottom border for separation
        className // Allows additional custom styling
      )}
      role="banner" // Accessibility: identifies the header as a banner landmark
    >
      {/* ASCENDION Brand Logo */}
      <div className="text-center">
        <span className="text-3xl font-bold tracking-wider text-foreground">
          ASCENDION
        </span>
        {/* Tagline styling based on visual inspection of the provided image */}
        <p className="text-[0.65rem] font-light tracking-normal text-muted-foreground -mt-0.5">
          Engineering to elevate life
        </p>
      </div>
    </header>
  );
};

export default HeaderBar;
