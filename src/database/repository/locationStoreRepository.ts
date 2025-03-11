import { ApiResponse } from '@app-types/ApiResponse';
import { InternalServerError } from '@app-types/Errors';
import { dataSource } from '@database/dataSource';
import { LocationStore } from '@database/models/LocationStore';

export const locationRepository = dataSource.getRepository(LocationStore);

export const createBulkLocationStore = async (
  locationStores: LocationStore[],
) => {
  const response: ApiResponse<LocationStore[]> = {
    success: false,
    data: null,
    message: null,
  };

  try {
    await locationRepository.save(locationStores);

    response.success = true;
    response.data = locationStores;
    response.message = 'Horas extras creadas correctamente';
  } catch (error) {
    response.success = false;
    response.data = null;
    response.message = `Error al guardar ubicaciones, ${error}`;
  }

  return response;
};

export const getAllLocationStores = async () => {
  try {
    return await locationRepository.find();
  } catch (error) {
    throw new InternalServerError(`Error al obtener ubicaciones, ${error}`);
  }
};

export const dropAllLocationStores = async () => {
  try {
    await locationRepository.clear();
  } catch (error) {
    throw new InternalServerError(`Error al eliminar ubicaciones, ${error}`);
  }
};
