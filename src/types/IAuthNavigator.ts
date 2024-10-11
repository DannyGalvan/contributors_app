import type {StackScreenProps} from '@react-navigation/stack';

export type AuthParamList = {
  Login: undefined;
};

export type QrScreenProps = StackScreenProps<AuthParamList, 'Login'>;
