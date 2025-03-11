import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { InOutStackParamList } from '@app-types/IInOutNavigator';
import { InOutScreen } from '@screens/intOut/InOutScreen';

const Stack = createStackNavigator<InOutStackParamList>();

export const IntOutNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Entradas/Salidas" component={InOutScreen} />
    </Stack.Navigator>
  );
};
