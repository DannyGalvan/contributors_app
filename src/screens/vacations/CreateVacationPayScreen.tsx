import React, { use, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Title } from '@components/pure/Title';
import { LabelText } from '@components/pure/LabelText';
import { VacationRequest } from '@app-types/VacationRequest';
import { format } from 'date-fns';
import { formatStringDate, VACATION_TYPES } from '@config/constants';
import { handleOneLevelZodError } from '@utils/converted';
import { vacationPayShema } from '@validations/VacationValidations';
import { useForm } from '@hooks/useForm';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { appColors } from '@styles/appColors';
import { OnlineButton } from '@components/button/OnlineButton';
import { useVacations } from '@hooks/useVacations';
import { InputSelect } from '@components/input/InputSelect';
import {
  getAllVacationsDays,
  getVacationDaysByEmployeeCode,
} from '@services/VacationDaysService';
import { useQuery } from '@tanstack/react-query';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiError } from '@app-types/Errors';

const initialVacationPay: VacationRequest = {
  contributorId: 0,
  startDate: 'N/A',
  endDate: 'N/A',
  period: '',
  state: 1,
  vacationType: VACATION_TYPES.payVacations,
};

const vacationPayValidations = (vacation: VacationRequest) => {
  let errors = {};

  const parce = vacationPayShema.safeParse(vacation);

  if (!parce.success) {
    errors = handleOneLevelZodError(parce.error);
  }

  return errors;
};

export const CreateVacationPayScreen = () => {
  const { setError } = useErrorsStore();
  const { employeeCode, username, sendForm } = useVacations();

  const { errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialVacationPay, vacationPayValidations, sendForm, true);

  const { data, error, isLoading } = useQuery({
    queryKey: ['holidayPeriods', employeeCode],
    queryFn: () => getVacationDaysByEmployeeCode(1, Number(employeeCode)),
  });

  useEffect(() => {
    if (error) {
      setError(error as ApiError);
    }
  }, [error, setError]);

  return (
    <View>
      <Title text="Crear Solicitud" />
      <LabelText
        label="Fecha Solicitud"
        text={format(new Date(), formatStringDate)}
      />
      <LabelText label="Código de empleado" text={employeeCode} />
      <LabelText label="Nombre empleado" text={username} />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={appColors.info} />
          <Text className="text-gray-700">Cargando datos de vacaciones...</Text>
        </View>
      ) : (
        <>
          <LabelText
            label="Dias Derecho"
            text={`${data.data.DiasDerecho.toString()} dias`}
          />
          <LabelText
            label="Dias Gozados"
            text={`${data.data.DiasGozados.toString()} dias`}
          />
          <LabelText
            label="Dias Disponibles"
            text={`${data.data.DiasDisponibles.toString()} dias`}
          />
        </>
      )}
      <View>
        <Text className="text-black font-bold text-xl mx-5">
          Seleccionar Periodo
        </Text>
        <InputSelect
          entity="Periodo"
          textInput={'Selecciona un'}
          queryKey="holidayPeriods"
          onSelect={item => {
            handleChange('period', `${item.initialYear} - ${item.finalYear}`);
          }}
          queryFn={() =>
            getAllVacationsDays({
              filters: `EmployeeCode:eq:${employeeCode}`,
              include: '',
              includeTotal: false,
              pageNumber: 1,
              pageSize: 1000,
            })
          }
          selector={data =>
            `${data.initialYear} - ${data.finalYear} - ${data.days} días`
          }
        />
        <Text className="text-red-700 text-sm px-5">{errors?.period}</Text>
      </View>
      <OnlineButton
        component={
          <View className="flex items-center my-2">
            <TouchableButton
              textClassName="text-xl font-bold text-white"
              className="rounded-xl"
              styles={styles.sendButton}
              icon="send"
              iconColor="white"
              title="Enviar"
              onPress={handleSubmit}
            />

            <ResponseMessage
              message={message}
              success={success}
              loading={loading}
            />
          </View>
        }
        text="para enviar la solicitud"
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
