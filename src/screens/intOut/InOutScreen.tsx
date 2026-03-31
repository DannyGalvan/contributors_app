import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { InOutForm } from '@components/forms/InOutForm';
import { PermissionGate } from '@components/layout/PermissionGate';
import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { useNetworkStore } from '@stores/useNetworkStore';

const NoConnectionView = () => {
  const { colors, fontSize, fontWeight, radius } = useTheme();
  return (
    <ScreenBackground>
      <View style={styles.center}>
        <GlassCard style={styles.card}>
          <Icon
            name="wifi-outline"
            size={48}
            color={colors.status.warning}
            style={styles.icon}
          />
          <Text
            style={[
              styles.title,
              {
                color: colors.text.primary,
                fontSize: fontSize.xl,
                fontWeight: fontWeight.bold,
              },
            ]}
          >
            Sin conexión
          </Text>
          <Text
            style={[
              styles.body,
              { color: colors.text.secondary, fontSize: fontSize.sm },
            ]}
          >
            Necesitas conexión a internet para registrar tu entrada o salida.
            Verifica tu conexión e intenta de nuevo.
          </Text>
        </GlassCard>
      </View>
    </ScreenBackground>
  );
};

export const InOutScreen = () => {
  const isConnected = useNetworkStore((store) => store.isConnected);

  if (!isConnected) {
    return <NoConnectionView />;
  }

  return (
    <ScreenBackground>
      <PermissionGate permissionKey="location">
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <InOutForm />
        </ScrollView>
      </PermissionGate>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 16,
    paddingHorizontal: 0,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
