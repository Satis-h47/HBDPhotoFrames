import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Image as RNImage, ActivityIndicator } from 'react-native';

export default function FrameBase({ imageUri, width, height }) {
  const [imageDims, setImageDims] = useState({width: 0, height: 0});
// console.log(imageDims, "original", width,height)
  useEffect(() => {
    if (!imageUri) return;

    RNImage.getSize(
      imageUri,
      (originalWidth, originalHeight) => {
        // let finalWidth, finalHeight;
         const imageAspect = originalWidth / originalHeight;
            const containerAspect = width / height;

    let scale;
    if (imageAspect > containerAspect) {
        scale = height / originalHeight;
    } else {
        scale = width / originalWidth;
    }
// console.log("of imge",originalWidth,originalHeight)
        //   finalWidth = (originalWidth / originalHeight) * height;
        //   finalHeight = height;
        // if (originalWidth < originalHeight ){ 
        //   finalHeight = (originalHeight / originalWidth) * width;
        //   finalWidth = width;
        // } 

       let finalWidth = originalWidth*scale
        let finalHeight = originalHeight*scale

        setImageDims({ width: finalWidth, height: finalHeight });
      },
      (error) => {
        console.warn('Failed to get image size:', error);
      }
    );
  }, [imageUri,width, height]);

  return (
    <Image
      source={{ uri: imageUri }}
      style={{
        width: imageDims.width,
        height: imageDims.height,
        resizeMode: 'contain',
      }}
    />
  );
}
