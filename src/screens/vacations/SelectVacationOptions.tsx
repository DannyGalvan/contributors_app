import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuItem } from '@components/card/MenuItem';
import { appColors } from '@styles/appColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { VacationsStackParamList } from '@app-types/IVacationsNavigator';
import { icons } from '@config/images';

export const SelectVacationOptions = () => {
  const { navigate } = useNavigation<NavigationProp<VacationsStackParamList>>();
  return (
    <SafeAreaView className="flex-1 bg-zinc-100 justify-center items-center">
      <MenuItem
        title="Lista Vacaciones"
        image={icons.listaVacaciones}
        iconColor={appColors.gray}
        onPress={() => navigate('ListVacations')}
      />
      <MenuItem
        title="Pago Vacaciones"
        image={icons.pagoVacaciones}
        iconColor={appColors.success}
        onPress={() => navigate('VacationPay')}
      />
      <MenuItem
        title="Goce de Vacaciones"
        image={icons.goceVacaciones}
        iconColor={appColors.info}
        onPress={() => navigate('EnjoyVacations')}
      />
    </SafeAreaView>
  );
};
