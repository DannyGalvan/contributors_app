import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableButton } from '@components/button/TouchableButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiError } from '@app-types/Errors';
import { onSearchUpdate } from '@observables/searchObservable';
import { useTheme } from '@hooks/useTheme';

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
  const { colors, radius, fontSize, fontWeight, shadows } = useTheme();

  const { isPending, data, refetch, error } = useQuery<T[], ApiError>({
    queryKey: [queryKey],
    queryFn: queryFn,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  useEffect(() => {
    const subscription = onSearchUpdate(queryKey).subscribe(event => {
      event.value === '' && ref.current?.reset();
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!isPending && data && data.length === 0) {
    return (
      <View style={styles.emptyRow}>
        <Text
          style={[
            styles.emptyText,
            { color: colors.text.error, fontSize: fontSize.sm },
          ]}
        >
          No hay {entity} disponibles
        </Text>
        <TouchableButton
          variant="primary"
          icon="refresh"
          iconSize={18}
          styles={styles.refreshBtn}
          onPress={() => {
            Alert.alert(
              'Actualizar',
              `¿Deseas actualizar la lista de ${entity}?`,
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Actualizar',
                  onPress: () => {
                    refetch();
                    onRefresh?.();
                    ToastAndroid.show(
                      `${entity} actualizados`,
                      ToastAndroid.SHORT,
                    );
                  },
                },
              ],
              { cancelable: true },
            );
          }}
        />
      </View>
    );
  }

  // Show error state with retry option
  if (error && !isPending) {
    return (
      <View style={styles.emptyRow}>
        <Text
          style={[
            styles.emptyText,
            { color: colors.text.error, fontSize: fontSize.sm },
          ]}
        >
          Error al cargar {entity}
        </Text>
        <TouchableButton
          variant="primary"
          icon="refresh"
          iconSize={18}
          styles={styles.refreshBtn}
          onPress={() => {
            Alert.alert(
              'Error',
              `No se pudieron cargar los ${entity}. ¿Deseas reintentar?`,
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Reintentar',
                  onPress: () => {
                    refetch();
                    onRefresh?.();
                    ToastAndroid.show(
                      `Reintentando cargar ${entity}...`,
                      ToastAndroid.SHORT,
                    );
                  },
                },
              ],
              { cancelable: true },
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {isPending ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={colors.brand.primary} />
          <Text
            style={[
              styles.loadingText,
              { color: colors.text.secondary, fontSize: fontSize.sm },
            ]}
          >
            Cargando {entity}...
          </Text>
        </View>
      ) : (
        <>
          <SelectDropdown
            ref={ref}
            data={data ?? []}
            onSelect={onSelect}
            renderButton={(selectedItem, isOpened) => (
              <View
                style={[
                  styles.dropBtn,
                  {
                    backgroundColor: colors.surface.input,
                    borderColor: isOpened
                      ? colors.border.inputFocused
                      : colors.border.input,
                    borderRadius: radius.md,
                  },
                ]}
              >
                <Icon
                  name="location-outline"
                  size={18}
                  color={
                    selectedItem ? colors.brand.primary : colors.icon.secondary
                  }
                  style={styles.dropLeadIcon}
                />
                <Text
                  style={[
                    styles.dropBtnText,
                    {
                      color: selectedItem
                        ? colors.text.primary
                        : colors.text.muted,
                      fontSize: fontSize.base,
                      fontWeight: fontWeight.regular,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {(selectedItem && selector(selectedItem)) ||
                    `${textInput} ${entity}`}
                </Text>
                <Icon
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.icon.secondary}
                />
              </View>
            )}
            renderItem={(item, _index, isSelected) => {
              try {
                return (
                  <View
                    style={[
                      styles.dropItem,
                      {
                        backgroundColor: isSelected
                          ? colors.surface.glassMd
                          : colors.surface.glassLg,
                      },
                    ]}
                  >
                    <Icon
                      name="checkmark-circle"
                      size={16}
                      color={isSelected ? colors.brand.primary : 'transparent'}
                      style={styles.dropItemIcon}
                    />
                    <Text
                      style={[
                        styles.dropItemText,
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
                      {selector(item) || 'Sin información'}
                    </Text>
                  </View>
                );
              } catch (err) {
                return (
                  <View style={styles.dropItem}>
                    <Text
                      style={[
                        styles.dropItemText,
                        { color: colors.text.error, fontSize: fontSize.base },
                      ]}
                    >
                      Error: Datos incompletos
                    </Text>
                  </View>
                );
              }
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: colors.surface.elevated,
              borderRadius: radius.md,
              borderColor: colors.border.glassStrong,
              borderWidth: 1,
              marginTop: 0,
              elevation: 4,
            }}
            searchInputStyle={[
              styles.searchInput,
              {
                backgroundColor: colors.surface.input,
                borderColor: colors.border.inputFocused,
              },
            ]}
            search
            searchPlaceHolder={`Buscar ${entity}`}
          />
          <TouchableButton
            variant="primary"
            icon="refresh"
            iconSize={18}
            styles={styles.refreshBtn}
            onPress={() => {
              Alert.alert(
                'Actualizar',
                `¿Deseas actualizar la lista de ${entity}?`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Actualizar',
                    onPress: () => {
                      refetch();
                      onRefresh?.();
                      ToastAndroid.show(
                        `Reintentando cargar ${entity}...`,
                        ToastAndroid.SHORT,
                      );
                    },
                  },
                ],
                { cancelable: true },
              );
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  emptyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 6,
    gap: 8,
  },
  emptyText: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {},
  dropBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  dropLeadIcon: {
    marginRight: 10,
  },
  dropBtnText: {
    flex: 1,
  },
  dropMenu: {
    overflow: 'hidden',
  },
  dropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropItemIcon: {
    marginRight: 10,
  },
  dropItemText: {},
  refreshBtn: {
    marginLeft: 8,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 12,
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
