import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
// import { withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

// const BOX_SIZE = 120;
// const MARGIN = 50; // Allow slight overdrag
// const MAX_X = width / 2 - BOX_SIZE / 2;
// const MAX_Y = height / 2 - BOX_SIZE / 2;


function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export default function Rotation({ text, onDelete, onEdit, onTapped }) {
  // console.log("Rotationscreen", text)

  // const [tapped, setTapped ] = useState(false)
  const [mirror,setMirror] = useState(false)
  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);

  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  // const blockPan = useSharedValue(false);
  // const translationX = useSharedValue(0);
  // const translationY = useSharedValue(0);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const showBorder = useSharedValue(false);


  // translationX.value = withSpring(clamp(translationX.value, -MAX_X, MAX_X));

  // const pan = Gesture.Pan()
  // .minDistance(1)
  // .onStart(() => {
  //   prevTranslationX.value = translationX.value;
  //   prevTranslationY.value = translationY.value;
  // })
  // .onUpdate((event) => {
  //   const rawX = prevTranslationX.value + event.translationX;
  //   const rawY = prevTranslationY.value + event.translationY;

  //   translationX.value = clamp(rawX, -MAX_X - MARGIN, MAX_X + MARGIN);
  //   translationY.value = clamp(rawY, -MAX_Y - MARGIN, MAX_Y + MARGIN);
  // })
  // .onEnd(() => {
  //   // Animate snap back if out of bounds
  //   translationX.value = withTiming(
  //     clamp(translationX.value, -MAX_X, MAX_X),
  //     { duration: 300 }
  //   );
  //   translationY.value = withTiming(
  //     clamp(translationY.value, -MAX_Y, MAX_Y),
  //     { duration: 300 }
  //   );
  // })
  //   .runOnJS(true);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = 500 / 2;

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
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      angle.value = withTiming(0);
      scale.value = withTiming(1);
      translationX.value = withTiming(0);
      translationY.value = withTiming(0);
    });

  const singleTap = Gesture.Tap()
  .numberOfTaps(1)
  .maxDelay(250) // optional, to help distinguish from double-tap
  .onEnd(() => {
  showBorder.value = withTiming(showBorder.value ? 0 : 1);
  // setTapped( true)
  // console.log("hii")
  });

  // const panGesture = Gesture.Pan()
  //   .averageTouches(true)
  //   .onChange((e) => {
  //     if (blockPan.value) {
  //       return;
  //     }

  //     translationX.value += e.changeX;
  //     translationY.value += e.changeY;
  //   });   

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100)
      );
    })
    .runOnJS(true);

  const rotation = Gesture.Rotation()
    .onStart(() => {
      startAngle.value = angle.value;
    })
    .onUpdate((event) => {
      angle.value = startAngle.value + event.rotation;
    });
    // console.log("intial", tapped)
  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { rotate: `${angle.value}rad` },
      { scale: scale.value },
    ],
  // borderWidth: showBorder.value ? 1 : 0,
  // borderColor: 'black', // or any color you prefer
  // backgroundColor: showBorder.value ? 'white' : '#b58df1'
  }));


  const gesture = Gesture.Exclusive(
    doubleTap,
    // singleTap,
    Gesture.Simultaneous(rotation, pinch, pan)
  );
// function TappedBox(){
//   setTapped(!tapped)
// }
  return (
    // <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, boxAnimatedStyles, {borderWidth: text.tapped ? 1 : 0 ,borderColor: text.tapped ? 'white' : 'transparent', zIndex: text.tapped ? 1 : 0}]}>
        <View style={styles.box}>
          {
            text.tapped ?  
          <TouchableOpacity onPress={() => onTapped(text)} style={{flex:1,display:'flex',alignContent:'space-between'}}>
          <View style={{height:20,top:-10, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Text onPress={() => onDelete(text)} style={{left:-10, borderColor:'white', borderWidth:1,borderRadius:5}}>Dlt</Text>
            <Text onPress={() => onEdit(text)} style={{left:10,  borderColor:'white', borderWidth:1,borderRadius:5}}>Edit</Text>
          </View>
          <View style={{flex:1,display:'flex', flexDirection:'row', justifyContent:'center', marginHorizontal:40, marginVertical:15}}>
          <Text style={{transform:[{scaleX: mirror ? -1 : 1}]}}>{text.text}</Text>
          </View>
          <View style={{height:20,bottom:-10, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Text onPress={() => setMirror(!mirror)} style={{left:-10}}>Mir</Text>
              <Text style={{left:10}}>Crop</Text>
          </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => onTapped(text)} style={{flex:1,display:'flex',alignContent:'space-between'}}>
          <View style={{height:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

          </View>
          <View style={{flex:1,display:'flex', flexDirection:'row', justifyContent:'center', marginHorizontal:40, marginVertical:15}}>
          <Text style={{transform:[{scaleX: mirror ? -1 : 1}]}}>{text.text}</Text>
          </View>
          <View style={{height:20, display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>

          </View>
          </TouchableOpacity>
          }
          {/* <TouchableOpacity onPress={TappedBox} style={{flex:1,display:'flex',alignContent:'space-between',backgroundColor:'yellow'}}>
          <View style={{flex:1,display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Text>Dlt</Text>
            <Text>Edit</Text>
          </View>
          <View style={{flex:1,display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <Text>{text}</Text>
          </View>
          <View style={{flex:1,display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
              <Text>Crop</Text>
          </View>
          </TouchableOpacity> */}
      </View>
        </Animated.View>
      </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 200,
    // height: 100,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor:'white',
    borderWidth:1,
    borderRadius:2,
    // backgroundColor:'green',
    position:'absolute'
  },
  box: {
    // width: 200,
    // height: 100,
    // borderRadius: 3,
    // padding: 5,
    // marginHorizontal:40,
    // marginVertical:15,
    // paddingHorizontal:10,
    // paddingVertical:5,
    // backgroundColor: '#b58df1',
    // position:'absolute',
    //  top: 20, 
    // left: 20,
    // marginBottom:20,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
