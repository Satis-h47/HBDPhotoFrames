import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({value, onValueChange }) => {
    const [sliderLayout, setSliderLayout] = useState(null);

  const min = -100;
  const max = 100;

  const percentage = ((value - min) / (max - min)) * 100;
  const zeroPos = ((0 - min) / (max - min)) * 100;
  const fillStart = Math.min(percentage, zeroPos);
  const fillEnd = Math.max(percentage, zeroPos);

  return (
    <View style={styles.container}>
        {/* {sliderLayout && (
  <>
    <View style={[
      styles.trackContainer,
      { top: sliderLayout.height / 2 - 1 }
    ]} />
    <View style={[
      styles.centerLine,
      { top: sliderLayout.height / 2 - 2.5 }
    ]} />
  </>
)} */}
{  sliderLayout && <>    
<View style={[
      styles.trackContainer,
      { top: sliderLayout.height / 2 - 1 }
    ]}>
        <View style={styles.trackBackground} />
        <View
          style={[
            styles.trackFill,
            {
              left: `${fillStart}%`,
              width: `${fillEnd - fillStart}%`,
            },
          ]}
        />
      </View>
        <View style={[
      styles.centerLine,
      { top: sliderLayout.height / 2 - 2.5 }
    ]} />
    </>
    }
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="#000"

  onLayout={(event) => setSliderLayout(event.nativeEvent.layout)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%'
  },
  trackContainer: {
    height: 2,
    backgroundColor: 'transparent',
    // borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    left: 16,
    right: 16,
    // top: 16,
  },
  trackBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ccc',
  },
  trackFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  slider: {
    width: '100%',
    // height: 40,
  },
    centerLine: {
    width: 5,
    height: 5,
    borderRadius:2.5,
    backgroundColor: 'black',
    position:'absolute',
    left: '50%',
    // top: 14.5,
  },
});

export default CustomSlider;
