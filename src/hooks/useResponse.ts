import { useState } from 'react';

import { ApiResponse } from '@app-types/ApiResponse';
import { ValidationFailure } from '@app-types/ValidationFailure';

import { ErrorObject } from './useForm';
import { dispatchAlert, toCamelCase } from '@utils/converted';

export const useResponse = <T, U>() => {
  const [t, setT] = useState<T>();
  const [u, setU] = useState<ErrorObject>();
  const [m, setM] = useState<string>('');
  const [s, setS] = useState<boolean | null>(null);

  const showErrors = (errors: ValidationFailure[]) => {
    const errorsConverted: ErrorObject = {};

    errors.forEach((error) => {
      errorsConverted[toCamelCase(error.propertyName)] = error.errorMessage;
    });

    if (Object.keys(errorsConverted).length !== 0) {
      setU(errorsConverted);
      dispatchAlert({ title: 'Errores', message: errorsConverted });
    }
  };

  const setErrors = (errors: ErrorObject) => {
    setU(errors);
  };

  const set = ({ data, success, message }: ApiResponse<T | U>) => {
    if (success) {
      setT(data as T);
    } else {
      showErrors((data as ValidationFailure[]) ?? []);
    }
    setS(success);
    setM(message);
  };

  return { t, u, s, set, setU: setErrors, m };
};
