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

import { AuthParamList } from '../../types/IAuthNavigator';
import { ChangePasswordShema } from '@validations/ChangePasswordValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { changePasswordService, confirmTokenService } from '../../services/authService';

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
  const { colors, fontSize, fontWeight } = useTheme();

  const sendForm = async (form: ChangePasswordRequest) => {
    const responseToken = await confirmTokenService(form.token);
    if (!responseToken.success) {
      dispatchAlert({ title: 'Error al intentar recuperar contraseña', message: responseToken.message });
      return responseToken;
    }
    try {
      const response = await changePasswordService(form);
      if (!response.success) {
        dispatchAlert({ title: 'Error al intentar recuperar contraseña', message: response.message });
      } else {
        dispatchAlert({ title: 'Exito', message: 'Contraseña cambiada con exito' });
        navigate('Login');
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Error al intentar recuperar contraseña', data: null };
    }
  };

  const { form, errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialForm, ChangePasswordValidations, sendForm);

  return (
    <FormScreen keyboardOffset={56} contentStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <Text style={[styles.title, { color: colors.text.inverse, fontSize: fontSize['2xl'], fontWeight: fontWeight.bold }]}>
        Cambiar contraseña
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.inverseSecondary, fontSize: fontSize.sm }]}>
        Ingresa el token recibido y tu nueva contraseña
      </Text>

      <GlassCard style={styles.card} intensity="medium">
        <InputForm
          name="token"
          label="Token"
          placeholder="Ingrese su token"
          value={form.token}
          onChangeText={(text) => handleChange('token', text)}
          errorMessage={errors?.token}
          secureTextEntry={false}
          icon="finger-print-outline"
          keyboardType="numeric"
        />
        <InputForm
          name="password"
          label="Contraseña"
          placeholder="Ingrese su nueva contraseña"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          errorMessage={errors?.password}
          secureTextEntry={true}
          icon="eye-outline"
        />
        <InputForm
          name="confirmPassword"
          label="Confirmar Contraseña"
          placeholder="Confirme su nueva contraseña"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          errorMessage={errors?.confirmPassword}
          secureTextEntry={true}
          icon="eye-outline"
        />

        <TouchableButton
          variant="cta"
          title="Cambiar Contraseña"
          icon="lock-closed-outline"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          styles={styles.btn}
        />

        <ResponseMessage message={message} success={success} loading={false} />
      </GlassCard>
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
  },
  btn: {
    marginTop: 12,
  },
});
