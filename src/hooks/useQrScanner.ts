import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export const useQrScanner = () => {
  const device = useCameraDevice('back');
  const [torch, setTorch] = useState(false);
  const [initialize, setInitialize] = useState(true);
  const { hasPermission, requestPermission } = useCameraPermission();

  const onCodeScanned = useCallback((codes: Code[]) => {
    const value = codes[0]?.value;

    if (value == null) {
      return;
    }

    Alert.alert('QR Code', value);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission, requestPermission]);

  return {
    device,
    torch,
    setTorch,
    initialize,
    setInitialize,
    codeScanner,
  };
};
