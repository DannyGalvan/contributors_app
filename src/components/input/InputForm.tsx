import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  KeyboardType,
  Animated,
} from 'react-native';
import { TouchableButton } from '@components/button/TouchableButton';
import { useToggle } from '@hooks/useToggle';
import { useTheme } from '@hooks/useTheme';

interface Props {
  label: string;
  name?: string;
  placeholder: string;
  onChangeText?: (text: string, name?: string) => void;
  value: string;
  errorMessage?: string;
  secureTextEntry: boolean;
  onFocus?: () => void;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  readonly?: boolean;
  icon?: string;
  containerStyles?: any;
  style?: any;
  // Legacy props kept for backward compat (ignored, theme handles colors)
  colorText?: any;
  colorInput?: any;
  placeholderTextColor?: string;
  iconColor?: string;
}

export const InputForm = ({
  label,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  onFocus,
  errorMessage,
  name,
  multiline,
  keyboardType,
  readonly,
  icon,
  containerStyles,
}: Props) => {
  const { colors, radius, fontSize, fontWeight } = useTheme();
  const { isToggled, toggle } = useToggle();
  const [isFocused, setIsFocused] = React.useState(false);

  const borderColor = errorMessage
    ? colors.text.error
    : isFocused
    ? colors.border.inputFocused
    : colors.border.input;

  return (
    <View style={[styles.container, containerStyles]}>
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

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.surface.input,
            borderColor,
            borderRadius: radius.md,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text.primary,
              fontSize: fontSize.base,
            },
          ]}
          keyboardType={keyboardType ?? 'default'}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          onChangeText={(text) => onChangeText?.(text, name)}
          value={value}
          secureTextEntry={secureTextEntry && !isToggled}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textBreakStrategy="highQuality"
          readOnly={readonly}
        />
        {icon && (
          <TouchableButton
            variant="ghost"
            icon={!secureTextEntry ? icon : isToggled ? 'eye' : 'eye-off'}
            iconColor={isFocused ? colors.brand.primary : colors.icon.secondary}
            iconSize={20}
            styles={styles.iconButton}
            onPress={toggle}
          />
        )}
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  label: {
    marginBottom: 6,
    marginLeft: 2,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 4,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  error: {
    marginTop: 4,
    marginLeft: 2,
  },
});
