import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';

import { LabelText } from '@components/pure/LabelText';
import { InputDateTime } from '@components/input/InputDateTime';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { OnlineButton } from '@components/button/OnlineButton';
import { FormScreen } from '@components/layout/FormScreen';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { useVacations } from '@hooks/useVacations';
import { useErrorsStore } from '@stores/useErrorsStore';
import { useForm } from '@hooks/useForm';

import { VacationRequest } from '@app-types/VacationRequest';
import { formatStringDate, VACATION_TYPES } from '@config/constants';
import { handleOneLevelZodError } from '@utils/converted';
import { enjoyVacationShema } from '@validations/VacationValidations';
import { getVacationDaysByEmployeeCode } from '@services/VacationDaysService';

const initialVacationPay: VacationRequest = {
  contributorId: 0,
  startDate: '',
  endDate: '',
  period: '',
  state: 1,
  vacationType: VACATION_TYPES.enjoyVacations,
};

export const CreateHolidayEnjoymentScreen = () => {
  const { colors, fontSize } = useTheme();
  const { setError } = useErrorsStore();
  const { employeeCode, username, sendForm } = useVacations();

  const vacationEnjoyValidations = useCallback(
    async (vacation: VacationRequest) => {
      let errors = {};
      vacation.employeeCode = Number(employeeCode);
      const parce = await enjoyVacationShema.safeParseAsync(vacation);
      if (!parce.success) errors = handleOneLevelZodError(parce.error);
      return errors;
    },
    [employeeCode],
  );

  const { form, errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialVacationPay, vacationEnjoyValidations, sendForm, true);

  const { data, error, isLoading } = useQuery({
    queryKey: ['holidayPeriods', employeeCode],
    queryFn: () => getVacationDaysByEmployeeCode(1, Number(employeeCode)),
  });

  useEffect(() => {
    if (error) setError(error as any);
  }, [error, setError]);

  return (
    <FormScreen keyboardOffset={56}>
      <GlassCard style={styles.card} intensity="medium">
        <LabelText label="Fecha Solicitud" text={format(new Date(), formatStringDate)} />
        <LabelText label="Código de empleado" text={employeeCode} />
        <LabelText label="Nombre empleado" text={username} />

        {isLoading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.brand.primary} />
            <Text style={[styles.loadingText, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
              Cargando datos de vacaciones...
            </Text>
          </View>
        ) : (
          <LabelText
            label="Días Disponibles"
            text={`${data?.data?.DiasDisponibles?.toString() ?? '0'} días`}
          />
        )}

        <InputDateTime
          label="Fecha Inicio"
          name="startDate"
          icon="calendar-outline"
          mode="date"
          onChange={handleChange}
          value={form.startDate}
          parsedFn={(date) => format(date, formatStringDate, { locale: es })}
          errorMessage={errors?.startDate}
        />

        <InputDateTime
          label="Fecha Fin"
          name="endDate"
          icon="calendar-outline"
          mode="date"
          onChange={handleChange}
          value={form.endDate}
          parsedFn={(date) => format(date, formatStringDate, { locale: es })}
          errorMessage={errors?.endDate}
        />

        <OnlineButton
          component={
            <View style={styles.actions}>
              <TouchableButton
                variant="primary"
                title="Enviar solicitud"
                icon="send-outline"
                onPress={handleSubmit}
                loading={loading}
                fullWidth
              />
              <ResponseMessage message={message} success={success} loading={false} />
            </View>
          }
          text="para enviar la solicitud"
        />
      </GlassCard>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 8,
  },
  loadingText: {},
  actions: {
    gap: 8,
    marginTop: 12,
  },
});
