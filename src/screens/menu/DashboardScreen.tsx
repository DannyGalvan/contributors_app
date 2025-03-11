import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '@styles/appColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { PrincipalStackParamList } from '@app-types/IPrincipalNavigator';
import { useAuth } from '@hooks/useAuth';
import { MenuItem } from '@components/card/MenuItem';
import { icons } from '@config/images';

export const Dashboard = () => {
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 mt-2">
      <View className="flex flex-row flex-wrap justify-center items-center">
        <MenuItem
          title="Entrada / Salida"
          image={icons.entradaSalida}
          iconColor={appColors.black}
          onPress={() => navigate('InOut')}
        />
        <MenuItem
          title="Vacaciones"
          image={icons.vacaciones}
          iconColor={appColors.info}
          onPress={() => navigate('Vacations')}
        />
        <MenuItem
          title="Horas Extras"
          image={icons.horasExtras}
          iconColor={appColors.secondary}
          onPress={() => navigate('Overtime')}
        />
        <MenuItem
          title="Salir"
          image={icons.salir}
          iconColor={appColors.danger}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};
