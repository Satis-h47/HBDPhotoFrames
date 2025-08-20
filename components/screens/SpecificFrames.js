import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Animated, TouchableOpacity } from 'react-native';
import FramesList from '../pattern/FramesList';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '../header/ScreenHeader';
import useScrollToTopButton from '../useScrollToTopButton';

export default function SpecificFrames({ navigation, route }) {
  const {t} = useTranslation();
  const { frames, key } = route.params;

  const headings = {
    single: t('specificFrScreen.single'),
    double: t('specificFrScreen.double'),
    default: t('specificFrScreen.default'),
  };

  const heading = headings[key] || headings.default;

    const { scrollRef, fadeAnim, isVisible, handleScroll, scrollToTop } = useScrollToTopButton();


  return (
    <SafeAreaView>
      <ScreenHeader 
backPress={()=>navigation.goBack()}
title={heading}
  />
      <ScrollView         ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
       >
      <FramesList allFrames={frames} navigation={navigation} />
      </ScrollView>
                {isVisible && (
                  <Animated.View style={[styles.scrollTopButton, { opacity: fadeAnim }]}>
                    <TouchableOpacity onPress={scrollToTop}>
                      <Text style={styles.buttonText}>Top ↑</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
    scrollTopButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
