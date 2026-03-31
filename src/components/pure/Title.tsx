import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';

interface TitleProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  color?: string;
}

export const Title = ({
  text,
  size = 'lg',
  align = 'center',
  color,
}: TitleProps) => {
  const { colors, fontSize, fontWeight, letterSpacing } = useTheme();

  const sizeMap = {
    sm: fontSize.md,
    md: fontSize.xl,
    lg: fontSize['2xl'],
    xl: fontSize['3xl'],
  };

  return (
    <Text
      style={[
        styles.title,
        {
          color: color ?? colors.text.primary,
          fontSize: sizeMap[size],
          fontWeight: fontWeight.bold,
          textAlign: align,
          letterSpacing: letterSpacing.tight,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: 4,
  },
});
