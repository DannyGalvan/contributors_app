// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthState} from '../stores/useAuthStore';

// export const storeAuth = async (value: AuthState) => {
//   try {
//     await AsyncStorage.setItem('@auth', JSON.stringify(value));
//   } catch (ex) {
//     // saving error
//     console.log(ex, 'Error al guardar el item');
//   }
// };

// export const addStoreData = async <T>(storage_key: string, value: T) => {
//   try {
//     typeof value === 'string'
//       ? await AsyncStorage.setItem(storage_key, value)
//       : await AsyncStorage.setItem(storage_key, JSON.stringify(value));
//   } catch (ex) {
//     console.log(ex, 'Error al guardar el item');
//     return null;
//   }
// };

// export const getStoreData = async <T>(
//   storage_key: string,
// ): Promise<T | null> => {
//   try {
//     const value = await AsyncStorage.getItem(storage_key);
//     if (value !== null && typeof ({} as T) === 'string') {
//       // Si el tipo T es una cadena, devolver value directamente
//       return value as T;
//     } else if (value !== null) {
//       // Si el tipo T no es una cadena y value no es nulo, intentar parsearlo
//       const parsedValue = JSON.parse(value);
//       return parsedValue as T;
//     } else {
//       return value;
//     }
//   } catch (ex) {
//     console.log(ex, 'Error al guardar el item');
//     return null;
//   }
// };

// export const removeValue = async (storage_key: string) => {
//   try {
//     await AsyncStorage.removeItem(storage_key);
//   } catch (ex) {
//     console.log('Error al remover item');
//   }
// };
