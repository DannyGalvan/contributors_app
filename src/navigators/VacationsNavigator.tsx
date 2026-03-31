import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { VacationsScreen } from '@screens/vacations/VacationsScreen';
import { SelectVacationOptions } from '@screens/vacations/SelectVacationOptions';
import { CreateHolidayEnjoymentScreen } from '@screens/vacations/CreateHolidayEnjoymentScreen';
import { CreateVacationPayScreen } from '@screens/vacations/CreateVacationPayScreen';
import { useTheme } from '@hooks/useTheme';
import { VacationsStackParamList } from '@app-types/IVacationsNavigator';

const Stack = createStackNavigator<VacationsStackParamList>();

export const VacationsNavigator = () => {
  const { colors, fontWeight } = useTheme();

  return (
    <Stack.Navigator
      id="vacationsNavigator"
      initialRouteName="SelectVacationPay"
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.primary },
        headerTintColor: colors.text.inverse,
        headerTitleStyle: { fontWeight: fontWeight.bold },
      }}
    >
      <Stack.Screen
        name="SelectVacationPay"
        component={SelectVacationOptions}
        options={{ title: 'Vacaciones' }}
      />
      <Stack.Screen
        name="ListVacations"
        component={VacationsScreen}
        options={{ title: 'Mis Vacaciones' }}
      />
      <Stack.Screen
        name="EnjoyVacations"
        component={CreateHolidayEnjoymentScreen}
        options={{ title: 'Goce de Vacaciones' }}
      />
      <Stack.Screen
        name="VacationPay"
        component={CreateVacationPayScreen}
        options={{ title: 'Pago de Vacaciones' }}
      />
    </Stack.Navigator>
  );
};
