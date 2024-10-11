import type { StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  Apps: undefined;
};

export type DashboardScreenProps = StackScreenProps<HomeStackParamList, 'Apps'>;
