import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@hooks/useTheme';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Fab = ({
  iconName,
  onPress,
  style,
  isLoading,
  size = 'md',
  color,
}: Props) => {
  const { colors, shadows } = useTheme();

  const sizeMap = { sm: 36, md: 48, lg: 58 };
  const iconSizeMap = { sm: 18, md: 22, lg: 28 };
  const dim = sizeMap[size];
  const iconSz = iconSizeMap[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: color ?? colors.brand.primary,
          borderColor: colors.border.glassStrong,
          ...shadows.lg,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.text.inverse} size="small" />
      ) : (
        <Icon name={iconName} size={iconSz} color={colors.text.inverse} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
