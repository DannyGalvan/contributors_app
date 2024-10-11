import axios from 'axios';
import { URL_BASE } from './constants';
import { ForbiddenError, UnauthorizedError } from '../types/Errors';

export const marksApi = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

marksApi.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response.status === 400 || response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      throw new UnauthorizedError(
        'Tu sesión ha expirado vuelve a iniciar sesión',
      );
    }
    if (response.status === 403) {
      throw new ForbiddenError(
        'No tienes permisos para realizar esta acción, contacta con el administrador',
      );
    }
    if (response.status === 500) {
      throw new Error(
        'Hubo un error en el servidor, contacta al desarrollador',
      );
    }
  },
);

export const setAuthorizationHeader = (token: string) => {
  marksApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  marksApi.defaults.headers.Authorization = `Bearer ${token}`;
};
