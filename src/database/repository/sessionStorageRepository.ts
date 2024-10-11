import { InternalServerError } from '../../types/Errors';
import { dataSource } from '../dataSource';
import { Configuration } from '../models/SessionStorage';

export const sessionStorageRepository = dataSource.getRepository(Configuration);

export const createSessionStorage = async <T>(key: string, value: T) => {
  try {
    const sessionStorage = new Configuration();
    sessionStorage.key = key;
    sessionStorage.value = JSON.stringify(value);
    await sessionStorageRepository.save(sessionStorage);
  } catch (error) {
    console.log(error);
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
    return null;
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
