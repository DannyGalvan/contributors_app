import React, { ReactNode } from 'react';
import { useNetworkStore } from '@stores/useNetworkStore';
import { Text, View } from 'react-native';

interface OnlineButtonProps {
  component: React.JSX.Element;
  text: string;
}

export const OnlineButton = ({ component, text }: OnlineButtonProps) => {
  const { isConnected } = useNetworkStore();
  return isConnected ? (
    component
  ) : (
    <View className="bg-zinc-100 mt-2">
      <Text className="text-red-700 text-center mt-5 text-2xl">
        No tienes conexión a internet {text}
      </Text>
    </View>
  );
};
