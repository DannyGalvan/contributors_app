import React from 'react';
import { Alert, View } from 'react-native';
import { Overtime } from '@database/models/Overtime';
import { LabelText } from '@components/pure/LabelText';
import { Fab } from '@components/button/Fab';
import { appColors } from '@styles/appColors';
import { removeOvertime } from '@database/repository/overtimeRepository';

interface OvertimeCardProps {
  data: Overtime;
  refetch: () => void;
}

export const OvertimeCard = ({ data, refetch }: OvertimeCardProps) => {
  const handleDelete = async () => {
    const result = await removeOvertime(data.id);
    if (result.affected === 1) {
      Alert.alert(`Horas extras con Id. ${data.id} eliminadas correctamente`);
      refetch();
    } else {
      Alert.alert('Error al eliminar las horas extras');
    }
  };

  return (
    <View className="mx-5 my-3 border rounded-xl ">
      <Fab
        iconName="trash"
        onPress={handleDelete}
        style={{
          backgroundColor: appColors.danger,
          right: 10,
          top: 10,
          position: 'absolute',
        }}
      />
      <LabelText label="Fecha" text={data.date} />
      <LabelText label="Hora de inicio" text={data.startTime} />
      <LabelText label="Hora de fin" text={data.endTime} />
      <LabelText label="Motivo" text={data.reason} />
      <LabelText label="Ubicación" text={data.locationName} />
    </View>
  );
};
