import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableButton } from '../../components/button/TouchableButton';
import { useAuth } from '../../hooks/useAuth';

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
      <Text className={'text-lg text-black'}>Login Screen</Text>
      <TouchableButton
        textClassName="text-lg text-black"
        onPress={handleLogin}
        styles={styles.button}
        title="login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: 175,
    height: 150,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
