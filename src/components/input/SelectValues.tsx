import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { appColors } from '@styles/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { onSearchUpdate } from '@observables/searchObservable';

interface SelectValuesProps<T> {
  entity: string;
  selector: (data: T) => string;
  data: T[];
  onSelect: (selectedItem: T, index: number) => void;
  textInput: string;
}

export const SelectValues = <T extends Object>({
  onSelect,
  entity,
  selector,
  textInput,
  data,
}: SelectValuesProps<T>) => {
  const ref = useRef<SelectDropdown>(null);

  useEffect(() => {
    const subscription = onSearchUpdate(entity).subscribe((event) => {
      event.value == '' && ref.current.reset();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View className="flex flex-column items-center justify-center px-1">
      <SelectDropdown
        ref={ref}
        searchInputStyle={{ width: '100%' }}
        data={data ?? []}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selector(selectedItem)) ||
                  `${textInput} ${entity}`}
              </Text>
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#D2D9DF' }),
              }}
            >
              <Icon name={'add-circle'} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{selector(item)}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
        search
        searchPlaceHolder={`Buscar ${entity}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '90%',
    height: 45,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    marginTop: -30,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  refreshButton: {
    backgroundColor: appColors.primary,
  },
});
