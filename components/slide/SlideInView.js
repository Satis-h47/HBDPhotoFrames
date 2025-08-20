import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const SlideInView = ({ children }) => {
  const slideAnim = useRef(new Animated.Value(-60)).current; // Initial position off-screen left

  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: 0, // Final position (on-screen)
        duration: 1000,
        useNativeDriver: true, // For performance
      }
    ).start();
  }, [slideAnim]);

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
      {children}
    </Animated.View>
  );
};
export default SlideInView;
// Usage:
// <SlideInView>
//   <Text>This will slide in!</Text>
// </SlideInView>