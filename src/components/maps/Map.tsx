import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  Text,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useLocation } from '@hooks/useLocation';
import { useTheme } from '@hooks/useTheme';
import { LoadingScreen } from '@screens/LoadingScreen';
import { Fab } from '@components/button/Fab';
import { GlassCard } from '@components/layout/GlassCard';
import { TouchableButton } from '@components/button/TouchableButton';

interface Props {
  mapStyles?: StyleProp<ViewStyle>;
}

export const Map = ({ mapStyles }: Props) => {
  const mapViewRef = useRef<MapView>(null);
  const follow = useRef<boolean>(true);
  const { colors, fontSize, fontWeight } = useTheme();

  const {
    hasLocation,
    locationError,
    followUserLocation,
    currentUserLocation,
    stopUserFollowLocation,
    getCurrentLocation,
    setOrigin,
    retryLocation,
  } = useLocation();

  useEffect(() => {
    followUserLocation();
    return () => {
      stopUserFollowLocation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!follow.current || !currentUserLocation) return;
    mapViewRef.current?.animateCamera({ center: currentUserLocation });
  }, [currentUserLocation]);

  const centerPosition = async () => {
    try {
      const coords = await getCurrentLocation();
      follow.current = true;
      mapViewRef.current?.animateCamera({ center: coords });
      setOrigin(coords);
    } catch (_err) {}
  };

  // ── Error state ──
  if (locationError) {
    return (
      <View style={[styles.container, styles.center]}>
        <GlassCard style={styles.errorCard}>
          <Icon
            name="location-outline"
            size={40}
            color={colors.status.warning}
            style={styles.icon}
          />
          <Text
            style={[
              styles.errorTitle,
              {
                color: colors.text.primary,
                fontSize: fontSize.base,
                fontWeight: fontWeight.semibold,
              },
            ]}
          >
            No se pudo obtener la ubicación
          </Text>
          <Text
            style={[
              styles.errorBody,
              { color: colors.text.secondary, fontSize: fontSize.xs },
            ]}
          >
            {locationError}
          </Text>
          <TouchableButton
            variant="primary"
            title="Reintentar"
            icon="refresh-outline"
            onPress={retryLocation}
            styles={styles.retryBtn}
          />
        </GlassCard>
      </View>
    );
  }

  // ── Loading state ──
  if (!hasLocation || currentUserLocation === null) {
    return <LoadingScreen title="Obteniendo ubicación..." />;
  }

  return (
    <>
      <MapView
        ref={el => {
          mapViewRef.current = el;
        }}
        style={mapStyles ?? styles.container}
        showsUserLocation
        initialRegion={{
          latitude: currentUserLocation.latitude,
          longitude: currentUserLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        userLocationUpdateInterval={3000}
        showsMyLocationButton={false}
        loadingEnabled
        loadingIndicatorColor={colors.brand.primary}
        onTouchStart={() => (follow.current = false)}
      >
        <Marker
          coordinate={currentUserLocation}
          title="Tu ubicación actual"
          description="Estás aquí"
        />
      </MapView>

      <Fab
        style={styles.fab}
        iconName="locate-outline"
        onPress={centerPosition}
        size="md"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorCard: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  errorTitle: {
    textAlign: 'center',
    marginBottom: 6,
  },
  errorBody: {
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  retryBtn: {},
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
