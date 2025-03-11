import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToggle } from '@hooks/useToggle';
import { TouchableButton } from '@components/button/TouchableButton';
import { appColors } from '@styles/appColors';

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

  return (
    <View className="mx-5">
      <Text className="text-black font-bold text-xl">{label}</Text>
      <View className="flex flex-row">
        <Text className="text-black text-lg w-[90%] border-black border-b">
          {value}
        </Text>
        <TouchableButton
          iconColor={appColors.white}
          styles={styles.refreshButton}
          icon={icon}
          title=""
          onPress={dateToggle}
        />
      </View>
      <Text className="text-red-500 text-sm text-center">{errorMessage}</Text>
      <DateTimePickerModal
        isVisible={isDateToggle}
        mode={mode}
        onConfirm={(date) => {
          const parsed = parsedFn(date);
          onChange(name, parsed);
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
  sendButton: {
    backgroundColor: appColors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
  },
  refreshButton: {
    backgroundColor: appColors.primary,
    padding: 5,
    borderRadius: 10,
  },
});
