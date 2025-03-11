import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VacationRequest } from '@app-types/VacationRequest';
import { formatStringDate, VACATION_TYPES } from '@config/constants';
import { enjoyVacationShema } from '@validations/VacationValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { Title } from '@components/pure/Title';
import { LabelText } from '@components/pure/LabelText';
import { format } from 'date-fns';
import { useForm } from '@hooks/useForm';
import { InputDateTime } from '@components/input/InputDateTime';
import { es } from 'date-fns/locale';
import { OnlineButton } from '@components/button/OnlineButton';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { appColors } from '@styles/appColors';
import { useVacations } from '@hooks/useVacations';
import { InputSelect } from '@components/input/InputSelect';
import { getAllVacationsDays } from '@services/VacationDaysService';

const initialVacationPay: VacationRequest = {
  contributorId: 0,
  startDate: '',
  endDate: '',
  period: '',
  state: 1,
  vacationType: VACATION_TYPES.enjoyVacations,
};

const vacationEnjoyValidations = (vacation: VacationRequest) => {
  let errors = {};

  const parce = enjoyVacationShema.safeParse(vacation);

  if (!parce.success) {
    errors = handleOneLevelZodError(parce.error);
  }

  return errors;
};

export const CreateHolidayEnjoymentScreen = () => {
  const { employeeCode, username, sendForm } = useVacations();

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    loading,
    message,
    success,
  } = useForm(initialVacationPay, vacationEnjoyValidations, sendForm, true);

  return (
    <View>
      <Title text="Crear Solicitud" />
      <LabelText
        label="Fecha Solicitud"
        text={format(new Date(), formatStringDate)}
      />
      <LabelText label="Código de empleado" text={employeeCode} />
      <LabelText label="Nombre empleado" text={username} />
      <View>
        <Text className="text-black font-bold text-xl mx-5">
          Seleccionar Periodo
        </Text>
        <InputSelect
          entity="Periodo"
          textInput={'Selecciona un'}
          queryKey="holidayPeriods"
          onSelect={(item) => {
            handleChange('period', `${item.initialYear} - ${item.finalYear}`);
          }}
          queryFn={() => getAllVacationsDays(`EmployeeCode:eq:${employeeCode}`)}
          selector={(data) =>
            `${data.initialYear} - ${data.finalYear} - ${data.days} días`
          }
        />
        <Text className="text-red-700 text-sm px-5">{errors?.period}</Text>
      </View>
      <InputDateTime
        label="Fecha Inicio"
        name="startDate"
        icon="calendar"
        mode="date"
        onChange={handleChange}
        value={form.startDate}
        parsedFn={(date) => format(date, formatStringDate, { locale: es })}
        errorMessage={errors?.startTime}
      />
      <InputDateTime
        label="Fecha Fin"
        name="endDate"
        icon="calendar"
        mode="date"
        onChange={handleChange}
        value={form.endDate}
        parsedFn={(date) => format(date, formatStringDate, { locale: es })}
        errorMessage={errors?.endDate}
      />
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
