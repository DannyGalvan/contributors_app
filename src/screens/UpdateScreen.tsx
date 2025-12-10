import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { appColors } from '@styles/appColors';

interface Props {
  title: string;
}

export const UpdateScreen = ({ title }: Props) => {
  return (
    <View className="bg-white" style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.primary,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.warning,
    alignContent: 'center',
    textAlign: 'center',
  },
});
