import React from 'react';
import { StyleSheet, Text, View, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { TouchableButton } from '@components/button/TouchableButton';
import { useTheme } from '@hooks/useTheme';

interface Props {
  title: string;
}

export const UpdateScreen = ({ title }: Props) => {
  const { colors, fontSize, fontWeight } = useTheme();

  const handleOpenPlayStore = async () => {
    const packageId = 'com.servicioappgrupomisol.contributors_app';
    const marketUrl = `market://details?id=${packageId}`;
    const websiteUrl = `https://play.google.com/store/apps/details?id=${packageId}`;

    try {
      // Primero intenta abrir con el app scheme de Play Store
      await Linking.openURL(marketUrl);
    } catch {
      try {
        // Si falla, intenta abrir en el navegador
        await Linking.openURL(websiteUrl);
      } catch {
        Alert.alert('Error', 'No se pudo abrir la Play Store');
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
            title="Ir a Play Store"
            icon="logo-google-playstore"
            onPress={handleOpenPlayStore}
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
