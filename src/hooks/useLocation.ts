import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Coordinates } from '@services/distanceService';
import { usePermissionsStore } from '@stores/usePermissionsStore';

export const useLocation = () => {
  const { permissions, isPendingPermissions, askPermission, checkPermission } =
    usePermissionsStore();
  const [hasLocation, setHasLocation] = useState(false);
  const [location, setLocation] = useState<Coordinates>(null);
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Coordinates>(null);
  const [originLocation, setOriginLocation] = useState<Coordinates>(null);

  const watchId = useRef<number>();
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLocation) {
      checkPermission('android.permission.ACCESS_FINE_LOCATION');

      if (isPendingPermissions) {
        return;
      }

      if (
        permissions.location === 'denied' ||
        permissions.location === 'blocked'
      ) {
        askPermission('android.permission.ACCESS_FINE_LOCATION');
      }

      getCurrentLocation()
        .then((response) => {
          if (!isMounted.current) {
            return;
          }
          setLocation(response);
          setHasLocation(true);
          setCurrentUserLocation(response);
          setOrigin(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error);
        },
        {
          distanceFilter: 20,
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) {
          return;
        }
        setCurrentUserLocation(coords);
      },
      (err) => {
        console.log(err);
      },
      {
        distanceFilter: 20,
        enableHighAccuracy: true,
      },
    );
  };

  const stopUserFollowLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  const setOrigin = (origin: Coordinates) => {
    setOriginLocation(origin);
  };

  return {
    location,
    originLocation,
    hasLocation,
    getCurrentLocation,
    followUserLocation,
    currentUserLocation,
    stopUserFollowLocation,
    setOrigin,
  };
};
