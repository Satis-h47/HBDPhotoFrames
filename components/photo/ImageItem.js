import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const ImageItem = ({ uri, height }) => {
  const [width, setWidth] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!uri) return;

    Image.getSize(
      uri,
      (imgWidth, imgHeight) => {
        const aspectWidth = (imgWidth / imgHeight) * height;
        setWidth(aspectWidth);
      },
      (err) => {
        console.error('Failed to get image size:', err);
        setError(true);
        setLoading(false);
      }
    );
  }, [uri]);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load..</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri }}
        style={[styles.image, { width, height ,backgroundColor:'white' }]}
        resizeMode="contain"
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor:'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    height: 150,
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  errorContainer: {
    height: 150,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  errorText: {
    color: '#888',
  },
});

export default ImageItem;
