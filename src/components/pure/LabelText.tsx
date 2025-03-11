import React from 'react';
import { Text, View } from 'react-native';

interface LabelTextProps {
  label: string;
  text: string;
}

export const LabelText = ({ label, text }: LabelTextProps) => {
  return (
    <View className="my-1">
      <Text className="text-black font-bold text-xl mx-5">{label}</Text>
      <Text className="text-black text-lg mx-5">{text}</Text>
    </View>
  );
};
