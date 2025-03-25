import { ComponentType } from 'react';

export interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
}

export type IconComponent = ComponentType<IconProps>; 