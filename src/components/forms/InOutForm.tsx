import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InputSelect } from '@components/input/InputSelect';
import { SelectValues } from '@components/input/SelectValues';
import { TouchableButton } from '@components/button/TouchableButton';
import { LabelText } from '@components/pure/LabelText';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { GlassCard } from '@components/layout/GlassCard';
import { Map } from '@components/maps/Map';
import { useTheme } from '@hooks/useTheme';
import { ErrorObject, useForm } from '@hooks/useForm';
import { useInOut } from '@hooks/useInOut';

import { IN_OUT_VALUES } from '@config/constants';
import { inOutShemaOmit } from '@validations/InOutValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { InOutRequest } from '@app-types/InOutRequest';
import { getLocationByEmployeeCode } from '@services/locationService';

const initialInOut: InOutRequest = {
  businessId: 0,
  contributorId: 0,
  locationId: 0,
  latitude: '',
  longitude: '',
  state: 1,
  type: 2,
  distance: 0,
};

const inOutValidations = (form: InOutRequest) => {
  let errors: ErrorObject = {};
  const parce = inOutShemaOmit.safeParse(form);
  if (!parce.success) errors = handleOneLevelZodError(parce.error);
  return errors;
};

export const InOutForm = () => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { employeeCode, sendForm, username, setLocation } = useInOut();

  const { errors, handleChange, handleSubmit, loading, message, success } =
    useForm(initialInOut, inOutValidations, sendForm, true);

  return (
    <>
      <GlassCard style={styles.infoCard} intensity="low">
        <LabelText label="Código de empleado" text={employeeCode} />
        <LabelText label="Nombre empleado" text={username} />
      </GlassCard>

      <GlassCard style={styles.formCard} intensity="medium">
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
            queryKey="locations"
            onSelect={item => {
              handleChange('locationId', item.id);
              setLocation(item);
            }}
            queryFn={() =>
              getLocationByEmployeeCode({
                filters: `EmployeeCode:eq:${employeeCode} AND Center.State:eq:1`,
                include: 'location',
                includeTotal: false,
                pageNumber: 1,
                pageSize: 10,
              })
            }
            selector={data => data.location.description}
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
            Entrada o Salida
          </Text>
          <SelectValues
            entity="entrada/salida"
            textInput="Selecciona una"
            data={IN_OUT_VALUES}
            onSelect={item => handleChange('type', item.value)}
            selector={data => data.label}
          />
          {errors?.type ? (
            <Text
              style={[
                styles.errorText,
                { color: colors.text.error, fontSize: fontSize.xs },
              ]}
            >
              {errors.type}
            </Text>
          ) : null}
        </View>

        <TouchableButton
          variant="primary"
          title="Marcar"
          icon="finger-print-outline"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          styles={styles.btn}
        />

        <ResponseMessage message={message} success={success} loading={false} />
      </GlassCard>

      <GlassCard style={styles.mapCard} intensity="low">
        <Text
          style={[
            styles.mapTitle,
            {
              color: colors.text.primary,
              fontSize: fontSize.sm,
              fontWeight: fontWeight.semibold,
            },
          ]}
        >
          Ubicación actual
        </Text>
        <View style={styles.mapContainer}>
          <Map mapStyles={styles.map} />
        </View>
      </GlassCard>
    </>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  formCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  field: {
    marginBottom: 8,
  },
  fieldLabel: {
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  btn: {
    marginTop: 8,
  },
  mapCard: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  mapTitle: {
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  mapContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
