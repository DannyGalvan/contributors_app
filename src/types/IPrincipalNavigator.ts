import type { StackScreenProps } from '@react-navigation/stack';

export type PrincipalStackParamList = {
  Home: undefined;
  InOut: undefined;
  Auth: undefined;
  Overtime: undefined;
  Vacations: undefined;
};

export type ScreenProps = StackScreenProps<PrincipalStackParamList, 'Home'>;

export type InOutScreenProps = StackScreenProps<
  PrincipalStackParamList,
  'InOut'
>;
