import type { StackScreenProps } from '@react-navigation/stack';

export type OvertimeStackParamList = {
  Crear: undefined;
  HorasExtras: undefined;
};

export type QrScreenProps = StackScreenProps<
  OvertimeStackParamList,
  'HorasExtras'
>;
