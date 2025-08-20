import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  const rotateYAnim = useState(new Animated.Value(0))[0];
  const rotateXAnim = useState(new Animated.Value(0))[0];

const rotateY = rotateYAnim.interpolate({
  inputRange: [-1, 0, 1],
  outputRange: ['-180deg', '0deg', '180deg']
});
const rotateX = rotateXAnim.interpolate({
  inputRange: [-1, 0, 1],
  outputRange: ['-180deg', '0deg', '180deg']
});

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              { perspective: 1000 },
              { rotateY: rotateY },
              { rotateX: rotateX}
            ]
          }
        ]}
      >
        <Text style={styles.text}>Rotate Me</Text>
      </Animated.View>

      <Slider
        style={styles.slider}
        minimumValue={-1}
        maximumValue={1}
        value={0}
        step={0.01}
        onValueChange={(value) => rotateXAnim.setValue(value)}
        minimumTrackTintColor="#61dafb"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#61dafb"
      />
            <Slider
        style={styles.slider}
        minimumValue={-1}
        maximumValue={1}
        value={0}
        step={0.01}
        onValueChange={(value) => rotateYAnim.setValue(value)}
        minimumTrackTintColor="#61dafb"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#61dafb"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  box: {
    width: 150,
    height: 150,
    // backgroundColor: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
  }
});
