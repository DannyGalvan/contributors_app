import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from '@components/pure/Title';
import { InputForm } from '@components/input/InputForm';
import { appColors } from '@styles/appColors';
import { appStyles } from '@styles/appStyles';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { Logo } from '@components/Icons/Logo';
import { ErrorObject, useForm } from '@hooks/useForm';
import { ChangePasswordShema } from '@validations/ChangePasswordValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import {
  changePasswordService,
  confirmTokenService,
} from '../../services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '../../types/IAuthNavigator';
import { ScrollView } from 'react-native-gesture-handler';

const initialForm: ChangePasswordRequest = {
  token: '',
  password: '',
  confirmPassword: '',
};

const ChangePasswordValidations = (form: ChangePasswordRequest) => {
  let errors: ErrorObject = {};

  const parce = ChangePasswordShema.safeParse(form);

  if (!parce.success) errors = handleOneLevelZodError(parce.error);

  return errors;
};

export const ChangePasswordScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();

  const sendForm = async (form: ChangePasswordRequest) => {
    const responseToken = await confirmTokenService(form.token);

    if (!responseToken.success) {
      dispatchAlert({
        title: 'Error al intentar recuperar contraseña',
        message: responseToken.message,
      });

      return responseToken;
    }

    try {
      const response = await changePasswordService(form);

      if (!response.success) {
        dispatchAlert({
          title: 'Error al intentar recuperar contraseña',
          message: response.message,
        });
      } else {
        dispatchAlert({
          title: 'Exito',
          message: response.message,
        });
        navigate('Login');
      }

      return response;
    } catch (error) {
      console.log('error', error);
      return {
        success: false,
        message: 'Error al intentar recuperar contraseña',
        data: null,
      };
    }
  };

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    loading,
    message,
    success,
  } = useForm(initialForm, ChangePasswordValidations, sendForm);

  return (
    <ScrollView contentContainerStyle={styles.screen} scrollEnabled>
      <Title text="Cambiar contraseña" />

      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <InputForm
        containerStyles={styles.input}
        name="token"
        errorMessage={errors?.token}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Token"
        value={form.token}
        onChangeText={(text: string) => handleChange('token', text)}
        placeholder="Ingrese su token"
        icon="finger-print"
        iconColor={appColors.sky}
        secureTextEntry={false}
      />

      <InputForm
        containerStyles={styles.input}
        name="password"
        errorMessage={errors?.password}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Contraseña"
        value={form.password}
        onChangeText={(text: string) => handleChange('password', text)}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        icon="eye"
        iconColor={appColors.sky}
      />

      <InputForm
        containerStyles={styles.input}
        name="confirmPassword"
        errorMessage={errors?.confirmPassword}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Confirmar Contraseña"
        value={form.confirmPassword}
        onChangeText={(text: string) => handleChange('confirmPassword', text)}
        placeholder="Confirme su contraseña"
        secureTextEntry={true}
        icon="eye"
        iconColor={appColors.sky}
      />

      <TouchableButton
        styles={styles.button}
        textClassName="text-lg text-white font-bold"
        onPress={handleSubmit}
        title="Cambiar Contraseña"
        icon="log-in"
      />

      <ResponseMessage message={message} success={success} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
