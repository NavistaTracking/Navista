import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale';
  delay?: string;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  }
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  animation = 'fade',
  delay = '0ms'
}) => {
  return (
    <motion.div
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      exit={animations[animation].exit}
      transition={{ duration: 0.3, delay: parseFloat(delay) / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 