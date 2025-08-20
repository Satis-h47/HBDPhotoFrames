import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  clamp,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = 150;
const HANDLE_SIZE = 40;

export default function PinchRotateSingleFinger() {
  // Box state
  const translationX = useSharedValue(width / 2 - BOX_SIZE / 2);
  const translationY = useSharedValue(height / 2 - BOX_SIZE / 2);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0); // Track rotation angle in radians

  const startDistance = useSharedValue(0);
  const startScale = useSharedValue(1);
  const startAngle = useSharedValue(0); // Track initial angle of the rotation gesture

  const prevTranslationX = useSharedValue(translationX.value);
  const prevTranslationY = useSharedValue(translationY.value);

  // Center of box (static reference point for zooming and rotation)
  const getBoxCenter = () => ({
    x: translationX.value + BOX_SIZE / 2,
    y: translationY.value + BOX_SIZE / 2,
  });

  // Box style (includes scale and rotation)
  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  // Handle position (always at bottom-right of the box, respecting scale)
  const handleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    right: -HANDLE_SIZE / 2,
    bottom: -HANDLE_SIZE / 2,
  }));

  // Gesture for zooming (same as before)
  const handleZoomGesture = Gesture.Pan()
    .onStart((e) => {
      const center = getBoxCenter();
      const dx = e.x - center.x;
      const dy = e.y - center.y;
      startDistance.value = Math.sqrt(dx * dx + dy * dy);
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      const center = getBoxCenter();
      const dx = e.x - center.x;
      const dy = e.y - center.y;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const factor = startDistance.value / currentDistance;
      scale.value = factor * startScale.value;
    })
    .runOnJS(true);

  // Gesture for rotation with speed adjustment
  const handleRotationGesture = Gesture.Pan()
    .onStart((e) => {
      const center = getBoxCenter();
      const dx = e.x - center.x;
      const dy = e.y - center.y;
      startAngle.value = Math.atan2(dy, dx); // Calculate the initial angle of the touch
    })
    .onUpdate((e) => {
      const center = getBoxCenter();
      const dx = e.x - center.x;
      const dy = e.y - center.y;
      const currentAngle = Math.atan2(dy, dx); // Calculate current angle of the touch
      
      // Calculate rotation delta (this version flips the sign for the correct direction)
      let rotationDelta = startAngle.value - currentAngle;

      // Optional: increase sensitivity by multiplying the delta by a factor
      rotationDelta *= 2; // Adjust this factor to make the rotation faster/slower

      // Smooth the rotation value and update the angle with better responsiveness
      rotation.value = rotation.value + rotationDelta;

      // Update the start angle for the next update
      startAngle.value = currentAngle;
    })
    .runOnJS(true);

      const gesture = Gesture.Exclusive(
        // doubleTap,
        // singleTap,
        Gesture.Simultaneous(handleRotationGesture, handleZoomGesture)
      );
  // === Pan Gesture ===
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
  return (
    <GestureHandlerRootView style={styles.root}>
          <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, boxStyle]}>
        <Text style={styles.boxText}>Box</Text>

        {/* Zoom Gesture */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={handleStyle}>
            <Text style={{ color: 'white' }}>⇲</Text>
          </Animated.View>
        </GestureDetector>

        {/* Rotation Gesture */}
        {/* <GestureDetector gesture={handleRotationGesture}>
          <Animated.View style={handleStyle}>
            <Text style={{ color: 'white' }}>↻</Text>
          </Animated.View>
        </GestureDetector> */}
      </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#222',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
