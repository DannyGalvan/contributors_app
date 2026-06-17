import { useEffect, useRef, useState } from 'react';

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
  validateForm: (form: T) => Promise<ErrorObject> | ErrorObject,
  peticion: (form: T) => Promise<ApiResponse<U | ValidationFailure[]>>,
  reboot?: boolean,
) => {
  const { setError } = useErrorsStore();
  const [form, setForm] = useState<T>(initialForm);
  const formRef = useRef<T>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const { s, set, t, u, m, setU } = useResponse<U, ValidationFailure[]>();

  useEffect(() => {
    formRef.current = initialForm;
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = async (field: string, value: any) => {
    const newForm = { ...formRef.current, [field]: value };
    formRef.current = newForm;

    setForm(prev => ({ ...prev, [field]: value }));

    const valErr = await validateForm(newForm);
    setU(valErr);
  };

  const handleBlur = async (field: string, value: any) => {
    await handleChange(field, value);
  };

  const handleSubmit = async () => {
    set({
      success: null,
      data: null,
      message: null,
    });

    const valErr = await validateForm(form);
    setU(valErr);
    setLoading(true);

    if (Object.keys(valErr).length === 0) {
      try {
        const response = await peticion(form);

        if (response.success) {
          if (reboot) {
            formRef.current = initialForm;
            setForm(initialForm);
          }
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
