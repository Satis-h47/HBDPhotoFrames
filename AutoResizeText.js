import MaskedView from '@react-native-masked-view/masked-view';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MAX_FONT_SIZE = 90;
const MIN_FONT_SIZE = 6;

const AutoResizeText = ({
  children,
  containerWidth,
  containerHeight,
  color,
  backgroundColor,
  shadowColor,
  colorOpacity,
  backgroundColorOpacity,
  shadowOffset,
  font,
  rotatedX,
  rotatedY,
  style = {},
}) => {
  // console.log("aurotfdvd", font)
  const [fontSize, setFontSize] = useState(1);

  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const rotateXAnim = useRef(new Animated.Value(0)).current;

  // const [color, setColor] = useState('white')
  // const [backgroundColor, setBackgroundColor] = useState('transparent')
  // console.log("initial", fontSize)

  const calculateFontSize = (containerWidth, containerHeight) => {
    let calculatedFontSize = MAX_FONT_SIZE;

    while (calculatedFontSize >= MIN_FONT_SIZE) {
      const textWidth = getTextWidth(children, calculatedFontSize);
      const textHeight = getTextHeight(children, calculatedFontSize);

      if (textWidth <= containerWidth && textHeight <= containerHeight) {
        break;
      }

      calculatedFontSize -= 1;
    }

    return Math.max(calculatedFontSize, MIN_FONT_SIZE);
  };

  const getTextWidth = (text, fontSize) => {
    const avgCharWidth = fontSize * 0.1;
    return text.length * avgCharWidth;
  };

  const getTextHeight = (text, fontSize) => {
    const lineHeight = fontSize * 1.1;
    const numLines = Math.ceil(text.length / Math.floor(containerWidth / fontSize));
    return lineHeight * numLines;
  };

  useEffect(() => {
    const optimalFontSize = calculateFontSize(containerWidth, containerHeight);
    // console.log("sie", optimalFontSize)
    setFontSize(optimalFontSize);
  }, [containerWidth, containerHeight, children]);

  useEffect(() => {
    rotateXAnim.setValue(rotatedX);
  }, [rotatedX]);

  useEffect(() => {
    rotateYAnim.setValue(rotatedY);
  }, [rotatedY]);

  const rotateY = rotateYAnim.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-180deg', '0deg', '180deg']
  });
  const rotateX = rotateXAnim.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-180deg', '0deg', '180deg']
  });
  const fonts ={
  "font_abc_1": "font_abc_1",
  "font_abc_2": "font_abc_2",
  "font_abc_3": "font_abc_3",
  "font_abc_4": "font_abc_4",
  "font_abc_5": "font_abc_5",
  "font_abc_6": "font_abc_6",
  "font_abc_8": "font_abc_8",
  "mfstillkindaridiculous": "mfstillkindaridiculous",
  "ahundredmiles": "ahundredmiles",
  "binz": "binz",
  "blunt": "blunt",
  "freeuniversalbold": "freeuniversalbold",
  "gtw": "gtw",
  "handtest": "handtest",
  "jester": "jester",
  "semplicita_light": "semplicita_light",
  "oldfolksshuffle": "oldfolksshuffle",
  "vinque": "vinque",
  "primalream": "primalream",
  "junctions": "junctions",
  "laine": "laine",
  "notcouriersans": "notcouriersans",
  "ospdin": "ospdin",
  "otfpoc": "otfpoc",
  "sofiaregular": "sofiaregular",
  "quicksandregular": "quicksandregular",
  "robotothin": "robotothin",
  "romanantique": "romanantique",
  "serreriasobria": "serreriasobria",
  "stratolinked": "stratolinked",
  "pacifico": "pacifico",
  "windsong": "windsong",
  "digiclock": "digiclock"
}

  // console.log(backgroundColor[1] ? "yes" : 'no')
  return (
    <View
      style={[styles.container, { width: containerWidth, height: containerHeight }, style]}
    >
      {/* {backgroundColor.length == 1 ?
        <View style={{ width: '100%', height: '100%', backgroundColor: backgroundColor[0], position: 'absolute', opacity: backgroundColorOpacity }}></View>
        : */}
        <LinearGradient style={{ width: '100%', height: '100%', position: 'absolute', opacity: backgroundColorOpacity }}
          colors={[backgroundColor[0],backgroundColor[1] ? backgroundColor[1] : backgroundColor[0]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
        </LinearGradient>
      {/* } */}
      {/* <Text
        style={[styles.text, { fontSize, position:'absolute', left:1,color:'white'}]}
      >
        {children}
      </Text> */}
      {color.length == 1 ?
        <Animated.Text
          style={[styles.text, {
            fontSize, color: color[0], opacity: colorOpacity, fontFamily: font,
            shadowOffset: {
              width: shadowOffset / 10,
              height: shadowOffset / 10,
            },
            shadowOpacity: 1,
            shadowColor,
            transform: [
              { perspective: 1000 },
              { rotateX: rotateX },
              { rotateY: rotateY },
            ]
          }]}
        >
          {children}
        </Animated.Text>
        :
        <MaskedView style={{ flex: 1 }}
          maskElement={
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Animated.Text style={[styles.text, {
                fontSize, color, opacity: colorOpacity, fontFamily: font, transform: [
                  { perspective: 1000 },
                  { rotateY: rotateY },
                  { rotateX: rotateX }
                ]
              }]}>
                {children}
              </Animated.Text>
            </View>
          }
        >
          <LinearGradient style={{ flex: 1 }}
            colors={[color[0], color[1]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
          </LinearGradient>
        </MaskedView>
      }
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
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default React.memo(AutoResizeText)