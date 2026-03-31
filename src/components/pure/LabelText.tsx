import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';

interface LabelTextProps {
  label: string;
  text: string;
}

export const LabelText = ({ label, text }: LabelTextProps) => {
  const { colors, fontSize, fontWeight } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: colors.text.secondary,
            fontSize: fontSize.xs,
            fontWeight: fontWeight.semibold,
          },
        ]}
      >
        {label.toUpperCase()}
      </Text>
      <Text
        style={[
          styles.value,
          {
            color: colors.text.primary,
            fontSize: fontSize.base,
            fontWeight: fontWeight.regular,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  label: {
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  value: {
    letterSpacing: 0.2,
  },
});
