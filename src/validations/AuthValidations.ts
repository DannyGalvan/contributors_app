import { z } from 'zod';
import { invalid_type_error, required_error } from '@config/constants';

export const authShema = z.object({
  dpi: z
    .string({ invalid_type_error, required_error })
    .min(13, 'El DPI debe tener 13 caracteres')
    .max(13, 'El DPI debe tener 13 caracteres')
    .regex(/^\d+$/, 'El DPI solo puede contener números')
    .refine((value) => value !== '', { message: 'El DPI es requerido' }),
  password: z
    .string({ invalid_type_error, required_error })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña debe tener como máximo 20 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,25}$/,
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
    )
    .refine((value) => value !== '', { message: 'La contraseña es requerida' }),
});
