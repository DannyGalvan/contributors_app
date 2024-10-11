import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { HomeNavigator } from './HomeNavigator';
import { IntOutNavigator } from './IntOutNavigator';
import { PrincipalStackParamList } from '../types/IPrincipalNavigator';
import { AuthNavigator } from './AuthNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

const Stack = createStackNavigator<PrincipalStackParamList>();

export const PrincipalStack = () => {
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('Auth');
    } else {
      navigate('Home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeNavigator} />
          <Stack.Screen name="InOut" component={IntOutNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
