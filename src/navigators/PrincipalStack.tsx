import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { HomeNavigator } from './HomeNavigator';
import { IntOutNavigator } from './IntOutNavigator';
import { PrincipalStackParamList } from '@app-types/IPrincipalNavigator';
import { AuthNavigator } from './AuthNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { useErrorsStore } from '@stores/useErrorsStore';
import { OvertimeNavigator } from './OvertimeNavigator';
import { VacationsNavigator } from './VacationsNavigator';

const Stack = createStackNavigator<PrincipalStackParamList>();

export const PrincipalStack = () => {
  const { error } = useErrorsStore();
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('Auth');
    } else {
      navigate('Home');
    }
  }, [isLoggedIn, navigate]);

  if (error) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    );
  }

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
          <Stack.Screen name="Overtime" component={OvertimeNavigator} />
          <Stack.Screen name="Vacations" component={VacationsNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
