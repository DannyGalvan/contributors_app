import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@hooks/useTheme';
import { palette } from '@theme/colors';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'cta';

interface Props {
  onPress: () => void;
  title?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
  fullWidth?: boolean;
}

export const TouchableButton = ({
  onPress,
  title,
  icon,
  iconSize = 20,
  iconColor,
  variant = 'primary',
  loading = false,
  disabled = false,
  styles: externalStyle,
  textStyle,
  fullWidth = false,
}: Props) => {
  const { colors, radius, fontSize, fontWeight, shadows } = useTheme();

  const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
    primary: {
      bg: colors.brand.primary,
      text: colors.text.inverse,
    },
    secondary: {
      bg: colors.surface.glass,
      text: colors.text.primary,
      border: colors.border.glassStrong,
    },
    ghost: {
      bg: 'transparent',
      text: colors.brand.primary,
      border: colors.brand.primary,
    },
    danger: {
      bg: colors.status.danger,
      text: colors.text.inverse,
    },
    cta: {
      bg: colors.brand.cta,
      text: palette.neutral[900], // dark text for contrast on warning/yellow background
    },
  };

  const v = variantStyles[variant];
  const resolvedIconColor = iconColor ?? v.text;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={title}
      style={[
        styles.base,
        {
          backgroundColor: v.bg,
          borderRadius: radius.full,
          borderWidth: v.border ? 1.5 : 0,
          borderColor: v.border ?? 'transparent',
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          ...shadows.md,
        },
        externalStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={resolvedIconColor} />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              size={iconSize}
              color={resolvedIconColor}
              style={title ? styles.iconWithTitle : undefined}
            />
          )}
          {title && (
            <Text
              style={[
                styles.label,
                {
                  color: v.text,
                  fontSize: fontSize.base,
                  fontWeight: fontWeight.semibold,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  label: {
    letterSpacing: 0.3,
  },
  iconWithTitle: {
    marginRight: 8,
  },
});
