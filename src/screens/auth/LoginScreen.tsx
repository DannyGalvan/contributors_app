import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TouchableButton } from '@components/button/TouchableButton';
import { InputForm } from '@components/input/InputForm';
import { Logo } from '@components/Icons/Logo';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { FormScreen } from '@components/layout/FormScreen';
import { GlassCard } from '@components/layout/GlassCard';

import { useAuth } from '@hooks/useAuth';
import { useForm, ErrorObject } from '@hooks/useForm';
import { useTheme } from '@hooks/useTheme';
import { useErrorsStore } from '@stores/useErrorsStore';

import { LoginRequest } from '@app-types/LoginRequest';
import { LoginResponse } from '@app-types/LoginResponse';
import { AuthParamList } from '@app-types/IAuthNavigator';
import { authShema } from '@validations/AuthValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { login } from '@services/authService';
import {
  getSessionStorage,
  createSessionStorage,
  updateSessionStorage,
  removeSessionStorage,
} from '@database/repository/sessionStorageRepository';
import { StorageKey } from '@config/constants';

const initialLogin: LoginRequest = { dpi: '', password: '' };

const loginValidations = (form: LoginRequest) => {
  let errors: ErrorObject = {};
  const parce = authShema.safeParse(form);
  if (!parce.success) errors = handleOneLevelZodError(parce.error);
  return errors;
};

export const LoginScreen = () => {
  const { signIn } = useAuth();
  const { resetError, error } = useErrorsStore();
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();
  const { colors, fontSize, fontWeight } = useTheme();

  const [rememberMe, setRememberMe] = useState(false);

  const {
    form,
    handleChange,
    handleSubmit,
    errors,
    loading,
    message,
    success,
  } = useForm<LoginRequest, LoginResponse>(
    initialLogin,
    loginValidations,
    handleLogin,
    true,
  );

  useEffect(() => {
    const loadRememberedDpi = async () => {
      try {
        const rememberedDpi = await getSessionStorage<string>(
          StorageKey.rememberMe,
        );
        if (rememberedDpi) {
          handleChange('dpi', rememberedDpi);
          setRememberMe(true);
        }
      } catch (e) {
        console.log('Error loading remembered DPI', e);
      }
    };
    loadRememberedDpi();
  }, []);

  async function handleLogin(form: LoginRequest) {
    resetError();
    const response = await login(form);
    if (!response.success) return response;

    try {
      if (rememberMe) {
        const existing = await getSessionStorage<string>(StorageKey.rememberMe);
        if (existing) {
          await updateSessionStorage(StorageKey.rememberMe, form.dpi);
        } else {
          await createSessionStorage(StorageKey.rememberMe, form.dpi);
        }
      } else {
        await removeSessionStorage(StorageKey.rememberMe);
      }
    } catch (e) {
      console.log('Error saving remembered DPI', e);
    }

    const authResponse = response.data as LoginResponse;
    signIn({
      username: authResponse.name,
      token: authResponse.token,
      idUser: authResponse.userId,
      employeeCode: authResponse.employeeCode,
      companyCode: authResponse.companyCode,
      startYearToWork: authResponse.startYearToWork,
      startDateToWork: authResponse.startDateToWork,
    });
    return response;
  }

  return (
    // Login has no header so keyboardOffset=0
    <FormScreen keyboardOffset={0} contentStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <Text
        style={[
          styles.welcome,
          {
            color: colors.text.inverse,
            fontSize: fontSize['2xl'],
            fontWeight: fontWeight.bold,
          },
        ]}
      >
        Bienvenid@s
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: colors.text.inverse, fontSize: fontSize.sm },
        ]}
      >
        Ingresa tus credenciales para continuar
      </Text>

      <GlassCard style={styles.card} intensity="medium">
        <InputForm
          name="dpi"
          label="DPI"
          placeholder="Ingrese su DPI"
          value={form.dpi}
          onChangeText={text => handleChange('dpi', text)}
          errorMessage={errors?.dpi}
          secureTextEntry={false}
          icon="card-outline"
          keyboardType="numeric"
        />
        <InputForm
          name="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          errorMessage={errors?.password}
          secureTextEntry={true}
          icon="eye-outline"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Icon
            name={rememberMe ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color={rememberMe ? colors.brand.primary : colors.text.secondary}
          />
          <Text
            style={[
              styles.rememberMeText,
              {
                color: colors.text.primary,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.medium,
              },
            ]}
          >
            Recuérdame
          </Text>
        </TouchableOpacity>

        <TouchableButton
          variant="cta"
          title="Iniciar sesión"
          icon="log-in-outline"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          styles={styles.loginBtn}
        />

        <ResponseMessage message={message} success={success} loading={false} />

        {error && (
          <ResponseMessage
            message={`${error.message} (${error.statusCode})`}
            success={false}
            loading={false}
          />
        )}
      </GlassCard>

      <View style={styles.links}>
        <Text
          style={[
            styles.link,
            { color: colors.text.inverseSecondary, fontSize: fontSize.sm },
          ]}
          onPress={() => navigate('Register')}
        >
          ¿No tienes usuario?{' '}
          <Text
            style={{ fontWeight: fontWeight.bold, color: colors.brand.cta }}
          >
            Regístrate
          </Text>
        </Text>

        <Text
          style={[
            styles.link,
            { color: colors.text.inverseSecondary, fontSize: fontSize.sm },
          ]}
          onPress={() => navigate('RecoveryPassword')}
        >
          ¿Olvidaste tu contraseña?{' '}
          <Text
            style={{ fontWeight: fontWeight.bold, color: colors.brand.cta }}
          >
            Recuperar
          </Text>
        </Text>
      </View>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 22,
  },
  welcome: {
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 0.3,
  },
  card: {
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 4,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  loginBtn: {
    marginTop: 20,
  },
  links: {
    marginTop: 24,
    alignItems: 'center',
    gap: 10,
  },
  link: {
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
