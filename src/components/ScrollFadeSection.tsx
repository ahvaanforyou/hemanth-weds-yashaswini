import React from 'react';

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const ScrollFadeSection: React.FC<ScrollFadeSectionProps> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  );
};
