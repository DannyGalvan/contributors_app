import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { OvertimeScreen } from '@screens/overtime/OvertimeScreen';
import { CreateOvertimeScreen } from '@screens/overtime/CreateOvertimeScreen';
import { useTheme } from '@hooks/useTheme';
import { OvertimeStackParamList } from '@app-types/IOvertimeNavigator';

const Stack = createStackNavigator<OvertimeStackParamList>();

export const OvertimeNavigator = () => {
  const { colors, fontWeight } = useTheme();
  const { navigate } = useNavigation<NavigationProp<OvertimeStackParamList>>();

  return (
    <Stack.Navigator
      id="overtimeNavigator"
      initialRouteName="HorasExtras"
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.primary },
        headerTintColor: colors.text.inverse,
        headerTitleStyle: { fontWeight: fontWeight.bold },
      }}
    >
      <Stack.Screen
        name="HorasExtras"
        component={OvertimeScreen}
        options={{
          title: 'Horas Extras',
          headerRight: () => (
            <TouchableOpacity style={styles.addBtn} onPress={() => navigate('Crear')}>
              <Icon name="add" size={24} color={colors.text.inverse} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Crear"
        component={CreateOvertimeScreen}
        options={{ title: 'Nueva Hora Extra' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    marginRight: 16,
    padding: 4,
  },
});
