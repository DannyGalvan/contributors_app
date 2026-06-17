import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { MenuItem } from '@components/card/MenuItem';
import { ScreenBackground } from '@components/layout/ScreenBackground';

import { useAuth } from '@hooks/useAuth';
import { useTheme } from '@hooks/useTheme';
import { useAuthStore } from '@stores/useAuthStore';

import { icons } from '@config/images';
import type { PrincipalStackParamList } from '@app-types/IPrincipalNavigator';

export const Dashboard = () => {
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { logout } = useAuth();
  const { colors, fontSize, fontWeight } = useTheme();
  const { authState } = useAuthStore();

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.greeting,
              { color: colors.text.inverseSecondary, fontSize: fontSize.sm },
            ]}
          >
            Bienvenid@
          </Text>
          <Text
            style={[
              styles.username,
              {
                color: colors.text.inverse,
                fontSize: fontSize['2xl'],
                fontWeight: fontWeight.bold,
              },
            ]}
            numberOfLines={1}
          >
            {authState.username ?? 'Usuario'}
          </Text>
          {(authState.companyName || authState.countryName) && (
            <View style={styles.sessionInfo}>
              {authState.companyName ? (
                <View style={styles.sessionBadge}>
                  <Icon name="business-outline" size={13} color={colors.brand.primary} style={styles.badgeIcon} />
                  <Text
                    style={[
                      styles.badgeText,
                      { color: colors.text.inverseSecondary, fontSize: fontSize.xs },
                    ]}
                    numberOfLines={1}
                  >
                    {authState.companyName}
                  </Text>
                </View>
              ) : null}
              {authState.countryName ? (
                <View style={styles.sessionBadge}>
                  <Icon name="flag-outline" size={13} color={colors.brand.primary} style={styles.badgeIcon} />
                  <Text
                    style={[
                      styles.badgeText,
                      { color: colors.text.inverseSecondary, fontSize: fontSize.xs },
                    ]}
                  >
                    {authState.countryName}
                  </Text>
                </View>
              ) : null}
            </View>
          )}
        </View>

        {/* Section title */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text.inverseMuted,
              fontSize: fontSize.xs,
              fontWeight: fontWeight.semibold,
            },
          ]}
        >
          ACCESOS RÁPIDOS
        </Text>

        {/* Grid */}
        <View style={styles.grid}>
          <MenuItem
            title="Entrada / Salida"
            image={icons.entradaSalida}
            onPress={() => navigate('InOut')}
          />
          <MenuItem
            title="Vacaciones"
            image={icons.vacaciones}
            onPress={() => navigate('Vacations')}
          />
          <MenuItem
            title="Horas Extras"
            image={icons.horasExtras}
            onPress={() => navigate('Overtime')}
          />
          <MenuItem
            title="Cerrar Sesión"
            image={icons.salir}
            onPress={logout}
            danger
          />
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  username: {
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  sessionInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeIcon: {},
  badgeText: {
    letterSpacing: 0.2,
  },
  sectionTitle: {
    paddingHorizontal: 28,
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
