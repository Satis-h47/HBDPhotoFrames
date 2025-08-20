import React, { useState } from 'react';
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
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

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
      fontSize: 20 * scale.value,
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

  return (
    // <GestureHandlerRootView style={styles.container}>
    <GestureDetector gesture={Handler}>
      <Animated.View ref={boxRef} style={[styles.container, boxStyle, { borderWidth: text.tapped ? 1 : 1, borderColor: text.tapped ? 'white' : 'transparent', zIndex: text.tapped ? 1 : 0 }]}>
        <View style={styles.box}>
          {
            text.tapped ?
              <TouchableWithoutFeedback onPress={() => onTapped(text)} >
                <View style={{ flex: 1, display: 'flex', alignContent: 'space-between' }}>
                  <View style={{ height: 20, top: -10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text onPress={() => onDelete(text)} style={{ left: -10, borderColor: 'white', borderWidth: 1, borderRadius: 5 }}>Dlt</Text>
                    <View style={{ left: 10 }}>
                      <GestureDetector gesture={ButtonHandling}>
                        <Animated.View style={styles.insidebox}>
                          <Text>⤢</Text>
                        </Animated.View>
                      </GestureDetector>
                    </View>                  
                    </View>
                  <View style={{marginHorizontal: 10, marginVertical: 0 }}>
                    <Animated.Text style={[{ transform: [{ scaleX: mirror ? -1 : 1 }] }, textAnimatedStyle, styles.text]}>{text.text}</Animated.Text>
                    {/* <View style={{borderTopWidth:1,borderTopColor:'yellow',width:500,position:'absolute'}}></View> */}
                  </View>
                  <View style={{ height: 20, bottom: -10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text onPress={() => setMirror(!mirror)} style={{ left: -10 }}>Mir</Text>
                    <View style={{ left: 10 }}>
                      {/* <GestureDetector gesture={ButtonHandling}>
                        <Animated.View style={styles.insidebox}>
                          <Text>⤢</Text>
                        </Animated.View>
                      </GestureDetector> */}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              :
              <TouchableWithoutFeedback onPress={() => onTapped(text)} >
                <View style={{ flex: 1, display: 'flex', alignContent: 'space-between' }}>
                  <View style={{ height: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                  </View>
                  <View style={{marginHorizontal: 10, marginVertical: 0 }}>
                    <Animated.Text style={[{  transform: [{ scaleX: mirror ? -1 : 1 }] }, textAnimatedStyle, styles.text]}>{text.text}</Animated.Text>
                  </View>
                  <View style={{ height: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  </View>
                </View>
              </TouchableWithoutFeedback>
          }
        </View>
      </Animated.View>
    </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 350,
    // height: 500,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
    position: 'absolute'
  },
  box: {
    // width: 100,
    // height: 100,
    // backgroundColor: '#b58df1',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  insidebox: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    // backgroundColor:'black',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
