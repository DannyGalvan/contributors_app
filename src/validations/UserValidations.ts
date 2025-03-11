import { required_error, invalid_type_error } from '@config/constants';
import { z } from 'zod';

export const UserShema = z
  .object({
    dpi: z
      .string({ required_error, invalid_type_error })
      .min(13, 'El DPI debe tener 13 caracteres')
      .max(13, 'El DPI debe tener 13 caracteres')
      .regex(/^\d+$/, 'El DPI solo puede contener números')
      .refine((value) => value !== '', { message: 'El DPI es requerido' }),
    password: z
      .string({ required_error, invalid_type_error })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(20, 'La contraseña debe tener como máximo 20 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,25}$/,
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
      )
      .refine((value) => value !== '', {
        message: 'La contraseña es requerida',
      }),
    confirm: z
      .string({ required_error, invalid_type_error })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(20, 'La contraseña debe tener como máximo 20 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,25}$/,
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
      )
      .refine((value) => value !== '', {
        message: 'La contraseña es requerida',
      }),
    email: z
      .string({ required_error, invalid_type_error })
      .email('El email no es válido'),
    state: z.number({ required_error, invalid_type_error }),
    reset: z.boolean({ required_error, invalid_type_error }),
    number: z
      .string({ required_error, invalid_type_error })
      .min(8, 'El número de teléfono debe tener al menos 8 caracteres')
      .max(8, 'El número de teléfono debe tener como máximo 8 caracteres'),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Las contraseñas no coinciden',
  });
