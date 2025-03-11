import React from 'react';
import { LabelText } from '@components/pure/LabelText';
import { View } from 'react-native';
import { VacationResponse } from '@app-types/VacationResponse';
import { STATES_TYPES_LABELS, VACATION_TYPES_LABELS } from '@config/constants';

interface VacationCardProps {
  data: VacationResponse;
}

export const VacationCard = ({ data }: VacationCardProps) => {
  return (
    <View className="mx-5 my-3 border rounded-xl ">
      <LabelText label="Id" text={data.id.toString()} />
      <LabelText label="Fecha Solicitud" text={data.applicationDate} />
      <LabelText label="Fecha Inicio" text={data.startDate} />
      <LabelText label="Fecha Fin" text={data.endDate} />
      <LabelText label="Dias" text={data.days.toString()} />
      <LabelText
        label="Tipo de Solicitud"
        text={VACATION_TYPES_LABELS[data.vacationType]}
      />
      <LabelText label="Estado" text={STATES_TYPES_LABELS[data.state]} />
    </View>
  );
};
