import { API_URL, ENV_APP, MAPS_API_KEY } from '@env';

console.log({ API_URL, MAPS_API_KEY, ENV_APP, message: 'Constants' });

export const URL_BASE = API_URL;

export const NAME_BD = 'quicksqlitetest-typeorm.db';

export const StorageKey = {
  auth: '@auth',
};

export const formatString = 'dd/MM/yyyy h:mm:ss a';

export const formatStringDate = 'dd/MM/yyyy';

export const invalid_type_error = 'El tipo provisto no es válido';

export const required_error = 'El campo es requerido';

export const API_KEY = MAPS_API_KEY;

export const IN_OUT_VALUES = [
  { label: 'Entrada', value: 1 },
  { label: 'Salida', value: 0 },
];

export const VACATION_TYPES = {
  enjoyVacations: 1,
  payVacations: 2,
};

export const VACATION_TYPES_LABELS = {
  1: 'Gozar descanzo',
  2: 'Pago de vacaciones',
};

export const STATES_TYPES = {
  CANCELADA: 0,
  ACTIVA: 1,
  APROBADA: 2,
};

export const STATES_TYPES_LABELS = {
  0: 'Cancelada',
  1: 'pendiente',
  2: 'Aprobada',
};
