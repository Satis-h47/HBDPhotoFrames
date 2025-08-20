import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';

// Custom hook to auto resize text
const useAutoFitText = (text, maxWidth, maxLines, minFontSize = 8, precision = 0.5) => {
  const [fontSize, setFontSize] = useState(16);
  const [lineCount, setLineCount] = useState(1);

  const updateFontSize = () => {
    let low = minFontSize;
    let high = fontSize;
    let newSize = high;

    const measureText = (size) => {
      const textWidth = measureTextWidth(text, size);
      const newLineCount = getLineCount(text, size, maxWidth);

      return { textWidth, lineCount: newLineCount };
    };

    const measureTextWidth = (text, size) => {
      const tempText = text.length === 0 ? 'A' : text;
      return (tempText.length * size) / 2; // Approximate width of the text
    };

    const getLineCount = (text, size, width) => {
      const textWidth = measureTextWidth(text, size);
      const lines = Math.ceil(textWidth / width);
      return lines;
    };

    while (high - low > precision) {
      newSize = (low + high) / 2;
      const { textWidth, lineCount } = measureText(newSize);

      if (lineCount > maxLines) {
        high = newSize;
      } else if (lineCount < maxLines) {
        low = newSize;
      } else {
        break;
      }
    }

    setFontSize(newSize);
  };

  useEffect(() => {
    updateFontSize();
  }, [text, maxWidth, maxLines, minFontSize, precision]);

  return fontSize;
};

const AutoFitText = ({
  children,
  maxLines = 1,
  minFontSize = 8,
  precision = 0.5,
  style,
  ...rest
}) => {
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const textRef = useRef(null);

  const fontSize = useAutoFitText(children, containerWidth, maxLines, minFontSize, precision);

  const onLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <Text ref={textRef} style={[{ fontSize }, styles.text]} {...rest}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default AutoFitText;
