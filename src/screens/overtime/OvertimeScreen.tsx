import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { refresh } from '@react-native-community/netinfo';

import { getOvertimes, removeOvertime } from '@database/repository/overtimeRepository';
import { OvertimeCard } from '@components/card/OvertimeCard';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { OnlineButton } from '@components/button/OnlineButton';
import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { useErrorsStore } from '@stores/useErrorsStore';

import { Overtime } from '@database/models/Overtime';
import { createOvertimeWork } from '@services/overtimeWorkService';
import { dispatchAlert } from '@utils/converted';
import { ApiError } from '@app-types/Errors';

export const OvertimeScreen = () => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { setError } = useErrorsStore();

  const { data, refetch, isPending, error } = useQuery<Overtime[], ApiError>({
    queryKey: ['overtime'],
    queryFn: getOvertimes,
  });

  const { data: response, isPending: isLoading, mutate } = useMutation({
    mutationFn: async (overtimes: Overtime[]) => {
      const overtimesToCreate = overtimes.map((overtime) => ({ ...overtime, id: undefined }));

      for (const overtime of overtimesToCreate) {
        const result = await createOvertimeWork(overtime);
        if (!result.success) {
          dispatchAlert({ message: result.message, title: 'Error' });
          return { success: result.success, message: result.message };
        }
      }

      for (const overtime of overtimes) {
        await removeOvertime(overtime.id);
        await refresh();
      }

      dispatchAlert({ message: 'Horas extras marcadas correctamente', title: 'Operacion Exitosa' });
      return { success: true, message: 'Horas extras marcadas correctamente' };
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch, data]),
  );

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={(item) => <OvertimeCard data={item.item} refetch={refetch} />}
          refreshing={isPending}
          onRefresh={refetch}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <GlassCard style={styles.emptyCard} intensity="low">
              <Text style={[styles.emptyText, { color: colors.text.secondary, fontSize: fontSize.lg, fontWeight: fontWeight.semibold }]}>
                No hay horas extras registradas
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.text.muted, fontSize: fontSize.sm }]}>
                Usa el botón + para agregar horas extras
              </Text>
            </GlassCard>
          }
        />

        <OnlineButton
          component={
            <View style={styles.actions}>
              <TouchableButton
                variant="primary"
                icon="send-outline"
                title="Enviar horas extras"
                onPress={() => mutate(data)}
                loading={isLoading}
                fullWidth
              />
              <ResponseMessage
                message={response?.message}
                success={response?.success}
                loading={isLoading}
              />
            </View>
          }
          text="para poder enviar las horas extras"
        />
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  emptyCard: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 6,
  },
  emptySubtext: {
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
});
