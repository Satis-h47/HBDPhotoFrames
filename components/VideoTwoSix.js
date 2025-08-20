import React, { useState, useEffect, useRef } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';

// Constants for minimum and maximum font size
const MIN_SIZE = 50;
const MAX_FONT_SIZE = 90;
const MIN_FONT_SIZE = 10;

// AutoResizeText component
const AutoResizeText = ({
  children,
  containerWidth = 200,
  containerHeight = 100,
  style = {},
}) => {
  const [fontSize, setFontSize] = useState(MAX_FONT_SIZE);
  const isSingleLine = children.length < 10; // Decide if it should be single line

  // Function to calculate the optimal font size
  const calculateFontSize = (containerWidth, containerHeight) => {
    let calculatedFontSize = MAX_FONT_SIZE;

    while (calculatedFontSize >= MIN_FONT_SIZE) {
      const textWidth = getTextWidth(children, calculatedFontSize);
      const textHeight = getTextHeight(children, calculatedFontSize);

      // If the text fits within the container, stop adjusting
      if (textWidth <= containerWidth && textHeight <= containerHeight) {
        break;
      }

      // Reduce the font size by precision
      calculatedFontSize -= 1;  // Can adjust precision here
    }

    return Math.max(calculatedFontSize, MIN_FONT_SIZE);  // Make sure font size doesn't go below minimum
  };

  // Helper function to calculate the width of the text based on font size
  const getTextWidth = (text, fontSize) => {
    const avgCharWidth = fontSize * 0.1;  // Approximate character width
    return text.length * avgCharWidth;
  };

  // Helper function to calculate the height of the text based on font size and line count
  const getTextHeight = (text, fontSize) => {
    const lineHeight = fontSize * 1.1;  // Line height assumed to be 1.2 times font size
    const numLines = Math.ceil(text.length / Math.floor(containerWidth / fontSize));  // Dynamic line count based on container width
    return lineHeight * numLines;
  };

  useEffect(() => {
    // Recalculate the font size when container size or text changes
    const optimalFontSize = calculateFontSize(containerWidth, containerHeight);
    // console.log("sie", optimalFontSize)
    setFontSize(optimalFontSize);
  }, [containerWidth, containerHeight, children]);

  return (
    <View
      style={[styles.container, { width: containerWidth, height: containerHeight }, style]}
    >
      <Text
        style={[styles.text, { fontSize }]}
        // numberOfLines={isSingleLine ? 1 : 2}  // 1 line if short text, 2 lines if longer (for initial render)
        ellipsizeMode="tail"
      >
        {children}
      </Text>
    </View>
  );
};

// ResizableTextContainer component (with PanResponder for dragging)
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

        // Ensure the size doesn't go below the minimum size
        newWidth = Math.max(MIN_SIZE, newWidth);
        newHeight = Math.max(MIN_SIZE, newHeight);

        // Update the size state
        setSize({ width: newWidth, height: newHeight });
        latestSizeRef.current = { width: newWidth, height: newHeight };
      },
    })
  ).current;

  return (
    texts.map((text, index) => (
    <View
      style={[styles.resizableContainer, { width: size.width, height: size.height }]}
      {...panResponder.panHandlers}
    >
        <AutoResizeText
          key={index}
          containerWidth={size.width}
          containerHeight={size.height}
        >
          {text}
        </AutoResizeText>
     
    </View>
    ))
  );
};

// Styles for the components
const styles = StyleSheet.create({
  resizableContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
    backgroundColor: '#d3d3d3', // Optional background for visibility
    borderWidth: 1,  // Optional border for visibility
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default function App() {
  const sampleTexts = [
    'Happy Birthday',
  ];

  return (
    <View style={styles.appContainer}>
      <ResizableTextContainer texts={sampleTexts} />
    </View>
  );
}
