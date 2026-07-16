import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@hooks/useTheme';

interface ScreenBackgroundProps {
  children: React.ReactNode;
}

export const ScreenBackground = ({ children }: ScreenBackgroundProps) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={colors.background.gradient}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.gradient}
    >
      {/* Decorative orbs for glassmorphism depth */}
      <View
        style={[
          styles.orb,
          styles.orbTopRight,
          { backgroundColor: 'rgba(66,165,245,0.15)' }, // primary[300] with light opacity
        ]}
      />
      <View
        style={[
          styles.orb,
          styles.orbBottomLeft,
          { backgroundColor: 'rgba(21,101,192,0.12)' }, // primary[600] with light opacity
        ]}
      />
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orbTopRight: {
    width: 280,
    height: 280,
    top: -80,
    right: -80,
  },
  orbBottomLeft: {
    width: 220,
    height: 220,
    bottom: -60,
    left: -60,
  },
});
