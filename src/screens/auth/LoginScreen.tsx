import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableButton } from '../../components/button/TouchableButton';
import { useAuth } from '../../hooks/useAuth';
import { appColors } from '../../styles/appColors';
import { InputForm } from '../../components/input/InputForm';
import { appStyles } from '../../styles/appStyles';
import { Logo } from '../../components/Icons/Logo';

export const LoginScreen = () => {
  const { signIn } = useAuth();

  const handleLogin = () => {
    signIn({
      username: 'test',
      idUser: 1,
      token: '123456',
    });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className={'text-2xl text-black font-bold'}>
        Bienvenid@ de Nuevo
      </Text>

      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <InputForm
        containerStyles={styles.input}
        name="dpi"
        errorMessage={''}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="DPI"
        value={''}
        onChangeText={() => {}}
        placeholder="Ingrese su DPI"
        secureTextEntry={false}
      />

      <TouchableButton
        styles={styles.button}
        textClassName="text-lg text-white font-bold"
        onPress={handleLogin}
        title="Iniciar sesión"
        icon="log-in"
      />

      <ActivityIndicator className="mt-5" size="large" color={appColors.info} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.warning,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  containerLogo: {
    margin: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
