import { useState } from 'react';
import { LocationStore } from '@database/models/LocationStore';
import {
  createBulkLocationStore,
  dropAllLocationStores,
} from '@database/repository/locationStoreRepository';
import { getLocationByEmployeeCode } from '@services/locationService';
import { useNetworkStore } from '@stores/useNetworkStore';
import { dispatchAlert } from '@utils/converted';
import { useAuth } from '@hooks/useAuth';

export const useUpdateLocations = () => {
  const { employeeCode } = useAuth();
  const { isConnected } = useNetworkStore();
  const [locationString, setLocationString] = useState('');

  const updateLocations = async () => {
    if (!isConnected) {
      dispatchAlert({
        title: 'Error de conexión',
        message:
          'Para actualizar las ubicaciones necesitas conexión a internet',
      });
      return;
    }

    // Get locations
    const locations = await getLocationByEmployeeCode(
      `EmployeeCode:eq:${employeeCode}`,
    );
    // drop all locations
    await dropAllLocationStores();
    // Save locations
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
  };

  return { updateLocations, locationString, setLocationString };
};
