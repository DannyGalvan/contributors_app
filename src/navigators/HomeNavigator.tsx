import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '../screens/menu/DashboardScreen';
import { HomeStackParamList } from '../types/IHomeNavigator';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'rgb(107,114,128)',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="DashBoard" component={Dashboard} />
    </Stack.Navigator>
  );
};
