import axios, { AxiosError } from 'axios';
import { ApiError } from '@app-types/Errors';

// Network error codes that indicate connectivity issues
const NETWORK_ERROR_CODES = [
  'ENOTFOUND',      // DNS lookup failed
  'ECONNREFUSED',   // Connection refused
  'ETIMEDOUT',      // Connection timeout
  'ECONNABORTED',   // Connection aborted
  'ERR_NETWORK',    // Axios network error
  'ENETUNREACH',    // Network unreachable
  'EHOSTUNREACH',   // Host unreachable
];

// HTTP status codes indicating possible network/infra issues
const NETWORK_STATUS_CODES = [408, 502, 503, 504, 522, 524];

export interface NetworkErrorInfo {
  isNetworkError: boolean;
  isTimeout: boolean;
  userMessage: string;
  technicalMessage: string;
  canRetry: boolean;
  statusCode?: number;
  errorCode?: string;
}

/**
 * Determine if an error is network-related vs API/validation error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (!error) return false;

  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Check network error codes
    if (NETWORK_ERROR_CODES.includes(axiosError.code || '')) {
      return true;
    }

    // Check for timeout
    if (
      axiosError.message?.includes('timeout') ||
      axiosError.code === 'ECONNABORTED'
    ) {
      return true;
    }

    // Check HTTP status codes for network issues
    if (axiosError.response?.status) {
      return NETWORK_STATUS_CODES.includes(axiosError.response.status);
    }

    // No response means network error
    return !axiosError.response;
  }

  // Check if it's our custom ApiError
  if (error instanceof Error) {
    const message = error.message?.toLowerCase() || '';
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('offline')
    );
  }

  return false;
};

/**
 * Get user-friendly error message for network errors
 */
export const getNetworkErrorMessage = (error: unknown): string => {
  if (!error) {
    return 'Error de conexión desconocido';
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const code = axiosError.code?.toUpperCase() || '';
    const status = axiosError.response?.status;

    // Specific network error messages
    if (code === 'ENOTFOUND' || code === 'ENETUNREACH') {
      return 'No se pudo alcanzar el servidor. Verifica tu conexión a internet.';
    }

    if (code === 'ECONNREFUSED' || code === 'EHOSTUNREACH') {
      return 'El servidor rechazó la conexión. Intenta más tarde.';
    }

    if (code === 'ETIMEDOUT' || code === 'ECONNABORTED') {
      return 'La conexión tardó demasiado tiempo. Intenta nuevamente.';
    }

    // HTTP status-specific messages
    if (status === 408) {
      return 'La solicitud expiró. Intenta nuevamente.';
    }

    if (status === 502 || status === 503) {
      return 'El servidor está teniendo problemas. Intenta más tarde.';
    }

    if (status === 504) {
      return 'El servidor no respondió a tiempo. Intenta más tarde.';
    }

    // Generic response error
    if (axiosError.response) {
      return `Error ${status}: ${
        (axiosError.response.data as any)?.message ||
        'No se pudo completar la solicitud'
      }`;
    }

    // No response = network error
    if (!axiosError.response) {
      return 'Problemas de conexión. Verifica tu internet e intenta nuevamente.';
    }
  }

  if (error instanceof Error) {
    if (error.message?.toLowerCase().includes('timeout')) {
      return 'La solicitud tardó demasiado. Intenta nuevamente.';
    }
  }

  return 'Error de conexión. Intenta más tarde.';
};

/**
 * Determine if a request should be retried
 */
export const shouldRetry = (
  error: unknown,
  attempt: number,
  maxAttempts: number = 3
): boolean => {
  if (attempt >= maxAttempts) return false;

  if (!isNetworkError(error)) return false;

  // Don't retry client errors (4xx) except timeouts and specific codes
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status && status >= 400 && status < 500) {
      // Retry on 408 (timeout), 429 (rate limit), but not 4xx validation errors
      return [408, 429].includes(status);
    }
  }

  return true;
};

/**
 * Calculate exponential backoff delay with jitter
 */
export const getBackoffDelay = (attempt: number): number => {
  // Exponential backoff: 500ms, 1500ms, 3500ms
  const exponentialDelay = Math.pow(2, attempt) * 500;
  // Add jitter (±20%)
  const jitter = exponentialDelay * 0.2 * (Math.random() * 2 - 1);
  return exponentialDelay + jitter;
};

/**
 * Comprehensive error analysis
 */
export const analyzeNetworkError = (error: unknown): NetworkErrorInfo => {
  const isNetwork = isNetworkError(error);
  let isTimeout = false;
  let statusCode: number | undefined;
  let errorCode: string | undefined;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    isTimeout = (axiosError.code === 'ECONNABORTED') ||
               (axiosError.message?.includes('timeout') || false);
    statusCode = axiosError.response?.status;
    errorCode = axiosError.code;
  }

  return {
    isNetworkError: isNetwork,
    isTimeout,
    userMessage: getNetworkErrorMessage(error),
    technicalMessage: error instanceof Error ? error.message : String(error),
    canRetry: shouldRetry(error, 0),
    statusCode,
    errorCode,
  };
};