import { InternalServerError } from '@app-types/Errors';
import { dataSource } from '@database/dataSource';
import { SessionStorage } from '@database/models/SessionStorage';

export const sessionStorageRepository =
  dataSource.getRepository(SessionStorage);

export const createSessionStorage = async <T>(key: string, value: T) => {
  try {
    const sessionStorage = new SessionStorage();
    sessionStorage.key = key;
    sessionStorage.value = JSON.stringify(value);
    await sessionStorageRepository.save(sessionStorage);
  } catch (error) {
    throw new InternalServerError(`Error al guardar el item, ${error}`);
  }
};

export const getSessionStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const sessionStorage = await sessionStorageRepository.findOne({
      where: { key },
    });

    if (sessionStorage) {
      return JSON.parse(sessionStorage.value);
    }

    return null;
  } catch (error) {
    throw new InternalServerError(`Error al obtener el item, ${error}`);
  }
};

export const removeSessionStorage = async (key: string) => {
  try {
    await sessionStorageRepository.delete({ key });
  } catch (error) {
    throw new InternalServerError(`Error al remover el item, ${error}`);
  }
};

export const updateSessionStorage = async <T>(key: string, value: T) => {
  try {
    const sessionStorage = await sessionStorageRepository.findOne({
      where: { key },
    });

    if (sessionStorage) {
      sessionStorage.value = JSON.stringify(value);
      await sessionStorageRepository.save(sessionStorage);
    }
  } catch (error) {
    throw new InternalServerError(`Error al actualizar el item, ${error}`);
  }
};
