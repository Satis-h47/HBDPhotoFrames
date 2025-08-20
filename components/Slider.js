import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';

const SLIDER_WIDTH = 300;
const HANDLE_WIDTH = 20;
const MAX_OFFSET = SLIDER_WIDTH - HANDLE_WIDTH;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedView = Animated.createAnimatedComponent(View);

const Slider = ({ onValueChange }) => {
  const offset = useSharedValue(MAX_OFFSET); // Initial = 100%
  const sliderValue = useSharedValue(100);

  // Gesture Handler
  const pan = Gesture.Pan().onChange((event) => {
    offset.value = Math.max(0, Math.min(offset.value + event.changeX, MAX_OFFSET));
    sliderValue.value = Math.round((offset.value / MAX_OFFSET) * 100);
  });

  // Animated styles
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const filledTrackStyle = useAnimatedStyle(() => ({
    width: offset.value + HANDLE_WIDTH / 2,
  }));

  const animatedProps = useAnimatedProps(() => ({
    text: `${sliderValue.value}`,
    defaultValue: `${sliderValue.value}`
  }));

  // Callback on value change
  useDerivedValue(() => {
    if (onValueChange) {
      runOnJS(onValueChange)(sliderValue.value);
    }
  }, [sliderValue]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.sliderTrack}>
          <AnimatedView style={[styles.filledTrack, filledTrackStyle]} />
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.sliderHandle, sliderStyle]} />
          </GestureDetector>
        </View>
        <AnimatedTextInput
          animatedProps={animatedProps}
          style={styles.boxWidthText}
          editable={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    marginRight: 10,
  },
  filledTrack: {
    position: 'absolute',
    height: 6,
    backgroundColor: 'black',
    borderRadius: 3,
    left: 0,
    top: 0,
  },
  sliderHandle: {
    width: HANDLE_WIDTH,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    top: -7,
  },
  boxWidthText: {
    width: 50,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Slider;
