import { useState } from 'react';
import { PermitterMarks } from '@app-types/PermitterMarks';
import { useAuth } from '@hooks/useAuth';
import { useLocation } from '@hooks/useLocation';
import { InOutRequest } from '@app-types/InOutRequest';
import { inOutShema } from '@validations/InOutValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { Alert } from 'react-native';
import { ValidationFailure } from '@app-types/ValidationFailure';
import { calculateDistance } from '@services/distanceService';
import { createInOut } from '@services/inOutService';
import { updateSearch } from '@observables/searchObservable';

export const useInOut = () => {
  const { employeeCode, companyCode, idUser, username } = useAuth();
  const { currentUserLocation } = useLocation();
  const [location, setLocation] = useState<PermitterMarks>(null);

  const sendForm = async (form: InOutRequest) => {
    form.businessId = companyCode;
    form.contributorId = idUser;
    form.latitude = currentUserLocation.latitude.toString();
    form.longitude = currentUserLocation.longitude.toString();

    const parce = inOutShema.safeParse(form);

    if (!parce.success) {
      const errors = handleOneLevelZodError(parce.error);

      Alert.alert(
        'Error',
        `Error en los datos enviados ${Object.entries(errors)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')}`,
      );
      return {
        success: false,
        message: 'Error en los datos enviados',
        data: Object.entries(errors).map(([key, value]) => {
          const error: ValidationFailure = {
            propertyName: key,
            errorMessage: value,
            attemptedValue: form[key],
            customerState: form,
            errorCode: 'Invalid',
          };

          return error;
        }),
      };
    }

    const distance = await calculateDistance(currentUserLocation, {
      latitude: location.location.latitude,
      longitude: location.location.longitude,
    });

    if (!distance.success) {
      Alert.alert('Error', distance.message);
      return {
        success: false,
        message: distance.message,
        data: [],
      };
    }

    if (distance.distance >= 100) {
      const message = `La distancia entre la ubicación actual y la de la empresa es mayor a 100 metros : hay ${distance.distance} mts de distancia`;
      Alert.alert('Error', message);

      return {
        success: false,
        message: message,
        data: [],
      };
    }

    const response = await createInOut(form);

    if (!response.success) {
      const errors = response.data as ValidationFailure[];
      Alert.alert(
        'Error',
        `${response.message} ${errors.map((e) => e.errorMessage).join(', ')}`,
      );
      return response;
    }

    Alert.alert('Exito', response.message);

    updateSearch('locations', '');
    updateSearch('entrada/salida', '');

    return response;
  };

  return {
    sendForm,
    setLocation,
    location,
    employeeCode,
    username,
  };
};
