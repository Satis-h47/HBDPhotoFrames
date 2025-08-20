import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

function Photo() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const blockPan = useSharedValue(false);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  const rotationGesture = Gesture.Rotation()
    .onChange((e) => {
      rotation.value += e.rotationChange;
    })
    .onStart((e) => {
      blockPan.value = true;
    })
    .onFinalize((e) => {
      blockPan.value = false;
    });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onChange((e) => {
      if (blockPan.value) {
        return;
      }

      translationX.value += e.changeX;
      translationY.value += e.changeY;
    });

  const gesture = Gesture.Simultaneous(rotationGesture, panGesture);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.button, style]} />
    </GestureDetector>
  );
}

export default function Example() {
  return (
    <GestureHandlerRootView>
    <View style={styles.home}>
      <Photo />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'plum',
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: 'green',
    alignSelf: 'center',
  },
});
