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

import { AuthParamList } from '@app-types/IAuthNavigator';
import { recoveryPasswordShema } from '@validations/RecoveryPasswordValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { recoveryPasswordService } from '@services/authService';

const initialRecoveryPassword: RecoveryPasswordRequest = { dpi: '' };

const recoveryPasswordValidations = (form: RecoveryPasswordRequest) => {
  let errors: ErrorObject = {};
  const parce = recoveryPasswordShema.safeParse(form);
  if (!parce.success) errors = handleOneLevelZodError(parce.error);
  return errors;
};

export const RecoveryPasswordScreen = () => {
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();
  const { colors, fontSize, fontWeight } = useTheme();

  const sendForm = async (form: RecoveryPasswordRequest) => {
    const response = await recoveryPasswordService(form.dpi);
    if (!response.success) {
      dispatchAlert({ title: 'Error al intentar recuperar contraseña', message: response.message });
    } else {
      dispatchAlert({
        title: 'Exito',
        message: 'Se ha enviado un correo para restablecer su contraseña',
        fn: () => navigate('ChangePassword'),
      });
    }
    return response;
  };

  const { form, errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialRecoveryPassword, recoveryPasswordValidations, sendForm);

  return (
    <FormScreen keyboardOffset={56} contentStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <Text style={[styles.title, { color: colors.text.inverse, fontSize: fontSize['2xl'], fontWeight: fontWeight.bold }]}>
        Recuperar contraseña
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.inverseSecondary, fontSize: fontSize.sm }]}>
        Ingresa tu DPI para recibir las instrucciones por correo
      </Text>

      <GlassCard style={styles.card} intensity="medium">
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

        <TouchableButton
          variant="cta"
          title="Recuperar contraseña"
          icon="mail-outline"
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
        ¿Recordaste tu contraseña?{' '}
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
