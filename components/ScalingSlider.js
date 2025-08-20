import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const ScalingSlider = ({
  value,
  minimumValue = -50,
  maximumValue = 50,
  onValueChange,
}) => {
  const getFillSliderProps = () => {
    if (value === 0) {
      return {
        value: 0,
        minimumValue: 0,
        maximumValue: 0,
        minimumTrackTintColor: 'transparent',
        maximumTrackTintColor: 'transparent',
      };
    }

    const isPositive = value > 0;

    return {
      value,
      minimumValue: isPositive ? 0 : value,
      maximumValue: isPositive ? value : 0,
      minimumTrackTintColor: 'blue',
      maximumTrackTintColor: 'red',
    };
  };

  const fillSliderProps = getFillSliderProps();

  return (
    <View style={styles.container}>
      {/* Layer 1: Background gray */}
      <Slider
        style={styles.slider}
        value={0}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor="lightgray"
        maximumTrackTintColor="lightgray"
        thumbTintColor="transparent"
        disabled
      />

      {/* Layer 2: Blue fill from 0 to value */}
      <Slider
        style={[styles.slider, StyleSheet.absoluteFill]}
        {...fillSliderProps}
        thumbTintColor="transparent"
        disabled
      />

      {/* Layer 3: Actual slider with thumb */}
      <Slider
        style={[styles.slider, StyleSheet.absoluteFill]}
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="black"
        onValueChange={onValueChange}
        step={1}
      />

      {/* Optional: Center marker */}
      <View style={styles.centerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  centerLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#aaa',
    left: '50%',
    transform: [{ translateX: -1 }],
    zIndex: 1,
  },
});

export default ScalingSlider;
