import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '../../styles/appColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PrincipalStackParamList } from '../../types/IPrincipalNavigator';
import { useAuth } from '../../hooks/useAuth';
import { MenuItem } from '../../components/card/MenuItem';

export const Dashboard = () => {
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 mt-2">
      <View className="flex flex-row flex-wrap justify-center items-center">
        <MenuItem
          title="Entrada / Salida salientes"
          icon="qr-code"
          iconColor={appColors.black}
          onPress={() => navigate('InOut')}
        />
        <MenuItem
          title="Vacaciones"
          icon="calendar"
          iconColor={appColors.info}
          onPress={() => console.log('hola')}
        />
        <MenuItem
          title="Horas Extras"
          icon="time"
          iconColor={appColors.secondary}
          onPress={() => console.log('hola')}
        />
        <MenuItem
          title="Salir"
          icon="exit"
          iconColor={appColors.danger}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};
