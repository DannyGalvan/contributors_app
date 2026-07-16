import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ScreenBackground } from '@components/layout/ScreenBackground';
import { GlassCard } from '@components/layout/GlassCard';
import { TouchableButton } from '@components/button/TouchableButton';
import { useTheme } from '@hooks/useTheme';
import { PermissionKey, PermissionStatus, usePermissionsStore } from '@stores/usePermissionsStore';

// ─── Permission items shown to the user ──────────────────────────────────────
interface PermissionItem {
  key: PermissionKey;
  icon: string;
  label: string;
  description: string;
}

const PERMISSIONS_LIST: PermissionItem[] = [
  {
    key: 'location',
    icon: 'location-outline',
    label: 'Ubicación GPS',
    description: 'Para registrar tus marcajes de entrada y salida en los proyectos.',
  },
  {
    key: 'camera',
    icon: 'camera-outline',
    label: 'Cámara',
    description: 'Para escanear códigos QR de los proyectos.',
  },
];

// ─── Status badge per permission ─────────────────────────────────────────────
const StatusIcon = ({ status }: { status: PermissionStatus }) => {
  const { colors } = useTheme();
  if (status === 'granted' || status === 'limited') {
    return <Icon name="checkmark-circle" size={22} color={colors.status.success} />;
  }
  if (status === 'blocked') {
    return <Icon name="close-circle" size={22} color={colors.status.danger} />;
  }
  if (status === 'unavailable') {
    return <Icon name="remove-circle" size={22} color={colors.status.warning} />;
  }
  return <Icon name="ellipse-outline" size={22} color={colors.text.muted} />;
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface PermissionsScreenProps {
  onComplete: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const PermissionsScreen = ({ onComplete }: PermissionsScreenProps) => {
  const { permissions, requestPermission, openAppSettings } = usePermissionsStore();
  const { colors, fontSize, fontWeight, radius } = useTheme();

  const [isRequesting, setIsRequesting] = useState(false);

  const allResolved = PERMISSIONS_LIST.every(({ key }) => {
    const s = permissions[key];
    return s === 'granted' || s === 'limited' || s === 'blocked' || s === 'unavailable';
  });

  const hasAnyBlocked = PERMISSIONS_LIST.some(({ key }) => permissions[key] === 'blocked');

  const handleRequestAll = async () => {
    setIsRequesting(true);
    for (const { key } of PERMISSIONS_LIST) {
      const status = permissions[key];
      if (status === 'denied' || status === 'unavailable') {
        await requestPermission(key);
      }
    }
    setIsRequesting(false);
  };

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoCircle,
              { backgroundColor: colors.surface.glassMd, borderRadius: radius.full },
            ]}
          >
            <Icon name="shield-checkmark-outline" size={44} color={colors.text.inverse} />
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text.inverse,
                fontSize: fontSize['2xl'],
                fontWeight: fontWeight.bold,
              },
            ]}
          >
            Permisos necesarios
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.text.inverseSecondary, fontSize: fontSize.sm },
            ]}
          >
            La app necesita los siguientes permisos para funcionar correctamente.
          </Text>
        </View>

        {/* Permission list */}
        <GlassCard style={styles.card}>
          {PERMISSIONS_LIST.map(({ key, icon, label, description }, index) => {
            const status: PermissionStatus = permissions[key];
            const isLast = index === PERMISSIONS_LIST.length - 1;

            return (
              <View key={key}>
                <View style={styles.permissionRow}>
                  <View
                    style={[
                      styles.permIcon,
                      {
                        backgroundColor: colors.surface.glassMd,
                        borderRadius: radius.md,
                      },
                    ]}
                  >
                    <Icon name={icon} size={22} color={colors.brand.primary} />
                  </View>

                  <View style={styles.permInfo}>
                    <Text
                      style={[
                        styles.permLabel,
                        {
                          color: colors.text.primary,
                          fontSize: fontSize.base,
                          fontWeight: fontWeight.semibold,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                    <Text
                      style={[
                        styles.permDesc,
                        { color: colors.text.secondary, fontSize: fontSize.xs },
                      ]}
                    >
                      {description}
                    </Text>
                  </View>

                  <StatusIcon status={status} />
                </View>

                {!isLast && (
                  <View
                    style={[styles.divider, { backgroundColor: colors.border.divider }]}
                  />
                )}
              </View>
            );
          })}
        </GlassCard>

        {/* Prominent Disclosure — required by Google Play User Data policy */}
        <View
          style={[
            styles.disclosure,
            {
              backgroundColor: colors.status.infoBg,
              borderColor: colors.status.info,
              borderRadius: radius.md,
            },
          ]}
        >
          <View style={styles.disclosureHeader}>
            <Icon name="information-circle-outline" size={18} color={colors.status.info} style={styles.disclosureIcon} />
            <Text
              style={[
                styles.disclosureTitle,
                { color: colors.text.primary, fontSize: fontSize.sm, fontWeight: fontWeight.bold },
              ]}
            >
              Aviso de recopilación de datos
            </Text>
          </View>
          <Text style={[styles.disclosureBody, { color: colors.text.secondary, fontSize: fontSize.xs }]}>
            {'Al conceder los permisos, esta app recopilará y usará tus datos de la siguiente manera:\n\n'}
            {'• '}
            <Text style={{ fontWeight: fontWeight.semibold, color: colors.text.primary }}>{'Ubicación GPS (latitud y longitud): '}</Text>
            {'se recopila para verificar tu asistencia en proyectos y centros de trabajo, incluso cuando la app está en segundo plano.\n\n'}
            {'• '}
            <Text style={{ fontWeight: fontWeight.semibold, color: colors.text.primary }}>{'Cámara: '}</Text>
            {'se usa únicamente para escanear códigos QR de proyectos. No se almacenan imágenes.\n\n'}
            {'• '}
            <Text style={{ fontWeight: fontWeight.semibold, color: colors.text.primary }}>{'Compartición: '}</Text>
            {'los datos de ubicación y asistencia se comparten con tu empresa empleadora afiliada a Grupo Misol. No se usan para publicidad.\n\n'}
            {'Para más información consulta nuestra '}
            <Text
              style={{ fontWeight: fontWeight.semibold, color: colors.status.info, textDecorationLine: 'underline' }}
              onPress={() => Linking.openURL('https://www.grupomisol.com/politica-de-privacidad-gestor/')}
            >
              {'Política de Privacidad'}
            </Text>
            {'.'}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {hasAnyBlocked && (
            <>
              <Text
                style={[
                  styles.blockedHint,
                  { color: colors.text.inverseMuted, fontSize: fontSize.xs },
                ]}
              >
                Algunos permisos fueron bloqueados. Ábrelos manualmente desde Configuración.
              </Text>
              <TouchableButton
                variant="secondary"
                title="Abrir Configuración"
                icon="settings-outline"
                onPress={openAppSettings}
                fullWidth
                styles={styles.btn}
              />
            </>
          )}

          {!allResolved || isRequesting ? (
            <TouchableButton
              variant="cta"
              title="Conceder permisos"
              icon="shield-checkmark-outline"
              onPress={handleRequestAll}
              loading={isRequesting}
              fullWidth
              styles={styles.btn}
            />
          ) : (
            <TouchableButton
              variant="cta"
              title="Continuar"
              icon="arrow-forward-outline"
              onPress={onComplete}
              fullWidth
              styles={styles.btn}
            />
          )}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    marginBottom: 20,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  permIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  permInfo: {
    flex: 1,
    marginRight: 10,
  },
  permLabel: {
    marginBottom: 2,
  },
  permDesc: {
    lineHeight: 16,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  disclosure: {
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  disclosureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  disclosureIcon: {
    marginRight: 6,
  },
  disclosureTitle: {
    flex: 1,
  },
  disclosureBody: {
    lineHeight: 18,
  },
  actions: {
    gap: 10,
  },
  blockedHint: {
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  btn: {},
});
