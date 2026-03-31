import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Dashboard } from '@screens/menu/DashboardScreen';
import { useTheme } from '@hooks/useTheme';
import { HomeStackParamList } from '@app-types/IHomeNavigator';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  const { colors, fontWeight } = useTheme();

  return (
    <Stack.Navigator
      id="homeNavigator"
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.primary },
        headerTintColor: colors.text.inverse,
        headerTitleStyle: { fontWeight: fontWeight.bold },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Apps" component={Dashboard} />
    </Stack.Navigator>
  );
};
