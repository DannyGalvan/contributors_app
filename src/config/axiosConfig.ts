import axios, { AxiosError } from 'axios';
import { URL_BASE } from '@config/constants';
import { ForbiddenError, UnauthorizedError } from '@app-types/Errors';
import {
  isNetworkError,
  shouldRetry,
  getBackoffDelay,
} from '@utils/networkErrorHandler';
import { useNetworkStore } from '@stores/useNetworkStore';

// Track retry counts per request
const retryCountMap = new WeakMap<any, number>();

export const marksApi = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor: track retry attempts
marksApi.interceptors.request.use((config) => {
  // Initialize retry count if not exists
  if (!retryCountMap.has(config)) {
    retryCountMap.set(config, 0);
  }
  return config;
});

// Response interceptor: handle errors with retry logic
marksApi.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const { response, config } = error;

    // If no response, it's likely a network error
    if (!response) {
      const isNetwork = isNetworkError(error);
      const retryCount = retryCountMap.get(config) || 0;

      // Update network store to reflect connectivity issue
      if (isNetwork) {
        const networkStore = useNetworkStore.getState();
        networkStore.setIsConnected(false);
      }

      // Attempt retry with exponential backoff
      if (isNetwork && shouldRetry(error, retryCount)) {
        retryCountMap.set(config, retryCount + 1);
        const delay = getBackoffDelay(retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return marksApi(config);
      }

      // If network error and no retry, throw descriptive error
      if (isNetwork) {
        throw new Error(
          'Problemas de conexión. Verifica tu conexión a internet e intenta de nuevo.'
        );
      }

      throw error;
    }

    // Handle specific HTTP status codes
    if (response.status === 400 || response.status === 200) {
      return response.data;
    }

    if (response.status === 401) {
      throw new UnauthorizedError(
        'Tu sesión ha expirado vuelve a iniciar sesión'
      );
    }

    if (response.status === 403) {
      throw new ForbiddenError(
        'No tienes permisos para realizar esta acción, contacta con el administrador'
      );
    }

    // Retry on 503 Service Unavailable
    if (response.status === 503) {
      const retryCount = retryCountMap.get(config) || 0;
      if (shouldRetry(error, retryCount)) {
        retryCountMap.set(config, retryCount + 1);
        const delay = getBackoffDelay(retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return marksApi(config);
      }
      throw new Error('El servidor está temporalmente no disponible. Intenta más tarde.');
    }

    if (response.status === 500) {
      throw new Error(
        'Hubo un error en el servidor, contacta al desarrollador'
      );
    }

    // Generic error for unhandled status codes
    throw error;
  }
);

export const setAuthorizationHeader = (token: string) => {
  marksApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  marksApi.defaults.headers.Authorization = `Bearer ${token}`;
};
