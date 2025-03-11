import { z } from 'zod';
import { invalid_type_error, required_error } from '@config/constants';

export const recoveryPasswordShema = z.object({
  dpi: z
    .string({ invalid_type_error, required_error })
    .min(13, 'El DPI debe tener 13 caracteres')
    .max(13, 'El DPI debe tener 13 caracteres')
    .regex(/^\d+$/, 'El DPI solo puede contener números')
    .refine((value) => value !== '', { message: 'El DPI es requerido' }),
});
