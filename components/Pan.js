import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  measure,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function clamp(val, min, max) {
  'worklet';
  return Math.min(Math.max(val, min), max);
}

export default function Pan() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
    const startScale = useSharedValue(0);

  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const initialDistance = useSharedValue(0);

  const boxRef = useAnimatedRef();
  const insideBoxRef = useAnimatedRef();

  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      'worklet';
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      'worklet';
      // const boxLayout = measure(boxRef);
      // const insideLayout = measure(insideBoxRef);

      // console.log('Box center:', {
      //   x: boxLayout.x + boxLayout.width / 2,
      //   y: boxLayout.y + boxLayout.height / 2
      // });

      // console.log('Inside box corners:', {
      //   topLeft: { x: insideLayout.x, y: insideLayout.y },
      //   bottomRight: {
      //     x: insideLayout.x + insideLayout.width,
      //     y: insideLayout.y + insideLayout.height
      //   }
      // });

      const maxTranslateX = 350 / 2 - 50;
      const maxTranslateY = 500 / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
  // .runOnJS(true);

  const panBox = Gesture.Pan()
    .onStart(() => {
      'worklet';
      // You can implement dragging logic here if needed
    })
    .onUpdate((event) => {
      'worklet';
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    });

      const pinch = Gesture.Pinch()
        .onStart(() => {
    'worklet';
          startScale.value = scale.value;
        })
        .onUpdate((event) => {
    'worklet';
          scale.value = clamp(
            startScale.value * event.scale,
            0.5,
            Math.min(350 / 100, 500 / 100)
          );
        })

const scaleHandle = Gesture.Pan()
  // .simultaneousWithExternalGesture(panBox)
  .onStart((event) => {
    'worklet';

    const layout = measure(boxRef);
    if (!layout) return;

    originX.value = layout.pageX;
    originY.value = layout.pageY;

    const dx = event.absoluteX - originX.value;
    const dy = event.absoluteY - originY.value;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize based on current scale
    initialDistance.value = distance / scale.value;
  })
  .onUpdate((event) => {
    'worklet';

    const dx = event.absoluteX - originX.value;
    const dy = event.absoluteY - originY.value;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);

    const newScale = currentDistance / initialDistance.value;
    scale.value = clamp(newScale, 0.5, 3);
  });

  const handlingzp = Gesture.Simultaneous(pinch, pan)

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={handlingzp}>
        <Animated.View ref={boxRef} style={[styles.box, boxStyle]}>
          <GestureDetector gesture={scaleHandle}>
            <Animated.View ref={insideBoxRef} style={styles.insidebox} />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#b58df1',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  insidebox: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
});
