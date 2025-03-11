import axios from 'axios';
import { API_KEY } from '@config/constants';

// Define los tipos de coordenadas
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define los tipos de la respuesta de la función
export interface DistanceResult {
  distance: number;
  duration: number;
  message: string;
  success: boolean;
}

/**
 * Calcula la distancia y duración entre dos coordenadas usando Google Distance Matrix API.
 * @param origin Coordenadas de origen (latitude, longitude)
 * @param destination Coordenadas de destino (latitude, longitude)
 * @returns Objeto con la distancia y duración en texto, o null si ocurre un error
 */
export const calculateDistance = async (
  origin: Coordinates,
  destination: Coordinates,
): Promise<DistanceResult | null> => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json',
      {
        params: {
          origins: `${origin.latitude},${origin.longitude}`,
          destinations: `${destination.latitude},${destination.longitude}`,
          key: API_KEY,
        },
      },
    );

    const data = response.data;
    if (data.status === 'OK') {
      const element = data.rows[0].elements[0];
      if (element.status === 'OK') {
        const distance = element.distance.value;
        const duration = element.duration.value;
        return {
          distance,
          duration,
          message: 'Ruta calculada con exito',
          success: true,
        };
      } else {
        throw new Error('No se pudo calcular la distancia.');
      }
    } else {
      throw new Error(
        data.error_message || 'Error al obtener datos de la API.',
      );
    }
  } catch (error) {
    return {
      distance: 0,
      duration: 0,
      success: false,
      message: error.toString(),
    };
  }
};
