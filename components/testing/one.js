import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const ShadowPropSlider = ({ label, value, ...props }) => {
  return (
    <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }}>
      <Slider style={{
    flex: 1
  }} step={1} value={value} {...props} />
      <Text style={{
        width:30,
    marginLeft: 10
  }}>{value}</Text>
    </View>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  // const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
      <View style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: shadowOffsetWidth,
              },
              shadowOpacity: 1,
              // shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            // label="shadowOffset - X"
            minimumValue={0}
            maximumValue={100}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          {/* <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          /> */}
          {/* <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          /> */}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    // paddingHorizontal: 12,
  },
});

export default App;