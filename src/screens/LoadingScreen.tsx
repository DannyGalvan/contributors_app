import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { ScreenBackground } from '@components/layout/ScreenBackground';
import { Logo } from '@components/Icons/Logo';
import { useTheme } from '@hooks/useTheme';

interface Props {
  title: string;
}

export const LoadingScreen = ({ title }: Props) => {
  const { colors, fontSize, fontWeight } = useTheme();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Logo isVisible style={styles.logo} />

        <ActivityIndicator
          size="large"
          color={colors.text.inverse}
          style={styles.spinner}
        />

        <Text
          style={[
            styles.title,
            {
              color: colors.text.inverse,
              fontSize: fontSize.md,
              fontWeight: fontWeight.medium,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 18,
    marginBottom: 8,
  },
  spinner: {},
  title: {
    letterSpacing: 0.3,
    opacity: 0.85,
  },
});
