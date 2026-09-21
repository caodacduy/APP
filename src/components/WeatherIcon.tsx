import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from 'lucide-react-native';

interface WeatherIconProps {
  code: number;
  isDay?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = 1,
  size = 24,
  color = '#ffffff',
  strokeWidth = 2,
}) => {
  const isNight = isDay === 0;

  switch (code) {
    case 0:
      return isNight ? (
        <Moon size={size} color={color} strokeWidth={strokeWidth} />
      ) : (
        <Sun size={size} color={color} strokeWidth={strokeWidth} />
      );

    case 1:
    case 2:
      return isNight ? (
        <CloudMoon size={size} color={color} strokeWidth={strokeWidth} />
      ) : (
        <CloudSun size={size} color={color} strokeWidth={strokeWidth} />
      );

    case 3:
      return <Cloud size={size} color={color} strokeWidth={strokeWidth} />;

    case 45:
    case 48:
      return <CloudFog size={size} color={color} strokeWidth={strokeWidth} />;

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return <CloudDrizzle size={size} color={color} strokeWidth={strokeWidth} />;

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return <CloudRain size={size} color={color} strokeWidth={strokeWidth} />;

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <CloudSnow size={size} color={color} strokeWidth={strokeWidth} />;

    case 95:
    case 96:
    case 99:
      return <CloudLightning size={size} color={color} strokeWidth={strokeWidth} />;

    default:
      return isNight ? (
        <Moon size={size} color={color} strokeWidth={strokeWidth} />
      ) : (
        <Sun size={size} color={color} strokeWidth={strokeWidth} />
      );
  }
};
