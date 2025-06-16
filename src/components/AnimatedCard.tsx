import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  animation: 'slide' | 'fade' | 'scale';
  delay: string;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, animation, delay, className = '' }) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'slide':
        return 'animate-slide-in';
      case 'fade':
        return 'animate-fade-in';
      case 'scale':
        return 'animate-scale-in';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard; 