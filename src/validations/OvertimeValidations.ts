import {
  required_error,
  invalid_type_error,
  formatString,
} from '@config/constants';
import { z } from 'zod';
import { es } from 'date-fns/locale';
import { parse } from 'date-fns';

export const OvertimeShema = z.object({
  contributorId: z
    .number({ required_error, invalid_type_error })
    .refine((value) => value > 0, 'Debes seleccionar un colaborador'),
  date: z
    .string({ required_error, invalid_type_error })
    .refine((value) => value !== '', { message: 'La fecha es requerida' }),
  startTime: z
    .string({ required_error, invalid_type_error })
    .refine((value) => value !== '', {
      message: 'La hora de inicio es requerida',
    }),
  endTime: z
    .string({ required_error, invalid_type_error })
    .refine((value) => value !== '', {
      message: 'La hora de fin es requerida',
    }),
  reason: z
    .string({ required_error, invalid_type_error })
    .min(5, 'La razón debe tener al menos 5 caracteres')
    .max(250, 'La razón debe tener como máximo 250 caracteres')
    .refine((value) => value !== '', { message: 'La razón es requerida' }),
  numberOfHours: z
    .number({ required_error, invalid_type_error })
    .refine((value) => value !== 0, {
      message: 'Las horas extras no pueden ser 0',
    }),
  locationId: z
    .number({ required_error, invalid_type_error })
    .int({ message: 'La ubicación es requerida' })
    .gte(1, { message: 'La ubicación es requerida' }),
  state: z.number({ required_error, invalid_type_error }),
});

export const OvertimeShemaOmit = OvertimeShema.omit({
  contributorId: true,
  numberOfHours: true,
})
  .refine(
    (value) => {
      const startTime = parse(value.startTime, formatString, new Date(), {
        locale: es,
      });
      const endTime = parse(value.endTime, formatString, new Date(), {
        locale: es,
      });

      return startTime < endTime;
    },
    {
      message:
        'la fecha y hora de inicio debe ser menor a la fecha y hora de fin',
      path: ['startTime'],
    },
  )
  .refine(
    (value) => {
      const startTime = parse(value.startTime, formatString, new Date(), {
        locale: es,
      });
      const endTime = parse(value.endTime, formatString, new Date(), {
        locale: es,
      });

      return endTime > startTime;
    },
    {
      message:
        'la fecha y hora de fin debe ser mayor a la fecha y hora de inicio',
      path: ['endTime'],
    },
  );
