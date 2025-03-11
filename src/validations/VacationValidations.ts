import { z } from 'zod';
import {
  formatStringDate,
  invalid_type_error,
  required_error,
} from '@config/constants';
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';

export const vacationShema = z.object({
  period: z
    .string({ invalid_type_error, required_error })
    .min(11, 'El periodo debe tener al menos 7 caracteres')
    .max(11, 'El periodo debe tener como máximo 7 caracteres')
    .regex(/^\d{4} - \d{4}$/, 'El periodo debe tener el formato AAAA - AAAA')
    .refine((value) => value !== '', { message: 'El periodo es requerido' }),
  startDate: z
    .string({ invalid_type_error, required_error })
    .min(10, 'La fecha de inicio debe tener 10 caracteres')
    .max(10, 'La fecha de inicio debe tener 10 caracteres')
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'La fecha de inicio debe tener el formato DD-MM-AAAA',
    )
    .refine((value) => value !== '', {
      message: 'La fecha de inicio es requerida',
    }),
  endDate: z
    .string({ invalid_type_error, required_error })
    .min(10, 'La fecha de fin debe tener 10 caracteres')
    .max(10, 'La fecha de fin debe tener 10 caracteres')
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'La fecha de fin debe tener el formato DD-MM-AAAA',
    )
    .refine((value) => value !== '', {
      message: 'La fecha de fin es requerida',
    }),
  vacationType: z
    .number({ invalid_type_error, required_error })
    .int()
    .positive('El tipo de vacaciones debe ser un número positivo')
    .refine((value) => value !== 0, {
      message: 'El tipo de vacaciones es requerido',
    }),
  state: z
    .number({ invalid_type_error, required_error })
    .int()
    .gte(0, 'El estado debe ser un número mayor o igual a 0'),
});

export const vacationPayShema = vacationShema.omit({
  endDate: true,
  startDate: true,
});

export const enjoyVacationShema = vacationShema
  .refine(
    (value) => {
      const startTime = parse(value.startDate, formatStringDate, new Date(), {
        locale: es,
      });
      const endTime = parse(value.endDate, formatStringDate, new Date(), {
        locale: es,
      });

      return startTime < endTime;
    },
    {
      message: 'la fecha de inicio debe ser menor a la fecha de fin',
      path: ['startDate'],
    },
  )
  .refine(
    (value) => {
      const startTime = parse(value.startDate, formatStringDate, new Date(), {
        locale: es,
      });
      const endTime = parse(value.endDate, formatStringDate, new Date(), {
        locale: es,
      });

      return endTime > startTime;
    },
    {
      message: 'la fecha de fin debe ser mayor a la fecha de inicio',
      path: ['endDate'],
    },
  );
