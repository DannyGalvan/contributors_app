import { z } from 'zod';
import { required_error, invalid_type_error } from '@config/constants';

export const inOutShema = z.object({
  id: z.number().optional(),
  contributorId: z
    .number({ required_error, invalid_type_error })
    .refine((value) => value > 0, 'Debes seleccionar un colaborador'),
  businessId: z
    .number({ required_error, invalid_type_error })
    .refine((value) => value > 0, 'Debes seleccionar una empresa'),
  type: z
    .number({ required_error, invalid_type_error })
    .refine((value) => value === 0 || value === 1, 'Debes seleccionar un tipo'),
  locationId: z
    .number({ required_error, invalid_type_error })
    .positive('Debes seleccionar una ubicación'),
  longitude: z
    .string({ required_error, invalid_type_error })
    .regex(
      /^[-+]?((1[0-7]\d|0?\d{1,2})(\.\d+)?|180(\.0+)?)$/,
      'Longitud inválida. Debe estar entre -180 y 180.',
    ),
  latitude: z
    .string({ required_error, invalid_type_error })
    .regex(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
      'Latitud inválida. Debe estar entre -90 y 90.',
    ),
  state: z.number({ required_error, invalid_type_error }),
});

export const inOutShemaOmit = inOutShema.omit({
  latitude: true,
  longitude: true,
  businessId: true,
  contributorId: true,
});
