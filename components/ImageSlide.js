import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width, height } = Dimensions.get('window');

const ImageSlide = ({  }) => {
      const images = [
    'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
    'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
    'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
    'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
    'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
    'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
        )}
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{`${currentIndex + 1} / ${images.length}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height: 500,
  },
  counterContainer: {
    height: 64,
    backgroundColor: '#00000077',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 17,
    color: '#FFF',
  },
});

export default ImageSlide;
