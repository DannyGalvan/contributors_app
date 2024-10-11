import React from 'react';
import {
  Image,
  useWindowDimensions,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from 'react-native';

interface Props {
  isVisible: boolean;
  style?: StyleProp<ImageStyle>;
}

export const Logo = ({ isVisible, style }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Image
      style={[
        styles.image,
        style,
        !isVisible && width >= 768 && styles.visible,
      ]}
      source={require('../../assets/images/logo.png')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
  },
  visible: {
    display: 'none',
  },
});
