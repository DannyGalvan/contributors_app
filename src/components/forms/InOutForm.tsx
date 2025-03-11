import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputSelect } from '@components/input/InputSelect';
import { SelectValues } from '@components/input/SelectValues';
import { IN_OUT_VALUES } from '@config/constants';
import { appColors } from '@styles/appColors';
import { TouchableButton } from '@components/button/TouchableButton';
import { ErrorObject, useForm } from '@hooks/useForm';
import { inOutShemaOmit } from '@validations/InOutValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { InOutRequest } from '@app-types/InOutRequest';
import { useInOut } from '@hooks/useInOut';
import { LabelText } from '@components/pure/LabelText';
import { getLocationByEmployeeCode } from '@services/locationService';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { Map } from '@components/maps/Map';

const initialInOut: InOutRequest = {
  businessId: 0,
  contributorId: 0,
  locationId: 0,
  latitude: '',
  longitude: '',
  state: 1,
  type: 2,
};

const inOutValidations = (form: InOutRequest) => {
  let errors: ErrorObject = {};

  const parce = inOutShemaOmit.safeParse(form);

  if (!parce.success) {
    errors = handleOneLevelZodError(parce.error);
  }

  return errors;
};

export const InOutForm = () => {
  const { employeeCode, sendForm, username, setLocation } = useInOut();

  const { errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialInOut, inOutValidations, sendForm, true);

  return (
    <>
      <LabelText label="Código de empleado" text={employeeCode} />
      <LabelText label="Nombre empleado" text={username} />
      <View>
        <Text className="text-black font-bold text-xl mx-5">
          Seleccionar ubicación
        </Text>
        <InputSelect
          entity="ubicación"
          textInput={'Selecciona una'}
          queryKey="locations"
          onSelect={(item) => {
            handleChange('locationId', item.id);
            setLocation(item);
          }}
          queryFn={() =>
            getLocationByEmployeeCode(`EmployeeCode:eq:${employeeCode}`)
          }
          selector={(data) => data.location.description}
        />
        <Text className="text-red-700 text-sm px-5">{errors?.locationId}</Text>
      </View>
      <View>
        <Text className="text-black font-bold text-xl mx-5">
          Seleccionar Entrada o Salida
        </Text>
        <SelectValues
          entity="entrada/salida"
          textInput="Selecciona una"
          data={IN_OUT_VALUES}
          onSelect={(item) => handleChange('type', item.value)}
          selector={(data) => data.label}
        />
        <Text className="text-red-700 text-sm px-5">{errors?.type}</Text>
      </View>
      <View className="flex items-center my-2">
        <TouchableButton
          textClassName="text-xl font-bold text-white"
          className="rounded-xl"
          styles={styles.sendButton}
          icon="send"
          iconColor="white"
          title="Marcar"
          onPress={handleSubmit}
        />

        <ResponseMessage
          message={message}
          success={success}
          loading={loading}
        />
      </View>
      <View className="mx-5 h-72 border-2">
        <Text className="font-bold text-xl text-center text-black">
          Ubicacion Actual:
        </Text>
        <Map mapStyles={styles.map} />
      </View>
    </>
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
  map: {
    width: '100%',
    height: '85%',
    position: 'relative',
    zIndex: -1,
  },
});
