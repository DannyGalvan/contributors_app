import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera } from 'react-native-vision-camera';
import { appStyles } from '@styles/appStyles';
import { appColors } from '@styles/appColors';
import { useQrScanner } from '@hooks/useQrScanner';

export function QrScreen(): React.JSX.Element {
  const { device, initialize, setInitialize, torch, setTorch, codeScanner } =
    useQrScanner();

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
