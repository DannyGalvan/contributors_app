import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { QrScreen } from '../screens/intOut/QrScreen';
import { InOutStackParamList } from '../types/IInOutNavigator';

const Stack = createStackNavigator<InOutStackParamList>();

export const IntOutNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="QrScreen" component={QrScreen} />
    </Stack.Navigator>
  );
};
