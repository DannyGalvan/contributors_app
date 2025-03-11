import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from '@components/pure/Title';
import { Logo } from '@components/Icons/Logo';
import { InputForm } from '@components/input/InputForm';
import { appColors } from '@styles/appColors';
import { appStyles } from '@styles/appStyles';
import { ErrorObject, useForm } from '@hooks/useForm';
import { recoveryPasswordShema } from '@validations/RecoveryPasswordValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { recoveryPasswordService } from '@services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '@app-types/IAuthNavigator';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';

const initialRecoveryPassword: RecoveryPasswordRequest = {
  dpi: '',
};

const recoveryPasswordValidations = (form: RecoveryPasswordRequest) => {
  let errors: ErrorObject = {};

  const parce = recoveryPasswordShema.safeParse(form);

  if (!parce.success) errors = handleOneLevelZodError(parce.error);

  return errors;
};

export const RecoveryPasswordScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();
  const sendForm = async (form: RecoveryPasswordRequest) => {
    const response = await recoveryPasswordService(form.dpi);

    if (!response.success) {
      dispatchAlert({
        title: 'Error al intentar recuperar contraseña',
        message: response.message,
      });
    } else {
      dispatchAlert({
        title: 'Exito',
        message: response.message,
        fn: () => navigate('ChangePassword'),
      });
    }

    return response;
  };

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    loading,
    message,
    success,
  } = useForm(initialRecoveryPassword, recoveryPasswordValidations, sendForm);

  return (
    <View className="flex-1 items-center justify-center">
      <Title text="Recuperar contraseña" />

      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <InputForm
        containerStyles={styles.input}
        name="Dpi"
        errorMessage={errors?.dpi}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="DPI"
        value={form.dpi}
        onChangeText={(text: string) => handleChange('dpi', text)}
        placeholder="Ingrese su DPI"
        secureTextEntry={false}
        icon="card"
        iconColor={appColors.sky}
      />

      <TouchableButton
        styles={styles.button}
        textClassName="text-lg text-white font-bold"
        onPress={handleSubmit}
        title="Recupera tu contraseña"
        icon="log-in"
      />

      <ResponseMessage message={message} success={success} loading={loading} />
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '60%',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  containerLogo: {
    margin: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
