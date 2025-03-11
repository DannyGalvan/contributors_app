import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { VacationsStackParamList } from '@app-types/IVacationsNavigator';
import { VacationsScreen } from '@screens/vacations/VacationsScreen';
import { SelectVacationOptions } from '@screens/vacations/SelectVacationOptions';
import { CreateHolidayEnjoymentScreen } from '@screens/vacations/CreateHolidayEnjoymentScreen';
import { CreateVacationPayScreen } from '@screens/vacations/CreateVacationPayScreen';

const Stack = createStackNavigator<VacationsStackParamList>();

export const VacationsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectVacationPay"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="ListVacations"
        options={{ title: 'Lista de Vacaciones' }}
        component={VacationsScreen}
      />
      <Stack.Screen
        name="SelectVacationPay"
        options={{ title: 'Opciones' }}
        component={SelectVacationOptions}
      />
      <Stack.Screen
        name="EnjoyVacations"
        options={{ title: 'Goce de Vacaciones' }}
        component={CreateHolidayEnjoymentScreen}
      />
      <Stack.Screen
        name="VacationPay"
        options={{ title: 'Pago vacaciones' }}
        component={CreateVacationPayScreen}
      />
    </Stack.Navigator>
  );
};
