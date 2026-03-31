import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import { LabelText } from '@components/pure/LabelText';
import { InputSelect } from '@components/input/InputSelect';
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
import { ApiError } from '@app-types/Errors';
import { formatStringDate, VACATION_TYPES } from '@config/constants';
import { handleOneLevelZodError } from '@utils/converted';
import { vacationPayShema } from '@validations/VacationValidations';
import { getAllVacationsDays, getVacationDaysByEmployeeCode } from '@services/VacationDaysService';

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
  if (!parce.success) errors = handleOneLevelZodError(parce.error);
  return errors;
};

export const CreateVacationPayScreen = () => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { setError } = useErrorsStore();
  const { employeeCode, username, sendForm } = useVacations();

  const { handleSubmit, loading, message, success, handleChange, errors } =
    useForm(initialVacationPay, vacationPayValidations, sendForm, true);

  const { data, error, isLoading } = useQuery({
    queryKey: ['holidayPeriods', employeeCode],
    queryFn: () => getVacationDaysByEmployeeCode(1, Number(employeeCode)),
  });

  useEffect(() => {
    if (error) setError(error as ApiError);
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

        <View style={styles.field}>
          <Text style={[styles.fieldLabel, { color: colors.text.primary, fontSize: fontSize.sm, fontWeight: fontWeight.semibold }]}>
            Período
          </Text>
          <InputSelect
            entity="Periodo"
            textInput="Selecciona un"
            queryKey="holidayPeriods"
            onSelect={(item) => {
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
            selector={(data) => `${data.initialYear} - ${data.finalYear} - ${data.days} días`}
          />
          {errors?.period ? (
            <Text style={[styles.errorText, { color: colors.text.error, fontSize: fontSize.xs }]}>
              {errors.period}
            </Text>
          ) : null}
        </View>

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
  field: {
    marginVertical: 4,
  },
  fieldLabel: {
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  actions: {
    gap: 8,
    marginTop: 12,
  },
});
