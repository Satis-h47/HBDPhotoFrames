import React, { useState, useRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import AutoResizeText from './AutoResizeText';

const ResizableTextContainer = ({ texts }) => {
  const [size, setSize] = useState({ width: 200, height: 100 });
  const gestureStartSize = useRef({ ...size });
  const latestSizeRef = useRef({ ...size });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        gestureStartSize.current = { ...latestSizeRef.current };
      },

      onPanResponderMove: (_, gestureState) => {
        let newWidth = gestureStartSize.current.width + gestureState.dx;
        let newHeight = gestureStartSize.current.height + gestureState.dy;

        newWidth = Math.max(30, newWidth);
        newHeight = Math.max(30, newHeight);

        setSize({ width: newWidth, height: newHeight });
        latestSizeRef.current = { width: newWidth, height: newHeight };
      },
    })
  ).current;

  return (
    <View
      style={[styles.resizableContainer, { width: size.width, height: size.height }]}
      {...panResponder.panHandlers}
    >
        <AutoResizeText
          containerWidth={size.width}
          containerHeight={size.height}
        >
          {texts[0]}
        </AutoResizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  resizableContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
    backgroundColor: '#d3d3d3',
    borderWidth: 1,
  },
});
export default ResizableTextContainer;
