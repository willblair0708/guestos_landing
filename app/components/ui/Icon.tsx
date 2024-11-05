import { IconType } from 'react-icons';
import {
  FaBriefcase,
  FaBuilding,
  FaCommentAlt,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  user: FaUser,
  building: FaBuilding,
  briefcase: FaBriefcase,
  mail: FaEnvelope,
  message: FaCommentAlt,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 16, className = '' }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
}
