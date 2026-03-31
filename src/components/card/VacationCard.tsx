import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LabelText } from '@components/pure/LabelText';
import { GlassCard } from '@components/layout/GlassCard';
import { StatusBadge } from '@components/layout/StatusBadge';
import { VacationResponse } from '@app-types/VacationResponse';
import { STATES_TYPES_LABELS, VACATION_TYPES_LABELS } from '@config/constants';
import { useTheme } from '@hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface VacationCardProps {
  data: VacationResponse;
}

const stateVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'pending'> = {
  APROBADA: 'success',
  APROBADO: 'success',
  PENDIENTE: 'pending',
  RECHAZADA: 'danger',
  RECHAZADO: 'danger',
  EN_PROCESO: 'info',
};

export const VacationCard = ({ data }: VacationCardProps) => {
  const { colors, fontSize, fontWeight } = useTheme();
  const stateLabel = STATES_TYPES_LABELS[data.state] ?? data.state;
  const badgeVariant = stateVariantMap[data.state?.toUpperCase()] ?? 'pending';

  return (
    <GlassCard style={styles.card} padding={0}>
      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: colors.border.glass }]}
      >
        <View style={styles.headerLeft}>
          <Icon
            name="umbrella-outline"
            size={16}
            color={colors.brand.primary}
            style={styles.headerIcon}
          />
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontSize: fontSize.base,
                fontWeight: fontWeight.semibold,
              },
            ]}
          >
            Solicitud #{data.id}
          </Text>
        </View>
        <StatusBadge label={stateLabel} variant={badgeVariant} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <LabelText label="Fecha Solicitud" text={data.applicationDate} />
        <LabelText label="Fecha Inicio" text={data.startDate} />
        <LabelText label="Fecha Fin" text={data.endDate} />
        <LabelText label="Días" text={data.days.toString()} />
        <LabelText
          label="Tipo de Solicitud"
          text={VACATION_TYPES_LABELS[data.vacationType]}
        />
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {},
  body: {
    paddingVertical: 8,
  },
});
