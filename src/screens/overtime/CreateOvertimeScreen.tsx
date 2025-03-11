import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OvertimeRequest } from '@app-types/OvertimeRequest';
import { ErrorObject, useForm } from '@hooks/useForm';
import { OvertimeShemaOmit } from '@validations/OvertimeValidations';
import { dispatchAlert, handleOneLevelZodError } from '@utils/converted';
import { InputDateTime } from '@components/input/InputDateTime';
import { InputForm } from '@components/input/InputForm';
import { appStyles } from '@styles/appStyles';
import { appColors } from '@styles/appColors';
import { TouchableButton } from '@components/button/TouchableButton';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { createOvertime } from '@database/repository/overtimeRepository';
import { Overtime } from '@database/models/Overtime';
import { useAuth } from '@hooks/useAuth';
import { LabelText } from '@components/pure/LabelText';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatString, formatStringDate } from '@config/constants';
import { Title } from '@components/pure/Title';
import { InputSelect } from '@components/input/InputSelect';
import { getAllLocationStores } from '@database/repository/locationStoreRepository';
import { useUpdateLocations } from '@hooks/useUpdateLocations';

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

  if (!parce.success) {
    errors = handleOneLevelZodError(parce.error);
  }

  return errors;
};

export const CreateOvertimeScreen = () => {
  const { idUser, employeeCode } = useAuth();
  const { updateLocations, locationString, setLocationString } =
    useUpdateLocations();

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
      dispatchAlert({
        title: 'Error',
        message: response.message,
      });
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
    <View>
      <Title text="Crear Horas Extras" />

      <LabelText label="Fecha Registro" text={form.date} />

      <InputDateTime
        label="Fecha y Hora Inicio"
        name="startTime"
        icon="timer"
        mode="datetime"
        onChange={handleChange}
        value={form.startTime}
        parsedFn={(date) =>
          format(date, formatString, { locale: es })
            .replace('AM', 'a. m.')
            .replace('PM', 'p. m.')
        }
        errorMessage={errors?.startTime}
      />

      <InputDateTime
        label="Fecha y Hora Fin"
        name="endTime"
        icon="timer"
        mode="datetime"
        onChange={handleChange}
        value={form.endTime}
        parsedFn={(date) =>
          format(date, formatString, { locale: es })
            .replace('AM', 'a. m.')
            .replace('PM', 'p. m.')
        }
        errorMessage={errors?.endTime}
      />

      <View>
        <Text className="text-black font-bold text-xl mx-5">
          Seleccionar ubicación
        </Text>
        <InputSelect
          entity="ubicación"
          textInput={'Selecciona una'}
          queryKey={`locations ${employeeCode}`}
          onSelect={(item) => {
            handleChange('locationId', item.Id);
            setLocationString(item.location);
          }}
          onRefresh={updateLocations}
          queryFn={() => getAllLocationStores()}
          selector={(data) => data.location}
        />
        <Text className="text-red-700 text-sm px-5">{errors?.locationId}</Text>
      </View>

      <InputForm
        style={styles.input}
        containerStyles={styles.inputContainer}
        name="reason"
        errorMessage={errors?.reason}
        colorText={styles.inputLabel}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Razón"
        value={form.reason}
        onChangeText={(text: string) => handleChange('reason', text)}
        placeholder="Razón de las horas extras..."
        secureTextEntry={false}
        multiline={true}
      />

      <View className="flex items-center my-2">
        <TouchableButton
          textClassName="text-xl font-bold text-white"
          className="rounded-xl"
          styles={styles.sendButton}
          icon="send"
          iconColor="white"
          title="Guardar"
          onPress={handleSubmit}
        />

        <ResponseMessage
          message={message}
          success={success}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: appColors.black,
    fontSize: 19,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    height: 125,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
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
