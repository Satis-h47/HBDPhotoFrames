import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { clamp } from 'react-native-reanimated';  // Add clamp import

const { width, height } = Dimensions.get('window');
const BOX_SIZE = 150; // Define the size of the box

export default function BtnRotate() {
  const translationX = useSharedValue(width / 2 - BOX_SIZE / 2);
  const translationY = useSharedValue(height / 2 - BOX_SIZE / 2);
  const prevTranslationX = useSharedValue(translationX.value);
  const prevTranslationY = useSharedValue(translationY.value);

  const scale = useSharedValue(1);
  const angle = useSharedValue(0); // Keeps track of the accumulated angle

  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width - BOX_SIZE * scale.value;
      const maxTranslateY = height - BOX_SIZE * scale.value;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        0,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        0,
        maxTranslateY
      );
    })
    .runOnJS(true);

  // Gesture to track the single finger movement and calculate the angle
  const rotateGesture = Gesture.Pan()
        .onUpdate((event) => {
      // Calculate the angle based on the touch position and the top-left corner (reference point)
      const currentAngle = Math.atan2(
        event.y,  // Top-left y (50px offset for center)
        event.x   // Top-left x (50px offset for center)
      );

      // Update the angle to keep track of the rotation continuously
      angle.value += currentAngle 

      // Update the starting point for the next gesture update
      // startTouch.value = { x: event.x, y: event.y };
    });

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [ { translateX: translationX.value }, { translateY: translationY.value }, { rotate: `${angle.value}rad` }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, boxAnimatedStyles]}>
          <Text style={styles.boxText}>Box</Text>

          {/* Gesture detector for the corner (we use the bottom-right corner in this case) */}
          <GestureDetector gesture={rotateGesture}>
            <Animated.View style={styles.corner}>
              <Text style={styles.cornerText}>R</Text>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 20,
    backgroundColor: '#b58df1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Use absolute positioning to move the box
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  corner: {
    width: 30,
    height: 30,
    backgroundColor: '#3b3b3b',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cornerText: {
    color: 'white',
    fontSize: 16,
  },
});
