import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { InOutScreen } from '@screens/intOut/InOutScreen';
import { useTheme } from '@hooks/useTheme';
import { InOutStackParamList } from '@app-types/IInOutNavigator';

const Stack = createStackNavigator<InOutStackParamList>();

export const IntOutNavigator = () => {
  const { colors, fontWeight } = useTheme();

  return (
    <Stack.Navigator
      id="intOutNavigator"
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.primary },
        headerTintColor: colors.text.inverse,
        headerTitleStyle: { fontWeight: fontWeight.bold },
      }}
    >
      <Stack.Screen
        name="Entradas/Salidas"
        component={InOutScreen}
        options={{ title: 'Entradas / Salidas' }}
      />
    </Stack.Navigator>
  );
};
