import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { TouchableButton } from '@components/button/TouchableButton';
import { useTheme } from '@hooks/useTheme';
import { PermissionKey, PermissionStatus, usePermissionsStore } from '@stores/usePermissionsStore';

// ─── Config per permission ────────────────────────────────────────────────────
interface PermissionConfig {
  icon: string;
  title: string;
  rationale: string;
  blockedMessage: string;
}

const PERMISSION_CONFIG: Record<PermissionKey, PermissionConfig> = {
  location: {
    icon: 'location-outline',
    title: 'Permiso de Ubicación',
    rationale:
      'Esta app necesita acceder a tu ubicación GPS para registrar tus marcajes de entrada y salida de forma precisa en los proyectos.',
    blockedMessage:
      'El permiso de ubicación fue denegado permanentemente. Para continuar ve a Configuración y habilita el permiso manualmente.',
  },
  camera: {
    icon: 'camera-outline',
    title: 'Permiso de Cámara',
    rationale:
      'Esta app necesita acceder a tu cámara para escanear los códigos QR de los proyectos.',
    blockedMessage:
      'El permiso de cámara fue denegado permanentemente. Para continuar ve a Configuración y habilita el permiso manualmente.',
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface PermissionGateProps {
  permissionKey: PermissionKey;
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const PermissionGate = ({ permissionKey, children }: PermissionGateProps) => {
  const { permissions, checkPermission, requestPermission, openAppSettings } =
    usePermissionsStore();

  const [isChecking, setIsChecking] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const { colors, fontSize, fontWeight, radius } = useTheme();

  const config = PERMISSION_CONFIG[permissionKey];
  const status: PermissionStatus = permissions[permissionKey];

  // Check permission on mount
  useEffect(() => {
    (async () => {
      setIsChecking(true);
      await checkPermission(permissionKey);
      setIsChecking(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequest = async () => {
    setIsRequesting(true);
    await requestPermission(permissionKey);
    setIsRequesting(false);
  };

  // ── Checking ──
  if (isChecking) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.text.inverse} />
          <Text style={[styles.checkingText, { color: colors.text.inverseSecondary, fontSize: fontSize.sm }]}>
            Verificando permisos...
          </Text>
        </View>
      </ScreenBackground>
    );
  }

  // ── Granted / Limited → render children ──
  if (status === 'granted' || status === 'limited') {
    return <>{children}</>;
  }

  // ── Unavailable (hardware not present) ──
  if (status === 'unavailable') {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <GlassCard style={styles.card}>
            <Icon name="warning-outline" size={48} color={colors.status.warning} style={styles.icon} />
            <Text style={[styles.title, { color: colors.text.primary, fontSize: fontSize.xl, fontWeight: fontWeight.bold }]}>
              No disponible
            </Text>
            <Text style={[styles.body, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
              {permissionKey === 'camera'
                ? 'Tu dispositivo no tiene cámara disponible.'
                : 'Tu dispositivo no tiene GPS disponible.'}
            </Text>
          </GlassCard>
        </View>
      </ScreenBackground>
    );
  }

  // ── Blocked → must go to settings ──
  if (status === 'blocked') {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <GlassCard style={styles.card}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: colors.status.dangerBg, borderRadius: radius.full },
              ]}
            >
              <Icon name="lock-closed-outline" size={36} color={colors.status.danger} />
            </View>

            <Text style={[styles.title, { color: colors.text.primary, fontSize: fontSize.xl, fontWeight: fontWeight.bold }]}>
              {config.title} bloqueado
            </Text>

            <Text style={[styles.body, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
              {config.blockedMessage}
            </Text>

            <TouchableButton
              variant="primary"
              title="Abrir Configuración"
              icon="settings-outline"
              onPress={openAppSettings}
              fullWidth
              styles={styles.btn}
            />
          </GlassCard>
        </View>
      </ScreenBackground>
    );
  }

  // ── Denied → show rationale and request button ──
  return (
    <ScreenBackground>
      <View style={styles.center}>
        <GlassCard style={styles.card}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surface.glassMd, borderRadius: radius.full },
            ]}
          >
            <Icon name={config.icon} size={36} color={colors.brand.primary} />
          </View>

          <Text style={[styles.title, { color: colors.text.primary, fontSize: fontSize.xl, fontWeight: fontWeight.bold }]}>
            {config.title}
          </Text>

          <Text style={[styles.body, { color: colors.text.secondary, fontSize: fontSize.sm }]}>
            {config.rationale}
          </Text>

          <TouchableButton
            variant="primary"
            title="Conceder permiso"
            icon="shield-checkmark-outline"
            onPress={handleRequest}
            loading={isRequesting}
            fullWidth
            styles={styles.btn}
          />
        </GlassCard>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  btn: {
    marginTop: 4,
  },
  checkingText: {
    marginTop: 12,
    letterSpacing: 0.3,
  },
});
