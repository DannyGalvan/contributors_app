import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Title } from '@components/pure/Title';
import { useQuery } from '@tanstack/react-query';
import { getAllVacations } from '@services/vacationService';
import { FlatList } from 'react-native-gesture-handler';
import { VacationCard } from '@components/card/VacationCard';
import { useFocusEffect } from '@react-navigation/native';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiResponse } from '@app-types/ApiResponse';
import { VacationResponse } from '@app-types/VacationResponse';
import { ApiError } from '@app-types/Errors';
import { useAuth } from '@hooks/useAuth';

export const VacationsScreen = () => {
  const { setError } = useErrorsStore();
  const { idUser } = useAuth();
  const { data, refetch, isPending, error } = useQuery<
    ApiResponse<VacationResponse[]>,
    ApiError
  >({
    queryKey: ['vacations'],
    queryFn: () => getAllVacations(idUser),
  });

  useFocusEffect(
    useCallback(() => {
      refetch(); // Refetch se ejecuta cada vez que la pantalla gana el foco
    }, [refetch, data]),
  );

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  return (
    <View>
      <Title text="Solicitudes de Vacaciones" />

      <View className="h-[90%]">
        <FlatList
          data={data?.data ?? []}
          renderItem={(item) => <VacationCard data={item.item} />}
          refreshing={isPending}
          onRefresh={refetch}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center h-[500]">
              <Text className="text-center text-gray-500 font-bold text-2xl">
                No hay solicitudes de vacaciones registradas aun
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};
