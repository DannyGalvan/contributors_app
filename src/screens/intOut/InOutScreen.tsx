import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNetworkStore } from '@stores/useNetworkStore';
import { InOutForm } from '@components/forms/InOutForm';

export const InOutScreen = () => {
  const isConnected = useNetworkStore((store) => store.isConnected);

  if (!isConnected) {
    return (
      <View className="flex-1 bg-zinc-100 mt-2">
        <Text className="text-red-700 text-center mt-5 text-2xl">
          No tienes conexión a internet
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <InOutForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    flexGrow: 1,
  },
});
