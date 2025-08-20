import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    PanResponder,
    Dimensions
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SCREEN_WIDTH = 300;
const SCREEN_HEIGHT = 500;
const MIN_SIZE = 50;
const {width, height}  = Dimensions.get('screen');
export default function ResizePan() {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);

    const panControl = useSharedValue(true)

    const [size, setSize] = useState({ width: 100, height: 100 });

    const latestSizeRef = useRef(size);

    useEffect(() => {
        latestSizeRef.current = size;
    }, [size]);

    const gestureStartSize = useRef({ width: 100, height: 100 });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                gestureStartSize.current = { ...latestSizeRef.current };
                panControl.value = false;
            },

            onPanResponderMove: (_, gestureState) => {
                // console.log(gestureState.moveX,gestureState.moveY, width,height)
                if(gestureState.moveX > 300 || gestureState.moveY > 500) return
                const dx = gestureState.dx;
                const dy = gestureState.dy;

                let newWidth = gestureStartSize.current.width + dx;
                let newHeight = gestureStartSize.current.height + dy;

                setSize({ width: newWidth, height: newHeight });
            },
            onPanResponderRelease: () => {
                panControl.value = true;
            },
        })
    ).current;



    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
            { rotate: `${angle.value}rad` },
        ],
    }));

    const positionRef = useRef({ x: 0, y: 0 });

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            if (!panControl.value) return;

            const clampedX = prevTranslationX.value + event.translationX
            const clampedY = prevTranslationY.value + event.translationY

            translationX.value = clampedX;
            translationY.value = clampedY;
        })
        .runOnJS(true)

    const rotation = Gesture.Rotation()
    .onStart(() => {
      panControl.value = false;
      startAngle.value = angle.value;
    })
    .onUpdate((event) => {
      angle.value = startAngle.value + event.rotation;
    }).onEnd(() => {
  panControl.value = true;
  prevTranslationX.value = translationX.value;
  prevTranslationY.value = translationY.value;
});


    const gestureHandle = Gesture.Simultaneous(pan, rotation)
    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={gestureHandle}>
                <Animated.View
                    style={[
                        styles.square,
                        animatedStyles,
                        { width: size.width, height: size.height },
                    ]}
                >
                    <View
                        {...panResponder.panHandlers}
                        style={styles.resizer}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
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
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
});
