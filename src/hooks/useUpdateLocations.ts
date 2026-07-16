import { useState, useCallback } from 'react';
import { LocationStore } from '@database/models/LocationStore';
import {
  createBulkLocationStore,
  dropAllLocationStores,
} from '@database/repository/locationStoreRepository';
import { getLocationByEmployeeCode } from '@services/locationService';
import { useNetworkStore } from '@stores/useNetworkStore';
import { dispatchAlert } from '@utils/converted';
import { useAuth } from '@hooks/useAuth';
import {
  isNetworkError,
  getNetworkErrorMessage,
} from '@utils/networkErrorHandler';

interface UseUpdateLocationsReturn {
  updateLocations: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useUpdateLocations = (): UseUpdateLocationsReturn => {
  const { employeeCode } = useAuth();
  const isConnected = useNetworkStore((state) => state.isConnected);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateLocations = useCallback(async () => {
    // Check connection first
    if (!isConnected) {
      const errorMsg =
        'Para actualizar las ubicaciones necesitas conexión a internet';
      setError(errorMsg);
      dispatchAlert({
        title: 'Error de conexión',
        message: errorMsg,
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get locations
      const locations = await getLocationByEmployeeCode({
        filters: `EmployeeCode:eq:${employeeCode}`,
        include: 'location,company',
        includeTotal: false,
        pageNumber: 1,
        pageSize: 100,
      });

      // Drop all locations
      await dropAllLocationStores();

      // Save new locations
      const newLocations: LocationStore[] = locations.map((location) => ({
        centerId: location.centerId,
        company: location.company.companyName,
        companyCode: location.companyCode,
        employeeCode: location.employeeCode,
        Id: location.id,
        location: location.location.description,
        locationId: location.locationId,
        state: location.state,
      }));

      await createBulkLocationStore(newLocations);

      dispatchAlert({
        title: 'Operación Exitosa',
        message: 'Ubicaciones actualizadas correctamente',
      });

      setIsLoading(false);
    } catch (err) {
      const errorMessage = isNetworkError(err)
        ? getNetworkErrorMessage(err)
        : err instanceof Error
          ? err.message
          : 'Error desconocido actualizando ubicaciones';

      setError(errorMessage);
      setIsLoading(false);

      dispatchAlert({
        title: 'Error actualizando ubicaciones',
        message: errorMessage,
      });

      throw err;
    }
  }, [isConnected, employeeCode]);

  return {
    updateLocations,
    isLoading,
    error,
    clearError,
  };
};
