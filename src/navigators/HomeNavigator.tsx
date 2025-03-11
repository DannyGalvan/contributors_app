import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '@screens/menu/DashboardScreen';
import { HomeStackParamList } from '@app-types/IHomeNavigator';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(244,244,245)',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Apps" component={Dashboard} />
    </Stack.Navigator>
  );
};
