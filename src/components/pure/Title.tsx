import React from 'react';
import { Text } from 'react-native';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <Text className="text-black text-center font-bold text-2xl">{text}</Text>
  );
};
