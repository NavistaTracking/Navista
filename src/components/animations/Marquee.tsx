import React from 'react';

interface MarqueeProps {
  text: string;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, className = '' }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-block animate-marquee ${className}`}>
        {text}
      </div>
    </div>
  );
};

export default Marquee; 