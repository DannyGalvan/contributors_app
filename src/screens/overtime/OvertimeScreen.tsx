import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  getOvertimes,
  removeOvertime,
} from '@database/repository/overtimeRepository';
import { OvertimeCard } from '@components/card/OvertimeCard';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { appColors } from '@styles/appColors';
import { Overtime } from '@database/models/Overtime';
import { refresh } from '@react-native-community/netinfo';
import { createOvertimeWork } from '@services/overtimeWorkService';
import { dispatchAlert } from '@utils/converted';
import { OnlineButton } from '@components/button/OnlineButton';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiError } from '@app-types/Errors';

export const OvertimeScreen = () => {
  const { setError } = useErrorsStore();
  const { data, refetch, isPending, error } = useQuery<Overtime[], ApiError>({
    queryKey: ['overtime'],
    queryFn: getOvertimes,
  });

  const {
    data: response,
    isPending: isLoading,
    mutate,
  } = useMutation({
    mutationFn: async (overtimes: Overtime[]) => {
      const overtimesToCreate = overtimes.map((overtime) => {
        const newOvertime = { ...overtime, id: undefined };

        return newOvertime;
      });

      for (const overtime of overtimesToCreate) {
        const result = await createOvertimeWork(overtime);
        if (!result.success) {
          dispatchAlert({
            message: result.message,
            title: 'Error',
          });
          return { success: result.success, message: result.message };
        }
      }

      for (const overtime of overtimes) {
        await removeOvertime(overtime.id);
        await refresh();
      }

      dispatchAlert({
        message: 'Horas extras marcadas correctamente',
        title: 'Operacion Exitosa',
      });

      return { success: true, message: 'Horas extras marcadas correctamente' };
    },
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
    <View className="flex-1">
      <Text className="text-black text-center font-bold text-2xl">
        Listado de Horas Extras
      </Text>
      <View className="h-[75%]">
        <FlatList
          data={data}
          renderItem={(item) => (
            <OvertimeCard data={item.item} refetch={refetch} />
          )}
          refreshing={isPending}
          onRefresh={refetch}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center h-[500]">
              <Text className="text-center text-gray-500 font-bold text-2xl">
                No hay horas extras registradas aun
              </Text>
            </View>
          }
        />
      </View>

      <OnlineButton
        component={
          <View className="flex items-center">
            <TouchableButton
              textClassName="text-xl font-bold text-white"
              className="rounded-xl"
              styles={styles.sendButton}
              icon="send"
              iconColor="white"
              title="Enviar horas extras"
              onPress={() => mutate(data)}
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
  );
};

const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: appColors.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
