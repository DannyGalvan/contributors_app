import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableButton } from '@components/button/TouchableButton';
import { appColors } from '@styles/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiError } from '@app-types/Errors';
import { onSearchUpdate } from '@observables/searchObservable';

interface InputSelectProps<T> {
  queryKey: string;
  entity: string;
  selector: (data: T) => string;
  queryFn: () => Promise<T[]>;
  onRefresh?: () => void;
  onSelect: (selectedItem: T, index: number) => void;
  textInput: string;
}

export const InputSelect = <T extends Object>({
  queryKey,
  queryFn,
  onSelect,
  onRefresh,
  entity,
  selector,
  textInput,
}: InputSelectProps<T>) => {
  const ref = useRef<SelectDropdown>(null);
  const { setError } = useErrorsStore();

  const { isPending, data, refetch, error } = useQuery<T[], ApiError>({
    queryKey: [queryKey],
    queryFn: queryFn,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  useEffect(() => {
    const subscription = onSearchUpdate(queryKey).subscribe((event) => {
      event.value == '' && ref.current.reset();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isPending && data && data.length === 0) {
    return (
      <View className="flex flex-row justify-center items-center px-4">
        <Text className="text-red-600">
          No hay {entity} disponibles para este usuario
        </Text>
        <TouchableButton
          iconColor={appColors.white}
          styles={styles.refreshButton}
          icon="refresh"
          title=""
          onPress={() => {
            refetch();
            onRefresh && onRefresh();
          }}
        />
      </View>
    );
  }

  return (
    <View className="flex flex-row justify-center px-4">
      {!isPending ? (
        <>
          <SelectDropdown
            ref={ref}
            searchInputStyle={{ width: '100%' }}
            data={data ?? []}
            onSelect={onSelect}
            renderButton={(selectedItem, isOpened) => (
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
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' }),
                }}
              >
                <Icon name="add-circle" style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>
                  {selector(item)}
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={true}
            dropdownStyle={styles.dropdownMenuStyle}
            search
            searchPlaceHolder={`Buscar ${entity}`}
          />
          <TouchableButton
            iconColor={appColors.white}
            styles={styles.refreshButton}
            icon="refresh"
            title=""
            onPress={() => {
              refetch();
              onRefresh && onRefresh();
            }}
          />
        </>
      ) : (
        <View>
          <ActivityIndicator size="large" color={appColors.info} />
          <Text className="text-black">Cargando {entity}...</Text>
        </View>
      )}
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
    padding: 5,
    borderRadius: 10,
  },
});
