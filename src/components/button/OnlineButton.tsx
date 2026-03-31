import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@hooks/useTheme';
import { useNetworkStore } from '@stores/useNetworkStore';
import { GlassCard } from '@components/layout/GlassCard';

interface OnlineButtonProps {
  component: React.JSX.Element;
  text: string;
}

export const OnlineButton = ({ component, text }: OnlineButtonProps) => {
  const { colors, fontSize } = useTheme();
  const { isConnected } = useNetworkStore();

  if (isConnected) return component;

  return (
    <GlassCard style={styles.card} intensity="low">
      <Icon name="wifi-outline" size={28} color={colors.status.warning} style={styles.icon} />
      <Text style={[styles.text, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
        Necesitas conexión a internet {text}
      </Text>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginBottom: 6,
  },
  text: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
