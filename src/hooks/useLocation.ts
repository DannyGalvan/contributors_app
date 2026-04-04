import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Coordinates } from '@services/distanceService';
import { usePermissionsStore } from '@stores/usePermissionsStore';

const LOCATION_TIMEOUT_MS = 30000; // 30 seconds

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

    // 1. Check current status first (no dialog yet)
    let status = await checkPermission('location');
    console.log('[useLocation] Permission status:', status);

    // 2. If denied (first time), request it
    if (status === 'denied') {
      status = await requestPermission('location');
      console.log('[useLocation] After request permission:', status);
    }

    // 3. Only proceed if granted
    if (status !== 'granted') {
      const errorMsg = `Permisos de ubicación ${status === 'denied' ? 'denegados' : 'sin responder'}. Por favor, habilita los permisos en Configuración.`;
      if (!isMounted.current) return;
      setLocationError(errorMsg);
      console.warn('[useLocation] Location permission not granted:', status);
      return;
    }

    try {
      console.log('[useLocation] Getting current location...');
      const coords = await getCurrentLocation();
      if (!isMounted.current) return;
      console.log('[useLocation] Location obtained:', coords);
      setLocation(coords);
      setHasLocation(true);
      setCurrentUserLocation(coords);
      setOriginLocation(coords);
    } catch (err: any) {
      if (!isMounted.current) return;
      const errorMsg = err?.message ?? 'No se pudo obtener la ubicación';
      console.error('[useLocation] Error getting location:', errorMsg);
      setLocationError(errorMsg);
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
          console.log('[useLocation] getCurrentPosition success:', { lat: coords.latitude, lon: coords.longitude });
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => {
          clearTimeout(timer);
          console.error('[useLocation] getCurrentPosition error:', error);
          reject(new Error(error.message || 'Error desconocido al obtener ubicación'));
        },
        {
          enableHighAccuracy: false,
          timeout: LOCATION_TIMEOUT_MS,
          maximumAge: 0,
        },
      );
    });
  };

  const followUserLocation = () => {
    console.log('[useLocation] Starting location watch...');
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) return;
        console.log('[useLocation] Location updated:', { lat: coords.latitude, lon: coords.longitude });
        setCurrentUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      err => {
        if (!isMounted.current) return;
        console.error('[useLocation] Watch location error:', err);
        setLocationError(err.message || 'Error en el seguimiento de ubicación');
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 10,
        timeout: 30000,
      },
    );
  };

  const stopUserFollowLocation = () => {
    if (watchId.current !== null && watchId.current !== undefined) {
      console.log('[useLocation] Stopping location watch...');
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const setOrigin = (origin: Coordinates) => {
    setOriginLocation(origin);
  };

  const retryLocation = () => {
    console.log('[useLocation] Retrying location...');
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
