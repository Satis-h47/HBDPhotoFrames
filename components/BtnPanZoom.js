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
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = 150;
const HANDLE_SIZE = 40;

export default function BtnPanZoom() {
  const translationX = useSharedValue(width / 2 - BOX_SIZE / 2);
  const translationY = useSharedValue(height / 2 - BOX_SIZE / 2);
  const prevTranslationX = useSharedValue(translationX.value);
  const prevTranslationY = useSharedValue(translationY.value);

  const scale = useSharedValue(1);
  const startDistance = useSharedValue(0);
  const startScale = useSharedValue(1);

  // Helper: center of the box
  const getBoxCenter = () => ({
    x: translationX.value + BOX_SIZE / 2,
    y: translationY.value + BOX_SIZE / 2,
  });

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

  // === Zoom Handle Gesture ===
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
      const factor = startDistance.value/currentDistance;

      scale.value = withSpring(clamp(startScale.value * factor, 0.5, 3), { damping: 0, stiffness: 200 });
    })
    .runOnJS(true);

  // === Animated Styles ===
  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

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

  return (
    <GestureHandlerRootView style={styles.root}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, boxStyle]}>
          <Text style={styles.boxText}>Box</Text>

          <GestureDetector gesture={handleGesture}>
            <Animated.View style={handleStyle}>
              <Text style={{ color: 'white' }}>⇲</Text>
            </Animated.View>
          </GestureDetector>
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
