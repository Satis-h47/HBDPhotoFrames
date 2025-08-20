import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    PanResponder,
    Dimensions, Text,
    TouchableWithoutFeedback
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

export default function Resize() {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const [size, setSize] = useState(null);

    const [userResized, setUserResized] = useState(false);

    // When the box is laid out naturally (wrap content), save size if not resized yet
    const onBoxLayout = (event) => {
        if (!userResized) {
            const { width, height } = event.nativeEvent.layout;
            setSize({ width, height });
        }
    };
    const dynamicFontSize = size
        ? Math.max(6, Math.min(size.width / 5, size.height / 5))
        : 26;

    // console.log("font", size, dynamicFontSize)
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
        // <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={pan}>
            <Animated.View style={boxStyle}
            // onLayout={onBoxLayout}
            // style={[boxStyle, {
            //     alignSelf: 'center',
            //     justifyContent: 'center',
            //     // borderColor: 'black',
            //     // borderWidth: 2,
            //     // padding: 5,
            //     backgroundColor: 'green',
            //     position: 'relative',
            //     width: size?.width,
            //     height: size?.height,
            // }]}
            >
                <TouchableWithoutFeedback>
                    <View
                        onLayout={onBoxLayout}
                        style={[{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderColor: 'black',
                            borderWidth: 2,
                            // padding: 5,
                            backgroundColor: 'green',
                            position: 'relative',
                            width: size?.width,
                            height: size?.height,
                        }]}>
                        <Text style={{
                            fontSize: dynamicFontSize, backgroundColor: 'yellow', textAlign: 'center',
                            flexWrap: 'wrap',
                            // padding: 4,
                            width: '100%',
                        }}
                        // numberOfLines={0}
                        >
                            Happy Birthday Satish bhai God b
                        </Text>
                        <View
                            {...panResponder.panHandlers}
                            style={{
                                backgroundColor: 'red',
                                height: 20,
                                width: 20,
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                        </View>
                        <View
                            style={{
                                backgroundColor: 'red',
                                height: 20,
                                width: 20,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}
                        ></View>
                        <View
                            style={{
                                backgroundColor: 'red',
                                height: 20,
                                width: 20,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        ></View>
                        <View
                            style={{
                                backgroundColor: 'red',
                                height: 20,
                                width: 20,
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                            }}
                        ></View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </GestureDetector>
        // </GestureHandlerRootView>
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
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
    textContainer: {
        backgroundColor: 'skyblue',
        //   padding: 10,
        //   justifyContent: 'flex-end',
        //   alignItems: 'flex-end',
        top: 0,
        left: 0,
    },

    text: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        flexWrap: 'wrap', // Ensures text wraps when resized
        //   alignSelf: 'center', // Prevents it from clumping in the corner
    },

});
