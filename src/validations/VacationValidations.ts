import { z } from 'zod';
import {
  formatStringDate,
  invalid_type_error,
  MAX_REQUESTS_DAYS_VACATIONS,
  required_error,
} from '@config/constants';
import { differenceInBusinessDays, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { getVacationDaysByEmployeeCode } from '@services/VacationDaysService';

export const vacationShema = z.object({
  period: z
    .string({ invalid_type_error, required_error })
    .min(11, 'El periodo debe tener al menos 11 caracteres')
    .max(11, 'El periodo debe tener como máximo 11 caracteres')
    .regex(/^\d{4} - \d{4}$/, 'El periodo debe tener el formato AAAA - AAAA')
    .refine(value => value !== '', { message: 'El periodo es requerido' }),
  startDate: z
    .string({ invalid_type_error, required_error })
    .min(10, 'La fecha de inicio debe tener 10 caracteres')
    .max(10, 'La fecha de inicio debe tener 10 caracteres')
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'La fecha de inicio debe tener el formato DD-MM-AAAA',
    )
    .refine(value => value !== '', {
      message: 'La fecha de inicio es requerida',
    }),
  employeeCode: z
    .number({ invalid_type_error, required_error })
    .int()
    .positive('El código de empleado debe ser un número positivo')
    .refine(value => value !== 0, {
      message: 'El código de empleado es requerido',
    }),
  endDate: z
    .string({ invalid_type_error, required_error })
    .min(10, 'La fecha de fin debe tener 10 caracteres')
    .max(10, 'La fecha de fin debe tener 10 caracteres')
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'La fecha de fin debe tener el formato DD-MM-AAAA',
    )
    .refine(value => value !== '', {
      message: 'La fecha de fin es requerida',
    }),
  vacationType: z
    .number({ invalid_type_error, required_error })
    .int()
    .positive('El tipo de vacaciones debe ser un número positivo')
    .refine(value => value !== 0, {
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
  employeeCode: true,
  period: true,
});

export const enjoyVacationShema = vacationShema
  .refine(
    value => {
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
    value => {
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
  )
  .refine(
    async value => {
      try {
        // Parsear las fechas
        const startDate = parse(value.startDate, formatStringDate, new Date(), {
          locale: es,
        });
        const endDate = parse(value.endDate, formatStringDate, new Date(), {
          locale: es,
        });

        // Calcular días solicitados (incluyendo ambos días)
        const requestedDays = differenceInBusinessDays(endDate, startDate) + 1;

        // Obtener días disponibles del API
        const availableDaysResponse = await getVacationDaysByEmployeeCode(
          1,
          value.employeeCode,
        );

        if (!availableDaysResponse.success) {
          return false;
        }

        const availableDays = availableDaysResponse.data.DiasDisponibles;

        // Validar que los días solicitados no excedan el máximo permitido
        if (requestedDays > MAX_REQUESTS_DAYS_VACATIONS) {
          return false;
        }

        // Validar que los días solicitados no excedan los disponibles
        const isValid = requestedDays <= availableDays;

        return isValid;
      } catch (error) {
        console.error('Error al validar días de vacaciones:', error);
        return false;
      }
    },
    {
      message:
        'Los días solicitados exceden los días disponibles ni ser mas de ' +
        MAX_REQUESTS_DAYS_VACATIONS +
        ' días hábiles',
      path: ['endDate'],
    },
  );
