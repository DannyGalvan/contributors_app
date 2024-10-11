import type {StackScreenProps} from '@react-navigation/stack';

export type HomeStackParamList = {
  DashBoard: undefined;
};

export type DashboardScreenProps = StackScreenProps<
  HomeStackParamList,
  'DashBoard'
>;
