import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Logo } from '@components/Icons/Logo';
import { UserRequest } from '@app-types/UserRequest';
import { ErrorObject, useForm } from '@hooks/useForm';
import { UserShema } from '@validations/UserValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { UserResponse } from '@app-types/UserResponse';
import { createUser } from '@services/userService';
import { InputForm } from '@components/input/InputForm';
import { appColors } from '@styles/appColors';
import { appStyles } from '@styles/appStyles';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '@app-types/IAuthNavigator';
import { Title } from '@components/pure/Title';

const initialRegister: UserRequest = {
  email: '',
  password: '',
  confirm: '',
  dpi: '',
  number: '',
  reset: false,
  state: 1,
};

const registerValidations = (form: UserRequest) => {
  let errors: ErrorObject = {};

  const parce = UserShema.safeParse(form);

  if (!parce.success) errors = handleOneLevelZodError(parce.error);

  return errors;
};

export const RegisterScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();
  const sendForm = async (form: UserRequest) => {
    const response = await createUser(form);

    dispatchAlert({
      title: 'Mensaje',
      message: response.message,
      fn: () => {
        if (response.success) navigate('Login');
      },
    });

    return response;
  };

  const {
    form,
    handleChange,
    handleSubmit,
    errors,
    loading,
    message,
    success,
  } = useForm<UserRequest, UserResponse>(
    initialRegister,
    registerValidations,
    sendForm,
    true,
  );

  return (
    <ScrollView contentContainerStyle={styles.screen} scrollEnabled>
      <Title text="Registro de Usuario" />

      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <InputForm
        containerStyles={styles.input}
        name="email"
        errorMessage={errors?.email}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Correo Electrónico"
        value={form.email}
        onChangeText={(text: string) => handleChange('email', text)}
        placeholder="Ingrese su correo electrónico"
        secureTextEntry={false}
        icon="mail"
        iconColor={appColors.sky}
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
        name="confirm"
        errorMessage={errors?.confirm}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Confirmar Contraseña"
        value={form.confirm}
        onChangeText={(text: string) => handleChange('confirm', text)}
        placeholder="Confirme su contraseña"
        secureTextEntry={true}
        icon="eye"
        iconColor={appColors.sky}
      />

      <InputForm
        containerStyles={styles.input}
        name="dpi"
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

      <InputForm
        containerStyles={styles.input}
        name="number"
        errorMessage={errors?.number}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Número de teléfono"
        value={form.number}
        onChangeText={(text: string) => handleChange('number', text)}
        placeholder="Ingrese su número de teléfono"
        secureTextEntry={false}
        icon="call"
        iconColor={appColors.sky}
      />

      <TouchableButton
        styles={styles.button}
        textClassName="text-lg text-white font-bold"
        onPress={handleSubmit}
        title="Registrarse"
        icon="person-add"
      />

      <ResponseMessage message={message} success={success} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
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
