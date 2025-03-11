import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { appColors } from '@styles/appColors';

interface Props {
  title: string;
}

export const LoadingScreen = ({ title }: Props) => {
  return (
    <View className="bg-white" style={styles.cargando}>
      <Text style={styles.loadingText}>{title}</Text>
      <ActivityIndicator size="large" color={appColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.black,
  },
});
