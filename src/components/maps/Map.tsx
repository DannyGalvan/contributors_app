import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '@hooks/useLocation';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LoadingScreen } from '@screens/LoadingScreen';
import { Fab } from '@components/button/Fab';

interface Props {
  mapStyles?: StyleProp<ViewStyle>;
}

export const Map = ({ mapStyles }: Props) => {
  const mapViewRef = useRef<MapView>();
  const follow = useRef<boolean>(true);
  const {
    hasLocation,
    followUserLocation,
    currentUserLocation,
    stopUserFollowLocation,
    getCurrentLocation,
    setOrigin,
  } = useLocation();

  useEffect(() => {
    followUserLocation();
    return () => {
      stopUserFollowLocation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!follow.current) {
      return;
    }

    mapViewRef.current?.animateCamera({
      center: currentUserLocation,
    });
  }, [currentUserLocation]);

  const centerPosition = async () => {
    const thislocation = await getCurrentLocation();
    follow.current = true;
    mapViewRef.current?.animateCamera({
      center: thislocation,
    });
    setOrigin(thislocation);
    console.log(thislocation);
  };

  if (!hasLocation || currentUserLocation === null) {
    return <LoadingScreen title="Buscando la Pocicion" />;
  }

  return (
    <>
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        style={mapStyles ?? styles.container}
        showsUserLocation
        initialRegion={{
          latitude: currentUserLocation.latitude,
          longitude: currentUserLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        userLocationUpdateInterval={2000}
        showsMyLocationButton
        loadingEnabled
        onTouchStart={() => (follow.current = true)}
      >
        <Marker
          coordinate={currentUserLocation}
          title={'Esta es tu ubicacion'}
          description={'ahora te encuentras en este punto del mapa'}
        />
      </MapView>
      <Fab style={styles.fab} iconName="reload" onPress={centerPosition} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 30,
  },
});
