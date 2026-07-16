import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { PermissionGate } from '@components/layout/PermissionGate';
import { Fab } from '@components/button/Fab';
import { useQrScanner } from '@hooks/useQrScanner';
import { useTheme } from '@hooks/useTheme';

export function QrScreen(): React.JSX.Element {
  const { device, initialize, setInitialize, torch, setTorch, codeScanner } =
    useQrScanner();
  const { colors } = useTheme();

  return (
    <PermissionGate permissionKey="camera">
      <View style={styles.container}>
        {device != null && (
          <Camera
            isActive={initialize}
            style={StyleSheet.absoluteFill}
            device={device}
            torch={torch ? 'on' : 'off'}
            codeScanner={codeScanner}
            id="camera_qr"
          />
        )}

        {/* Flash toggle */}
        <Fab
          iconName={torch ? 'flash' : 'flash-off'}
          onPress={() => setTorch(!torch)}
          size="md"
          color={torch ? colors.brand.cta : colors.surface.glassMd}
          style={styles.flashBtn}
        />

        {/* Start / Stop camera */}
        <Fab
          iconName={initialize ? 'close' : 'qr-code-outline'}
          onPress={() => setInitialize(!initialize)}
          size="lg"
          color={initialize ? colors.status.danger : colors.brand.primary}
          style={styles.toggleBtn}
        />
      </View>
    </PermissionGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flashBtn: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  toggleBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -29,
  },
});
