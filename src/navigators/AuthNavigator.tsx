import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '@screens/auth/LoginScreen';
import { RegisterScreen } from '@screens/auth/RegisterScreen';
import { RecoveryPasswordScreen } from '@screens/auth/RecoveryPasswordScreen';
import { ChangePasswordScreen } from '@screens/auth/ChangePasswordScreen';
import { useTheme } from '@hooks/useTheme';
import { AuthParamList } from '@app-types/IAuthNavigator';

const Stack = createStackNavigator<AuthParamList>();

export const AuthNavigator = () => {
  const { colors, fontWeight } = useTheme();

  return (
    <Stack.Navigator
      id="authNavigator"
      screenOptions={{
        // Login does not show a header — ScreenBackground fills the full screen
        headerShown: false,
        headerStyle: { backgroundColor: colors.brand.primary },
        headerTintColor: colors.text.inverse,
        headerTitleStyle: { fontWeight: fontWeight.bold },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPasswordScreen}
        options={{
          headerShown: true,
          title: 'Recuperar contraseña',
          // Solid header — ScreenBackground starts below the header, no overlap
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          title: 'Cambiar contraseña',
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: 'Registro',
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
};
