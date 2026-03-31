import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@hooks/useTheme';

interface MenuItemProps {
  title: string;
  icon?: string;
  image?: number;
  onPress: () => void;
  iconColor?: string;
  danger?: boolean;
}

export const MenuItem = ({
  title,
  icon,
  image,
  onPress,
  iconColor,
  danger = false,
}: MenuItemProps) => {
  const { colors, radius, shadows, fontSize, fontWeight } = useTheme();

  const resolvedIconColor = iconColor ?? (danger ? colors.status.danger : colors.icon.primary);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface.glassMd,
          borderColor: danger ? colors.border.glassStrong : colors.border.glass,
          borderRadius: radius['2xl'],
          ...shadows.glass,
        },
      ]}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: danger
              ? colors.status.dangerBg
              : colors.surface.glassLg,
            borderRadius: radius.xl,
            borderColor: danger ? colors.status.danger : colors.border.glassStrong,
          },
        ]}
      >
        {icon && <Icon name={icon} size={34} color={resolvedIconColor} />}
        {image && (
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>

      <Text
        style={[
          styles.title,
          {
            color: danger ? colors.status.danger : colors.text.primary,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.semibold,
          },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 12,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 10,
  },
  image: {
    width: 46,
    height: 46,
  },
  title: {
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
