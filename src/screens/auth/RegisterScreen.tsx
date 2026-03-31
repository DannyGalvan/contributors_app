import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Logo } from '@components/Icons/Logo';
import { InputForm } from '@components/input/InputForm';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { FormScreen } from '@components/layout/FormScreen';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { ErrorObject, useForm } from '@hooks/useForm';

import { UserRequest } from '@app-types/UserRequest';
import { UserResponse } from '@app-types/UserResponse';
import { AuthParamList } from '@app-types/IAuthNavigator';
import { UserShema } from '@validations/UserValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { createUser } from '@services/userService';

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
  const { colors, fontSize, fontWeight } = useTheme();

  const sendForm = async (form: UserRequest) => {
    const response = await createUser(form);
    dispatchAlert({
      title: 'Mensaje',
      message: !response.success ? response.message : 'Usuario creado con exito',
      fn: () => { if (response.success) navigate('Login'); },
    });
    return response;
  };

  const { form, handleChange, handleSubmit, errors, loading, message, success } =
    useForm<UserRequest, UserResponse>(initialRegister, registerValidations, sendForm, true);

  return (
    // keyboardOffset=56 accounts for the back-button header on Android
    <FormScreen keyboardOffset={56} contentStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <Text style={[styles.title, { color: colors.text.inverse, fontSize: fontSize['2xl'], fontWeight: fontWeight.bold }]}>
        Registro de Usuario
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.inverseSecondary, fontSize: fontSize.sm }]}>
        Completa tus datos para crear una cuenta
      </Text>

      <GlassCard style={styles.card} intensity="medium">
        <InputForm
          name="email"
          label="Correo Electrónico"
          placeholder="Ingrese su correo electrónico"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          errorMessage={errors?.email}
          secureTextEntry={false}
          icon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputForm
          name="dpi"
          label="DPI"
          placeholder="Ingrese su DPI"
          value={form.dpi}
          onChangeText={(text) => handleChange('dpi', text)}
          errorMessage={errors?.dpi}
          secureTextEntry={false}
          icon="card-outline"
          keyboardType="numeric"
        />
        <InputForm
          name="number"
          label="Número de teléfono"
          placeholder="Ingrese su número de teléfono"
          value={form.number}
          onChangeText={(text) => handleChange('number', text)}
          errorMessage={errors?.number}
          secureTextEntry={false}
          icon="call-outline"
          keyboardType="phone-pad"
        />
        <InputForm
          name="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          errorMessage={errors?.password}
          secureTextEntry={true}
          icon="eye-outline"
        />
        <InputForm
          name="confirm"
          label="Confirmar Contraseña"
          placeholder="Confirme su contraseña"
          value={form.confirm}
          onChangeText={(text) => handleChange('confirm', text)}
          errorMessage={errors?.confirm}
          secureTextEntry={true}
          icon="eye-outline"
        />

        <TouchableButton
          variant="cta"
          title="Registrarse"
          icon="person-add-outline"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          styles={styles.btn}
        />

        <ResponseMessage message={message} success={success} loading={false} />
      </GlassCard>

      <Text
        style={[styles.link, { color: colors.text.inverseSecondary, fontSize: fontSize.sm }]}
        onPress={() => navigate('Login')}
      >
        ¿Ya tienes cuenta?{' '}
        <Text style={{ fontWeight: fontWeight.bold, color: colors.brand.cta }}>
          Iniciar sesión
        </Text>
      </Text>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 14,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  btn: {
    marginTop: 12,
  },
  link: {
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
