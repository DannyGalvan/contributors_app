import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@hooks/useTheme';
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
  const { colors, fontSize, radius, fontWeight } = useTheme();
  const ref = useRef<SelectDropdown>(null);

  useEffect(() => {
    const subscription = onSearchUpdate(entity).subscribe(event => {
      event.value == '' && ref.current.reset();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <SelectDropdown
        ref={ref}
        searchInputStyle={[
          styles.searchInput,
          {
            backgroundColor: colors.surface.input,
            borderColor: colors.border.inputFocused,
            borderRadius: radius.md,
          },
        ]}
        searchInputTxtColor={colors.text.primary}
        data={data ?? []}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => (
          <View
            style={[
              styles.button,
              {
                backgroundColor: colors.surface.input,
                borderColor: isOpened
                  ? colors.border.inputFocused
                  : colors.border.input,
                borderRadius: radius.md,
              },
            ]}
          >
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                size={20}
                color={colors.icon.primary}
                style={styles.leadIcon}
              />
            )}
            <Text
              style={[
                styles.buttonText,
                {
                  color: selectedItem ? colors.text.primary : colors.text.muted,
                  fontSize: fontSize.base,
                },
              ]}
              numberOfLines={1}
            >
              {(selectedItem && selector(selectedItem)) ||
                `${textInput} ${entity}`}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.icon.secondary}
            />
          </View>
        )}
        renderSearchInputRightIcon={() => (
          <Icon
            name="search"
            size={16}
            color={colors.icon.secondary}
            style={{ marginRight: 8 }}
          />
        )}
        renderItem={(item, _index, isSelected) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: isSelected
                  ? colors.surface.glassMd
                  : colors.surface.glassLg,
              },
            ]}
          >
            <Text
              style={[
                styles.itemText,
                {
                  color: isSelected
                    ? colors.brand.primary
                    : colors.text.primary,
                  fontSize: fontSize.base,
                  fontWeight: isSelected
                    ? fontWeight.medium
                    : fontWeight.regular,
                },
              ]}
            >
              {selector(item)}
            </Text>
            {isSelected && (
              <Icon name="checkmark" size={16} color={colors.brand.primary} />
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        searchPlaceHolderColor={colors.text.muted}
        dropdownStyle={{
          backgroundColor: colors.surface.elevated,
          borderRadius: radius.md,
          borderColor: colors.border.glassStrong,
          borderWidth: 1,
          marginTop: 0,
          elevation: 4,
        }}
        search
        searchPlaceHolder={`Buscar ${entity}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  leadIcon: {
    marginRight: 8,
  },
  buttonText: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemText: {
    flex: 1,
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 0,
  },
});
