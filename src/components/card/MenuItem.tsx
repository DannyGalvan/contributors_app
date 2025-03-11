import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColors } from '@styles/appColors';
import Icon from 'react-native-vector-icons/Ionicons';

interface MenuItemProps {
  title: string;
  icon?: string;
  image?: number;
  onPress: () => void;
  iconColor?: string;
}

export const MenuItem = ({
  title,
  icon,
  image,
  onPress,
  iconColor,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <View className="bg-white p-3 rounded-3xl absolute" style={styles.icon}>
        {icon && (
          <Icon name={icon} size={65} color={iconColor || appColors.primary} />
        )}
        {image && (
          <Image
            source={image}
            style={{
              width: 65,
              height: 65,
            }}
          />
        )}
      </View>
      {title && (
        <Text className={'text-black font-bold text-md text-center mt-24'}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  icon: {
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
