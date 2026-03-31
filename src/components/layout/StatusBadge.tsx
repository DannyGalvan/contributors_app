import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'pending';

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
}

export const StatusBadge = ({ label, variant }: StatusBadgeProps) => {
  const { colors, radius, fontSize, fontWeight } = useTheme();

  const bgColor = colors.status[`${variant}Bg` as keyof typeof colors.status];
  const textColor = colors.status[variant as keyof typeof colors.status];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor as string,
          borderRadius: radius.full,
          borderColor: textColor as string,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: textColor as string,
            fontSize: fontSize.xs,
            fontWeight: fontWeight.semibold,
          },
        ]}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    letterSpacing: 0.6,
  },
});
