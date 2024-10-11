import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertButton,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { getAndroidId, getMacAddress } from 'react-native-device-info';
import { appStyles } from '../../styles/appStyles';
import { appColors } from '../../styles/appColors';

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ];
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      },
    });
  }
  Alert.alert('Scanned Code', value, buttons);
};

export function QrScreen(): React.JSX.Element {
  const [initialize, setInitialize] = useState(false);
  const [torch, setTorch] = useState(false);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  // 4. On code scanned, we show an aler to the user
  const isShowingAlert = useRef(false);
  const onCodeScanned = useCallback((codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes:`, codes);
    const value = codes[0]?.value;
    if (value == null) {
      return;
    }
    if (isShowingAlert.current) {
      return;
    }
    showCodeAlert(value, () => {
      isShowingAlert.current = false;
    });
    isShowingAlert.current = true;
    setTorch(false);
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

  useEffect(() => {
    (async () => {
      const mac = await getAndroidId();
      const getMac = await getMacAddress();
      console.log({ mac, getMac });
    })();
  }, []);

  if (device == null) {
    return (
      <View style={appStyles.screen}>
        <Text style={[appStyles.text, appStyles.textDark]}>Device is null</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Camera
        isActive={initialize}
        style={StyleSheet.absoluteFill}
        device={device}
        torch={torch ? 'on' : 'off'}
        codeScanner={codeScanner}
        id="camera_qr"
      />
      <TouchableOpacity
        style={[
          styles.btnCamera,
          appStyles.flexColumn,
          appStyles.justifyCenter,
          appStyles.alignCenter,
          styles.btnFlash,
        ]}
        onPress={() => setTorch(!torch)}
      >
        {torch ? (
          <Icon name={'flash'} size={25} color={appColors.warning} />
        ) : (
          <Icon name={'flash-off'} size={25} color={appColors.warning} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btnCamera,
          appStyles.flexColumn,
          appStyles.justifyCenter,
          styles.btnInitialize,
        ]}
        onPress={() => setInitialize(!initialize)}
      >
        <Text
          style={[appStyles.subTitle, appStyles.textCenter, appStyles.textDark]}
        >
          {!initialize ? (
            <Icon name={'qr-code'} size={35} color={appColors.black} />
          ) : (
            <Icon name={'close'} size={45} color={appColors.danger} />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnCamera: {
    position: 'absolute',
    borderRadius: 50,
  },
  btnInitialize: {
    width: 100,
    height: 100,
    backgroundColor: appColors.white,
    bottom: 50,
    right: '35%',
  },
  btnFlash: {
    width: 50,
    height: 50,
    backgroundColor: appColors.white,
    bottom: 50,
    right: 20,
  },
});
