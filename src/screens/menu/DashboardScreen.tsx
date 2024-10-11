import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableButton } from '../../components/button/TouchableButton';
import { appColors } from '../../styles/appColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PrincipalStackParamList } from '../../types/IPrincipalNavigator';
import { useAuth } from '../../hooks/useAuth';

const classStyles = {
  textCard: 'text-black font-bold text-lg text-center',
};

export const Dashboard = () => {
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-slate-200 dark:bg-gray-500 justify-center">
      <View className="flex flex-row m-2 flex-wrap justify-center items-center">
        <TouchableButton
          styles={styles.card}
          textClassName={classStyles.textCard}
          title="Entradas y Salidas"
          icon="qr-code"
          iconColor={appColors.black}
          onPress={() => navigate('InOut')}
        />
        <TouchableButton
          styles={styles.card}
          textClassName={classStyles.textCard}
          title="Vacaciones"
          icon="calendar"
          iconColor={appColors.black}
          onPress={() => console.log('hola')}
        />
        <TouchableButton
          styles={styles.card}
          textClassName={classStyles.textCard}
          title="Horas Extras"
          icon="time"
          iconColor={appColors.black}
          onPress={() => console.log('hola')}
        />
        <TouchableButton
          styles={styles.card}
          textClassName={classStyles.textCard}
          title="Salir"
          icon="exit"
          iconColor={appColors.danger}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: 175,
    height: 150,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: appColors.white,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
