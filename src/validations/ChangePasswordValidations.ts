import { required_error, invalid_type_error } from '@config/constants';
import { z } from 'zod';

export const ChangePasswordShema = z
  .object({
    token: z
      .string({ required_error, invalid_type_error })
      .refine((value) => value !== '', { message: 'El token es requerido' }),
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
    confirmPassword: z
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });
