import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'hover';
  delay?: string;
  className?: string;
}

interface AnimationVariant {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  whileHover?: TargetAndTransition;
}

const animations: Record<string, AnimationVariant> = {
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
  },
  hover: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    exit: { scale: 1 },
    whileHover: { scale: 1.05 }
  }
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  animation = 'fade',
  delay = '0ms',
  className = ''
}) => {
  return (
    <motion.div
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      exit={animations[animation].exit}
      whileHover={animations[animation].whileHover}
      transition={{ duration: 0.3, delay: parseFloat(delay) / 1000 }}
      className={`animate-${animation} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 