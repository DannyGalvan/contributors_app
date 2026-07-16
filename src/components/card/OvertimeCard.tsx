import React from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import { Overtime } from '@database/models/Overtime';
import { LabelText } from '@components/pure/LabelText';
import { Fab } from '@components/button/Fab';
import { GlassCard } from '@components/layout/GlassCard';
import { useTheme } from '@hooks/useTheme';
import { removeOvertime } from '@database/repository/overtimeRepository';
import Icon from 'react-native-vector-icons/Ionicons';

interface OvertimeCardProps {
  data: Overtime;
  refetch: () => void;
}

export const OvertimeCard = ({ data, refetch }: OvertimeCardProps) => {
  const { colors, fontSize, fontWeight } = useTheme();

  const handleDelete = async () => {
    const result = await removeOvertime(data.id);
    if (result.affected === 1) {
      Alert.alert('Eliminado', `Horas extras #${data.id} eliminadas correctamente`);
      refetch();
    } else {
      Alert.alert('Error', 'No se pudo eliminar las horas extras');
    }
  };

  return (
    <GlassCard style={styles.card} padding={0}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: colors.border.glass },
        ]}
      >
        <View style={styles.headerLeft}>
          <Icon name="time-outline" size={16} color={colors.brand.primary} style={styles.headerIcon} />
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
            Horas Extras #{data.id}
          </Text>
        </View>
        <Fab
          iconName="trash-outline"
          onPress={handleDelete}
          size="sm"
          color={colors.status.danger}
        />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <LabelText label="Fecha" text={data.date} />
        <LabelText label="Hora de inicio" text={data.startTime} />
        <LabelText label="Hora de fin" text={data.endTime} />
        <LabelText label="Motivo" text={data.reason} />
        <LabelText label="Ubicación" text={data.locationName} />
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
