import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
  onPress: () => void;
  title?: string;
  iconColor?: string;
  icon?: string;
  iconSize?: number;
}

export const TouchableButton = ({
  styles,
  icon,
  onPress,
  textStyle,
  title,
  iconColor,
  iconSize,
  className,
  textClassName,
}: Props) => {
  return (
    <TouchableOpacity
      className={className}
      style={styles}
      onPress={onPress}
      accessibilityLabel={title}
    >
      {title && (
        <Text className={textClassName} style={textStyle}>
          {title}
        </Text>
      )}
      {icon && <Icon name={icon} size={iconSize ?? 30} color={iconColor} />}
    </TouchableOpacity>
  );
};
