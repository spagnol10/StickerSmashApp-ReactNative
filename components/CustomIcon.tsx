import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const CustomIcon: React.FC<IconProps> = ({ name, size = 20, color }) => {
  const colorScheme = useColorScheme();
  const iconColor = color ?? Colors[colorScheme ?? 'light'].text;

  return <Ionicons name={name} size={size} color={iconColor} />;
};

export default CustomIcon;
