import type { StackScreenProps } from '@react-navigation/stack';

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
  RecoveryPassword: undefined;
  ChangePassword: undefined;
};

export type QrScreenProps = StackScreenProps<AuthParamList, 'Login'>;
