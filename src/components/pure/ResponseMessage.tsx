import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@hooks/useTheme';

interface ResponseMessageProps {
  message: string | false | null | undefined;
  success: boolean;
  loading: boolean;
}

export const ResponseMessage = ({
  message,
  success,
  loading,
}: ResponseMessageProps) => {
  const { colors, radius, fontSize, fontWeight } = useTheme();

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="small" color={colors.brand.primary} />
        <Text style={[styles.loadingText, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
          Procesando...
        </Text>
      </View>
    );
  }

  if (!message) return null;

  const isSuccess = Boolean(success);
  const bg = isSuccess ? colors.status.successBg : colors.status.dangerBg;
  const textColor = isSuccess ? colors.status.success : colors.status.danger;
  const iconName = isSuccess ? 'checkmark-circle' : 'alert-circle';

  return (
    <View
      style={[
        styles.messageBox,
        {
          backgroundColor: bg,
          borderColor: textColor,
          borderRadius: radius.md,
        },
      ]}
    >
      <Icon name={iconName} size={18} color={textColor} style={styles.icon} />
      <Text
        style={[
          styles.messageText,
          {
            color: textColor,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  loadingText: {},
  messageBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    marginHorizontal: 4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  icon: {
    marginRight: 8,
    marginTop: 1,
  },
  messageText: {
    flex: 1,
    lineHeight: 20,
  },
});
