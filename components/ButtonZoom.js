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

export default function ButtonZoom() {
  // Box state
  const translationX = useSharedValue(width / 2 - BOX_SIZE / 2);
  const translationY = useSharedValue(height / 2 - BOX_SIZE / 2);
  const scale = useSharedValue(1);

  const startDistance = useSharedValue(0);
  const startScale = useSharedValue(1);

  // Center of box (static reference point for zooming)
  const getBoxCenter = () => ({
    x: translationX.value + BOX_SIZE / 2,
    y: translationY.value + BOX_SIZE / 2,
  });

  // Box style
  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
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

  const handleGesture = Gesture.Pan()
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
      scale.value = clamp(factor * startScale.value, 0.5, 3);
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView style={styles.root}>
      <Animated.View style={[styles.box, boxStyle]}>
        <Text style={styles.boxText}>Box</Text>

        <GestureDetector gesture={handleGesture}>
          <Animated.View style={handleStyle}>
            <Text style={{ color: 'white' }}>⇲</Text>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#222',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:'black'
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
