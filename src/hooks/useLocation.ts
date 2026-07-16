import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Coordinates } from '@services/distanceService';
import { usePermissionsStore } from '@stores/usePermissionsStore';

const LOCATION_TIMEOUT_MS = 30000;

export const useLocation = () => {
  const { checkPermission, requestPermission } = usePermissionsStore();

  const [hasLocation, setHasLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates>(null);
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Coordinates>(null);
  const [originLocation, setOriginLocation] = useState<Coordinates>(null);

  const watchId = useRef<number>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    initLocation();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initLocation = async () => {
    setLocationError(null);

    let status = await checkPermission('location');

    if (status === 'denied') {
      status = await requestPermission('location');
    }

    if (status !== 'granted') {
      const errorMsg = `Permisos de ubicación ${status === 'denied' ? 'denegados' : 'sin responder'}. Por favor, habilita los permisos en Configuración.`;
      if (!isMounted.current) return;
      setLocationError(errorMsg);
      return;
    }

    try {
      const coords = await getCurrentLocation();
      if (!isMounted.current) return;
      setLocation(coords);
      setHasLocation(true);
      setCurrentUserLocation(coords);
      setOriginLocation(coords);
    } catch (err: any) {
      if (!isMounted.current) return;
      setLocationError(err?.message ?? 'No se pudo obtener la ubicación');
    }
  };

  const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Tiempo de espera agotado al obtener la ubicación (30s). Intenta habilitando ubicación de alta precisión.'));
      }, LOCATION_TIMEOUT_MS);

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          clearTimeout(timer);
          resolve({ latitude: coords.latitude, longitude: coords.longitude });
        },
        () => {
          Geolocation.getCurrentPosition(
            ({ coords }) => {
              clearTimeout(timer);
              resolve({ latitude: coords.latitude, longitude: coords.longitude });
            },
            error => {
              clearTimeout(timer);
              reject(new Error(error.message || 'Error desconocido al obtener ubicación'));
            },
            { enableHighAccuracy: true, timeout: LOCATION_TIMEOUT_MS, maximumAge: 30000 },
          );
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 },
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) return;
        setCurrentUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
      },
      err => {
        if (!isMounted.current) return;
        setLocationError(err.message || 'Error en el seguimiento de ubicación');
      },
      { enableHighAccuracy: false, distanceFilter: 10, timeout: 30000 },
    );
  };

  const stopUserFollowLocation = () => {
    if (watchId.current !== null && watchId.current !== undefined) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const setOrigin = (origin: Coordinates) => {
    setOriginLocation(origin);
  };

  const retryLocation = () => {
    setHasLocation(false);
    setLocationError(null);
    initLocation();
  };

  return {
    location,
    originLocation,
    hasLocation,
    locationError,
    getCurrentLocation,
    followUserLocation,
    currentUserLocation,
    stopUserFollowLocation,
    setOrigin,
    retryLocation,
  };
};
