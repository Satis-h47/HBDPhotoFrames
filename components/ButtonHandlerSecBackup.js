import React, { useState, useRef, useEffect } from 'react';
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
import { StyleSheet, View, Text, TouchableWithoutFeedback, PanResponder } from 'react-native';

const SCREEN_WIDTH = 300;
const SCREEN_HEIGHT = 500;
const MIN_SIZE = 30;

function clamp(val, min, max) {
  'worklet';
  return Math.min(Math.max(val, min), max);
}
function getAngle(cx, cy, x, y) {
  'worklet';
  return Math.atan2(y - cy, x - cx);
}

export default function ButtonHandler({ onDelete, onEdit, onTapped, text }) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);
  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);
  const initialAngle = useSharedValue(0);

  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const initialDistance = useSharedValue(0);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);

  const boxRef = useAnimatedRef();

  const panControl = useSharedValue(true)
  const [mirror, setMirror] = useState(false)
  // const text = {
  //         text: "Morning",
  //         id: Date.now(),
  //         tapped : true
  //       }

  const [size, setSize] = useState({ width: 200, height: 100 });

  // const [userResized, setUserResized] = useState(false);
  // const initialSizeRef = useRef(null);

  // const onBoxLayout = (event) => {
  //   if (!userResized) {
  //     const { width, height } = event.nativeEvent.layout;
  //     setSize({ width, height });
  //     initialSizeRef.current = { width, height };
  //   }
  // };
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      'worklet';
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      'worklet';
      if (!panControl.value) return;
      // const maxTranslateX = 350 / 2 - 50;
      // const maxTranslateY = 500 / 2 - 50;

      translationX.value = prevTranslationX.value + event.translationX
      translationY.value = prevTranslationY.value + event.translationY
    });

  const rotateHandle = Gesture.Pan()
    .simultaneousWithExternalGesture(pan)
    .onStart((event) => {
      'worklet';
      panControl.value = false;
      const layout = measure(boxRef);
      if (!layout) return;

      originX.value = layout.pageX + layout.width / 2;
      originY.value = layout.pageY + layout.height / 2;

      startAngle.value = angle.value;
      initialAngle.value = getAngle(originX.value, originY.value, event.absoluteX, event.absoluteY);
    })
    .onUpdate((event) => {
      'worklet';
      const currentAngle = getAngle(originX.value, originY.value, event.absoluteX, event.absoluteY);
      const angleDelta = currentAngle - initialAngle.value;

      angle.value = startAngle.value + angleDelta;
    }).onEnd(() => {
      'worklet';
      panControl.value = true;
    });

  const scaleHandle = Gesture.Pan()
    .simultaneousWithExternalGesture(pan)
    .onStart((event) => {
      'worklet';
      panControl.value = false;
      const layout = measure(boxRef);
      if (!layout) return;

      originX.value = layout.pageX + layout.width / 2;
      originY.value = layout.pageY + layout.height / 2;
      // console.log("right bottom",layout.pageX + layout.width,layout.pageY + layout.height)
      const dx = event.absoluteX - originX.value;
      const dy = event.absoluteY - originY.value;
      const dist = Math.sqrt(dx * dx + dy * dy);

      initialDistance.value = dist / scale.value;
    })
    .onUpdate((event) => {
      'worklet';
      const layout = measure(boxRef);
      // if((layout.pageX + layout.width) > 340) return
      // console.log("event", event.absoluteX, event.absoluteY)
      const dx = event.absoluteX - originX.value;
      const dy = event.absoluteY - originY.value;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const newScale = dist / initialDistance.value;

      const scaledWidth = layout.width * newScale;
      const projectedRightEdge = originX.value + scaledWidth / 2;
      if (projectedRightEdge > 340) return;

      scale.value = clamp(newScale, 0.1, 3);
    }).onEnd(() => {
      'worklet';
      panControl.value = true;
    });

  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { rotateZ: `${angle.value}rad` },
      { scale: scale.value },
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    fontSize: 30 * scale.value,
  }));


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

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      angle.value = 0
      scale.value = 1
      translationX.value = 0
      translationY.value = 0
    });

  const rotation = Gesture.Rotation()
    .onStart(() => {
      panControl.value = false;
      startAngle.value = angle.value;
    })
    .onUpdate((event) => {
      angle.value = startAngle.value + event.rotation;
    }).onEnd(() => {
      // 'worklet';
      panControl.value = true;
    });

  // const Handler = Gesture.Simultaneous(pinch, pan, rotation)
  const Handler = Gesture.Exclusive(
    doubleTap,
    Gesture.Simultaneous(rotation, pan)
  );
  const ButtonHandling = Gesture.Simultaneous(rotateHandle)

function getDynamicFontSize() {
  const baseWidth = 280;
  const baseHeight = 150;
  const baseFontSizeShort = 38; // for short text
  const baseFontSizeLong = 28;  // for long text

  const shortText = text.text.length < 15;
  const longText = !shortText;

  //   if (size.width < 250 && size.height > 70 && shortText) {
  //   // Scale 38 based on width, capped between 20 and 42
  //   return Math.max(20, Math.min(42, (size.width / baseWidth) * baseFontSizeShort));
  // }

  // if (size.width < baseWidth && size.height > 70 && shortText) {
  //   // Scale 38 based on width, capped between 20 and 42
  //   return Math.max(20, Math.min(42, (size.width / baseWidth) * baseFontSizeShort));
  // }

  // if (size.height < baseHeight && size.width > baseWidth && longText) {
  //   // Scale 28 based on height, capped between 16 and 32
  //   return Math.max(16, Math.min(32, (size.height / baseHeight) * baseFontSizeLong));
  // }

  // General fallback
  return Math.max(
    6,
    (Math.min(size.width, size.height) / 100) * 18
  );
}


const dynamicFontSize = getDynamicFontSize()

  // console.log("font", dynamicFontSize, text.text.length, size.width,size.height)


  // const dynamicFontSize = size && initialSizeRef.current
  //   ? Math.max(
  //     12,
  //     Math.min(
  //       (size.width / initialSizeRef.current.width) * 26,
  //       (size.height / initialSizeRef.current.height) * 26
  //     )
  //   )
  //   : 26;

  // size && initialSizeRef.current && console.log("font", dynamicFontSize, size.width / initialSizeRef.current.width, initialSizeRef.current.width)
  // 🔁 Always keep the latest size in a ref to avoid closure issues
  const latestSizeRef = useRef(size);

  // Update the ref whenever size changes
  useEffect(() => {
    latestSizeRef.current = size;
  }, [size]);

  const gestureStartSize = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        gestureStartSize.current = { ...latestSizeRef.current };
      },

      onPanResponderMove: (_, gestureState) => {
        // const dx = gestureState.dx;
        // const dy = gestureState.dy;  // 🧠 Get top-left position
        let newWidth = gestureStartSize.current.width + gestureState.dx;
        let newHeight = gestureStartSize.current.height + gestureState.dy;


        // if (!(gestureState.moveX < width - 10)) newWidth = latestSizeRef.current.width
        newWidth = Math.max(MIN_SIZE, newWidth);
        newHeight = Math.max(MIN_SIZE, newHeight);

        setSize({ width: newWidth, height: newHeight });
      },
    })
  ).current;


  return (
    // <GestureHandlerRootView style={styles.container}>
    <GestureDetector gesture={Handler}>
      <Animated.View ref={boxRef} style={[
        boxStyle, {
          position: 'absolute',
          borderWidth: text.tapped ? 1 : 1,
          borderColor: text.tapped ? 'white' : 'transparent',
          zIndex: text.tapped ? 1 : 0
        }]}>
        {/* <View style={styles.box}> */}
        {
          text.tapped ?
            <TouchableWithoutFeedback onPress={() => onTapped(text)}>
              <View
                // onLayout={onBoxLayout}
                style={[{
                  // flex: 1,
                  // alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderColor: 'black',
                  // borderWidth: 2,
                  // padding: 5,
                  backgroundColor: 'green',
                  // position: 'relative',
                  width: size?.width,
                  height: size?.height,
                }]}>
                <Text style={{
                  fontSize: dynamicFontSize,
                  textAlign: 'center',
                  // flexWrap: 'wrap',
                  // padding: 4,
                  // width: '100%',
                }}
                // numberOfLines={0}
                >
                  {text.text}
                </Text>
                <View
                  {...panResponder.panHandlers}
                  style={[styles.iconBox, {
                    bottom: 0,
                    zIndex: 5,
                    right: 0,
                  }]}
                >
                  <Text>⤡</Text>
                </View>
                <View
                  style={[styles.iconBox, {
                    zIndex: 4,
                    top: 0,
                    right: 0,
                  }]}
                >
                  <GestureDetector gesture={ButtonHandling}>
                    <Animated.View>
                      <Text>⟳</Text>
                    </Animated.View>
                  </GestureDetector>
                </View>
                <View
                  style={[styles.iconBox, {
                    top: 0,
                    zIndex: 3,
                    left: 0,
                  }]}
                >
                  <Text onPress={() => onDelete(text)} >🅧</Text>

                </View>
                <View
                  style={[styles.iconBox, {
                    bottom: 0,
                    zIndex: 2,
                    left: 0,
                  }]}
                >
                  <Text onPress={() => onEdit(text)}>✏️</Text>

                </View>
              </View>
            </TouchableWithoutFeedback>
            :
            <TouchableWithoutFeedback onPress={() => onTapped(text)} >
              <View
                // onLayout={onBoxLayout}
                style={[{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // borderColor: 'black',
                  // borderWidth: 2,
                  // padding: 5,
                  backgroundColor: 'green',
                  // position: 'relative',
                  width: size?.width,
                  height: size?.height,
                }]}>
                <Text style={{
                  fontSize: dynamicFontSize,
                  textAlign: 'center',
                  // flexWrap: 'wrap',
                  // padding: 4,
                  // width: '100%',
                }}
                // numberOfLines={0}
                >
                  {text.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
        }
        {/* </View> */}
      </Animated.View>
    </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: '#CCCCFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    width: 30,
    position: 'absolute',
  },
});
