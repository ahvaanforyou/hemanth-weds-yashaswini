import React from 'react';

interface FloralAccentProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  flipX?: boolean;
  flipY?: boolean;
  opacity?: number;
  width?: string;
}

export const FloralAccent: React.FC<FloralAccentProps> = ({
  className = '',
  position = 'custom',
  flipX = false,
  flipY = false,
  opacity = 0.95,
  width = 'w-48 sm:w-64 md:w-80',
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'absolute top-1 left-1 pointer-events-none select-none z-10';
      case 'top-right':
        return 'absolute top-1 right-1 pointer-events-none select-none z-10';
      case 'bottom-left':
        return 'absolute bottom-1 left-1 pointer-events-none select-none z-10';
      case 'bottom-right':
        return 'absolute bottom-1 right-1 pointer-events-none select-none z-10';
      default:
        return 'pointer-events-none select-none';
    }
  };

  const transformStyle = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      src="/assets/flower-branch-full.png"
      alt="Blue Watercolor Floral Branch"
      aria-hidden="true"
      style={{
        transform: transformStyle || undefined,
        opacity,
      }}
      className={`${getPositionClasses()} ${width} h-auto object-contain transition-transform duration-700 drop-shadow-sm ${className}`}
    />
  );
};
