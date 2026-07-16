import { useState, useCallback } from 'react';
import {
  isNetworkError as checkNetworkError,
  analyzeNetworkError,
  NetworkErrorInfo,
} from '@utils/networkErrorHandler';
import { useNetworkStore } from '@stores/useNetworkStore';

interface UseNetworkErrorReturn {
  isNetworkError: boolean;
  errorMessage: string;
  canRetry: boolean;
  isRetrying: boolean;
  retry: () => void;
  clearError: () => void;
  analyzeError: (error: unknown) => NetworkErrorInfo;
}

/**
 * Hook for handling network-related errors with retry logic
 * Detects network errors and provides recovery mechanisms
 */
export const useNetworkError = (
  onRetry?: () => Promise<void> | void,
): UseNetworkErrorReturn => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const isConnected = useNetworkStore(state => state.isConnected);

  const handleError = useCallback((err: unknown) => {
    setError(err);
    return checkNetworkError(err);
  }, []);

  const retry = useCallback(async () => {
    try {
      setIsRetrying(true);
      setError(null);

      if (onRetry) {
        await onRetry();
      }

      setIsRetrying(false);
    } catch (retryError) {
      setError(retryError);
      setIsRetrying(false);
      throw retryError;
    }
  }, [onRetry]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const errorInfo = analyzeNetworkError(error);

  return {
    isNetworkError: errorInfo.isNetworkError,
    errorMessage: errorInfo.userMessage,
    canRetry: errorInfo.canRetry && isConnected,
    isRetrying,
    retry,
    clearError,
    analyzeError: analyzeNetworkError,
  };
};
