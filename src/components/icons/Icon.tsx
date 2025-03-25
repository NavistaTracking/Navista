import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, className, size }) => {
  return <IconComponent className={className} size={size} />;
};

export default Icon; 