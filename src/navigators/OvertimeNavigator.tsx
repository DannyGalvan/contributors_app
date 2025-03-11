import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OvertimeStackParamList } from '@app-types/IOvertimeNavigator';
import { CreateOvertimeScreen } from '@screens/overtime/CreateOvertimeScreen';
import { OvertimeScreen } from '@screens/overtime/OvertimeScreen';
import { StyleSheet } from 'react-native';
import { TouchableButton } from '@components/button/TouchableButton';
import { appColors } from '@styles/appColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator<OvertimeStackParamList>();

export const OvertimeNavigator = () => {
  const { navigate } = useNavigation<NavigationProp<OvertimeStackParamList>>();
  return (
    <Stack.Navigator
      initialRouteName="HorasExtras"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="HorasExtras"
        component={OvertimeScreen}
        options={{
          title: 'Horas Extras',
          headerRight: () => (
            <TouchableButton
              onPress={() => navigate('Crear')}
              title=""
              icon="time"
              styles={styles.buttonRight}
              iconColor={appColors.white}
            />
          ),
        }}
      />
      <Stack.Screen name="Crear" component={CreateOvertimeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonRight: {
    marginRight: 15,
    backgroundColor: appColors.success,
    borderRadius: 40,
    padding: 5,
  },
});
