import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: 'low' | 'medium' | 'high';
  padding?: number;
}

export const GlassCard = ({
  children,
  style,
  intensity = 'medium',
  padding = 16,
}: GlassCardProps) => {
  const { colors, shadows, radius } = useTheme();

  const surfaceColor = {
    low: colors.surface.glass,
    medium: colors.surface.glassMd,
    high: colors.surface.glassLg,
  }[intensity];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surfaceColor,
          borderColor: colors.border.glass,
          borderRadius: radius.xl,
          padding,
          ...shadows.glass,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});
