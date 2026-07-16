import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToggle } from '@hooks/useToggle';
import { useTheme } from '@hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputDateTimeProps {
  name: string;
  label: string;
  onChange: (text: string, name: string) => void;
  parsedFn: (date: Date) => string;
  value: string;
  icon: string;
  errorMessage: string;
  mode?: 'date' | 'time' | 'datetime';
}

export const InputDateTime = ({
  name,
  label,
  onChange,
  parsedFn,
  value,
  icon,
  mode,
  errorMessage,
}: InputDateTimeProps) => {
  const { isToggled: isDateToggle, toggle: dateToggle } = useToggle();
  const { colors, radius, fontSize, fontWeight, shadows } = useTheme();
  const hasValue = Boolean(value);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: errorMessage ? colors.text.error : colors.text.secondary,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
          },
        ]}
      >
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={dateToggle}
        style={[
          styles.field,
          {
            backgroundColor: colors.surface.input,
            borderRadius: radius.md,
            borderColor: errorMessage
              ? colors.text.error
              : hasValue
              ? colors.border.inputFocused
              : colors.border.input,
          },
        ]}
      >
        <Icon
          name={icon}
          size={18}
          color={hasValue ? colors.brand.primary : colors.icon.secondary}
          style={styles.leadIcon}
        />
        <Text
          style={[
            styles.value,
            {
              color: hasValue ? colors.text.primary : colors.text.muted,
              fontSize: fontSize.base,
              flex: 1,
            },
          ]}
        >
          {value || `Seleccionar ${label.toLowerCase()}`}
        </Text>
        <Icon
          name="chevron-down"
          size={16}
          color={colors.icon.secondary}
        />
      </TouchableOpacity>

      {errorMessage ? (
        <Text
          style={[
            styles.error,
            { color: colors.text.error, fontSize: fontSize.xs },
          ]}
        >
          {errorMessage}
        </Text>
      ) : null}

      <DateTimePickerModal
        isVisible={isDateToggle}
        mode={mode}
        onConfirm={(date) => {
          onChange(name, parsedFn(date));
          dateToggle();
        }}
        onCancel={dateToggle}
        timeZoneName="America/Guatemala"
        is24Hour={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 6,
  },
  label: {
    marginBottom: 6,
    marginLeft: 2,
    letterSpacing: 0.3,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: 50,
  },
  leadIcon: {
    marginRight: 10,
  },
  value: {
    letterSpacing: 0.2,
  },
  error: {
    marginTop: 4,
    marginLeft: 2,
  },
});
