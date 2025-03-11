import { useEffect, useState } from 'react';

import { useResponse } from '@hooks/useResponse';
import { ApiResponse } from '@app-types/ApiResponse';
import { ValidationFailure } from '@app-types/ValidationFailure';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ApiError } from '@app-types/Errors';

export interface ErrorObject {
  [key: string]: string | undefined;
}

export const useForm = <T, U>(
  initialForm: T,
  validateForm: (form: T) => ErrorObject,
  peticion: (form: T) => Promise<ApiResponse<U | ValidationFailure[]>>,
  reboot?: boolean,
) => {
  const { setError } = useErrorsStore();
  const [form, setForm] = useState<T>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const { s, set, t, u, m, setU } = useResponse<U, ValidationFailure[]>();

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = (field: string, value: any) => {
    const newForm = {
      ...form,
      [field]: value,
    };

    setForm(newForm);
    setU(validateForm(newForm));
  };

  const handleBlur = (field: string, value: any) => {
    handleChange(field, value);
  };

  const handleSubmit = async () => {
    set({
      success: null,
      data: null,
      message: null,
    });

    const valErr = validateForm(form);
    setU(valErr);
    setLoading(true);

    if (Object.keys(valErr).length === 0) {
      try {
        const response = await peticion(form);

        if (response.success) {
          reboot && setForm(initialForm);
        } else {
          set(response);
        }

        set(response);
      } catch (error: any) {
        if (error instanceof ApiError) {
          setError({
            statusCode: error.statusCode,
            message: error.message,
            name: error.name,
          });

          set({
            success: false,
            data: null,
            message: `${error?.name} ${error?.stack}`,
          });
        } else {
          set({
            success: false,
            data: null,
            message: `${error?.name} ${error?.stack}`,
          });
        }
      }
    } else {
      set({
        success: false,
        data: null,
        message: 'Error en la validación del formulario',
      });
    }
    setLoading(false);
  };

  return {
    form,
    loading,
    handleBlur,
    handleChange,
    handleSubmit,
    success: s,
    response: t,
    errors: u,
    message: m,
  };
};
