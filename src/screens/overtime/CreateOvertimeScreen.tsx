import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { OvertimeRequest } from '@app-types/OvertimeRequest';
import { ErrorObject, useForm } from '@hooks/useForm';
import { OvertimeShemaOmit } from '@validations/OvertimeValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { InputDateTime } from '@components/input/InputDateTime';
import { InputForm } from '@components/input/InputForm';
import { InputSelect } from '@components/input/InputSelect';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { LabelText } from '@components/pure/LabelText';
import { FormScreen } from '@components/layout/FormScreen';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { useAuth } from '@hooks/useAuth';
import { useUpdateLocations } from '@hooks/useUpdateLocations';
import { createOvertime } from '@database/repository/overtimeRepository';
import { Overtime } from '@database/models/Overtime';
import { formatString, formatStringDate } from '@config/constants';
import { getAllLocationStores } from '@database/repository/locationStoreRepository';

const initialOvertime: OvertimeRequest = {
  date: format(new Date(), formatStringDate),
  startTime: '',
  endTime: '',
  reason: '',
  numberOfHours: 0,
  locationId: 0,
  state: 1,
};

const overtimeValidations = (overtime: OvertimeRequest) => {
  let errors: ErrorObject = {};
  const parce = OvertimeShemaOmit.safeParse(overtime);
  if (!parce.success) errors = handleOneLevelZodError(parce.error);
  return errors;
};

export const CreateOvertimeScreen = () => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { idUser, employeeCode } = useAuth();
  const { updateLocations } = useUpdateLocations();
  const [locationString, setLocationString] = useState('');

  const sendForm = async (overtime: OvertimeRequest) => {
    const overtimeInsert: Overtime = {
      contributorId: idUser,
      date: overtime.date,
      startTime: overtime.startTime,
      endTime: overtime.endTime,
      reason: overtime.reason,
      locationId: overtime.locationId,
      locationName: locationString,
      state: 1,
    };

    const response = await createOvertime(overtimeInsert);

    if (response.success) {
      dispatchAlert({
        title: 'Operacion Exitosa',
        message: 'Horas extras creadas correctamente',
      });
    } else {
      dispatchAlert({ title: 'Error', message: response.message });
    }

    return response;
  };

  const {
    errors,
    handleChange,
    handleSubmit,
    loading,
    message,
    success,
    form,
  } = useForm(initialOvertime, overtimeValidations, sendForm, true);

  return (
    <FormScreen keyboardOffset={56}>
      <GlassCard style={styles.card} intensity="medium">
        <LabelText label="Fecha Registro" text={form.date} />

        <InputDateTime
          label="Fecha y Hora Inicio"
          name="startTime"
          icon="timer-outline"
          mode="datetime"
          onChange={handleChange}
          value={form.startTime}
          parsedFn={date =>
            format(date, formatString, { locale: es })
              .replace('AM', 'a. m.')
              .replace('PM', 'p. m.')
          }
          errorMessage={errors?.startTime}
        />

        <InputDateTime
          label="Fecha y Hora Fin"
          name="endTime"
          icon="timer-outline"
          mode="datetime"
          onChange={handleChange}
          value={form.endTime}
          parsedFn={date =>
            format(date, formatString, { locale: es })
              .replace('AM', 'a. m.')
              .replace('PM', 'p. m.')
          }
          errorMessage={errors?.endTime}
        />

        <View style={styles.field}>
          <Text
            style={[
              styles.fieldLabel,
              {
                color: colors.text.primary,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.semibold,
              },
            ]}
          >
            Ubicación
          </Text>
          <InputSelect
            entity="ubicación"
            textInput="Selecciona una"
            queryKey={`locations ${employeeCode}`}
            onSelect={item => {
              handleChange('locationId', item.Id);
              setLocationString(item.location);
            }}
            onRefresh={() => updateLocations()}
            queryFn={() => getAllLocationStores()}
            selector={data => data.location}
          />
          {errors?.locationId ? (
            <Text
              style={[
                styles.errorText,
                { color: colors.text.error, fontSize: fontSize.xs },
              ]}
            >
              {errors.locationId}
            </Text>
          ) : null}
        </View>

        <InputForm
          name="reason"
          label="Razón"
          placeholder="Razón de las horas extras..."
          value={form.reason}
          onChangeText={text => handleChange('reason', text)}
          errorMessage={errors?.reason}
          secureTextEntry={false}
          multiline={true}
          style={styles.multilineInput}
        />

        <TouchableButton
          variant="primary"
          title="Guardar"
          icon="save-outline"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          styles={styles.btn}
        />

        <ResponseMessage message={message} success={success} loading={false} />
      </GlassCard>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  field: {
    marginBottom: 4,
  },
  fieldLabel: {
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  btn: {
    marginTop: 8,
  },
});
