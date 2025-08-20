import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const ShadowPropSlider = ({ label, value, ...props }) => {
  return (
    <View style={styles.container}>
      <Slider style={styles.slider} step={1} value={value} {...props}
        minimumTrackTintColor="black"
        // maximumTrackTintColor="transparent"
        thumbTintColor="#000" />
      <Text style={styles.text}>{value.toFixed(0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  slider: {
    flex: 1
  },
  text: {
    width:30,
    marginLeft: 10
  },
});

export default ShadowPropSlider;
