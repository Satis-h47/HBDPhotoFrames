import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text
} from 'react-native';

const SCREEN_WIDTH = 300;
const SCREEN_HEIGHT = 500;
const MIN_SIZE = 50;

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function clamp(val, min, max) {
  'worklet';
  return Math.min(Math.max(val, min), max);
}
const { width, height } = Dimensions.get('screen');

export default function ResizableSquare() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  
  const [size, setSize] = useState({ width: 100, height: 100 });

  // 🔁 Always keep the latest size in a ref to avoid closure issues
  const latestSizeRef = useRef(size);

  // Update the ref whenever size changes
  useEffect(() => {
    latestSizeRef.current = size;
  }, [size]);

  const gestureStartSize = useRef({ width: 100, height: 100 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        gestureStartSize.current = { ...latestSizeRef.current };
      },

      onPanResponderMove: (_, gestureState) => {
        // const dx = gestureState.dx;
        // const dy = gestureState.dy;  // 🧠 Get top-left position
        let newWidth = gestureState.moveX - translationX.value;
        let newHeight = gestureState.moveY - translationY.value;
        
        if(!(gestureState.moveX < width - 10)) newWidth = latestSizeRef.current.width
        newWidth = Math.max(MIN_SIZE, newWidth);
        newHeight = Math.max(MIN_SIZE, newHeight);

        setSize({ width: newWidth, height: newHeight });
      },
    })
  ).current;

    const pan = Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        'worklet';
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      })
      .onUpdate((event) => {
        'worklet';
        // const maxTranslateX = 350 / 2 - 50;
        // const maxTranslateY = 500 / 2 - 50;
  
        translationX.value = prevTranslationX.value + event.translationX
        translationY.value = prevTranslationY.value + event.translationY
      });
  
    const boxStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    }));

  return (
         <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.square,
          { width: size.width, height: size.height }, boxStyle
        ]}
      >
        <View style={{backgroundColor:'red'}}>
        <Text style={{}}>Haapy Birthday Helloon Baby Ha</Text>
        </View>
        <View style={{ alignItems:'flex-end',justifyContent:'flex-end'}}>
        <View
          {...panResponder.panHandlers}
          style={styles.resizer}
        >
        </View>
        </View>
      </Animated.View>
            </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#eee',
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'relative',
  },
  square: {
    backgroundColor: 'skyblue',
    // justifyContent:'space-between',
    // alignItems:'flex-end',
    // position: 'absolute',
    top: 0,
    left: 0,
  },
  resizer: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    // position: 'absolute',
    right: -10,
    bottom: -10,
    // zIndex: 1,
  },
});
