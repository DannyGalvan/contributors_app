import React from 'react';
import { Text, StyleSheet, TextInput, View, KeyboardType } from 'react-native';
import { appStyles } from '@styles/appStyles';
import { appColors } from '@styles/appColors';
import { TouchableButton } from '@components/button/TouchableButton';
import { useToggle } from '@hooks/useToggle';

interface Props {
  label: string;
  name?: string;
  placeholder: string;
  onChangeText?: any;
  value: string;
  errorMessage?: string;
  secureTextEntry: boolean;
  onFocus?: any;
  colorText?: any;
  colorInput?: any;
  placeholderTextColor?: string;
  containerStyles?: any;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  style?: any;
  readonly?: boolean;
  icon?: string;
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
  colorText,
  colorInput,
  placeholderTextColor,
  containerStyles,
  multiline,
  keyboardType,
  style,
  readonly,
  icon,
  iconColor,
}: Props) => {
  const { isToggled, toggle } = useToggle();
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={colorText ? colorText : appStyles.textDark}>{label}</Text>
      <View className="flex flex-row">
        <TextInput
          className={'w-full'}
          keyboardType={keyboardType ?? 'default'}
          style={[
            styles.input,
            colorInput ? colorInput : appStyles.inputDark,
            style,
          ]}
          placeholder={placeholder}
          onChangeText={(text) => onChangeText(text, name)}
          value={value}
          placeholderTextColor={placeholderTextColor ?? appColors.opacity}
          secureTextEntry={secureTextEntry && !isToggled}
          onFocus={onFocus}
          multiline={multiline}
          numberOfLines={8}
          textBreakStrategy="highQuality"
          readOnly={readonly}
        />
        {icon && (
          <TouchableButton
            iconColor={iconColor ?? appColors.white}
            styles={styles.refreshButton}
            icon={!secureTextEntry ? icon : isToggled ? 'eye' : 'eye-off'}
            title=""
            onPress={toggle}
          />
        )}
      </View>
      <View>
        <Text style={[appStyles.textDanger, styles.textCenter]}>
          {errorMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
  textCenter: {
    textAlign: 'center',
  },
  refreshButton: {
    padding: 5,
    position: 'absolute',
    right: 10,
  },
});
