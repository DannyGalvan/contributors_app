import React from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { APP_STORE_ID } from '@env';

import { GlassCard } from '@components/layout/GlassCard';
import { ScreenBackground } from '@components/layout/ScreenBackground';
import { TouchableButton } from '@components/button/TouchableButton';
import { useTheme } from '@hooks/useTheme';

interface Props {
  title: string;
}

const ANDROID_PACKAGE = 'com.servicioappgrupomisol.contributors_app';

const getStoreConfig = () => {
  if (Platform.OS === 'ios') {
    return {
      primaryUrl: `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}`,
      fallbackUrl: `https://apps.apple.com/app/id${APP_STORE_ID}`,
      buttonLabel: 'Ir a App Store',
      buttonIcon: 'logo-apple',
      errorMsg: 'No se pudo abrir la App Store',
    };
  }
  return {
    primaryUrl: `market://details?id=${ANDROID_PACKAGE}`,
    fallbackUrl: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
    buttonLabel: 'Ir a Play Store',
    buttonIcon: 'logo-google-playstore',
    errorMsg: 'No se pudo abrir la Play Store',
  };
};

export const UpdateScreen = ({ title }: Props) => {
  const { colors, fontSize, fontWeight } = useTheme();
  const { primaryUrl, fallbackUrl, buttonLabel, buttonIcon, errorMsg } = getStoreConfig();

  const handleOpenStore = async () => {
    try {
      await Linking.openURL(primaryUrl);
    } catch {
      try {
        await Linking.openURL(fallbackUrl);
      } catch {
        Alert.alert('Error', errorMsg);
      }
    }
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <GlassCard style={styles.card} intensity="medium">
          <Icon
            name="cloud-download-outline"
            size={52}
            color={colors.brand.cta}
            style={styles.icon}
          />
          <Text
            style={[
              styles.title,
              {
                color: colors.text.primary,
                fontSize: fontSize.xl,
                fontWeight: fontWeight.bold,
              },
            ]}
          >
            Actualización disponible
          </Text>
          <Text
            style={[
              styles.body,
              { color: colors.text.secondary, fontSize: fontSize.sm },
            ]}
          >
            {title}
          </Text>
          <TouchableButton
            variant="cta"
            title={buttonLabel}
            icon={buttonIcon}
            onPress={handleOpenStore}
            fullWidth
            styles={styles.btn}
          />
        </GlassCard>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  btn: {},
});
