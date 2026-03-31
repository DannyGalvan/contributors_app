import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

import { VacationCard } from '@components/card/VacationCard';
import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { useErrorsStore } from '@stores/useErrorsStore';
import { useAuth } from '@hooks/useAuth';

import { getAllVacations } from '@services/vacationService';
import { ApiResponse } from '@app-types/ApiResponse';
import { VacationResponse } from '@app-types/VacationResponse';
import { ApiError } from '@app-types/Errors';

export const VacationsScreen = () => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { setError } = useErrorsStore();
  const { idUser } = useAuth();

  const { data, refetch, isPending, error } = useQuery<ApiResponse<VacationResponse[]>, ApiError>({
    queryKey: ['vacations'],
    queryFn: () => getAllVacations(idUser),
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
      <FlatList
        data={data?.data ?? []}
        renderItem={(item) => <VacationCard data={item.item} />}
        refreshing={isPending}
        onRefresh={refetch}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <GlassCard style={styles.emptyCard} intensity="low">
            <Text style={[styles.emptyText, { color: colors.text.secondary, fontSize: fontSize.lg, fontWeight: fontWeight.semibold }]}>
              No hay solicitudes registradas
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.text.muted, fontSize: fontSize.sm }]}>
              Tus solicitudes de vacaciones aparecerán aquí
            </Text>
          </GlassCard>
        }
      />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
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
});
