import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MenuItem } from '@components/card/MenuItem';
import { ScreenBackground } from '@components/layout/ScreenBackground';

import { VacationsStackParamList } from '@app-types/IVacationsNavigator';
import { icons } from '@config/images';

export const SelectVacationOptions = () => {
  const { navigate } = useNavigation<NavigationProp<VacationsStackParamList>>();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <MenuItem
          title="Lista Vacaciones"
          image={icons.listaVacaciones}
          onPress={() => navigate('ListVacations')}
        />
        <MenuItem
          title="Pago Vacaciones"
          image={icons.pagoVacaciones}
          onPress={() => navigate('VacationPay')}
        />
        <MenuItem
          title="Goce de Vacaciones"
          image={icons.goceVacaciones}
          onPress={() => navigate('EnjoyVacations')}
        />
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 24,
  },
});
