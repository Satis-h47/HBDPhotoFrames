// GradientText.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = ({ text, style, colors = ['red', 'green'] }) => {
  return (
    <MaskedView
      maskElement={
        <View style={styles.center}>
          <Text style={[style, styles.maskedText]}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedText: {
    color: 'black',
  },
  gradient: {
    flex: 1,
  },
});

export default GradientText;
