import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, Pressable } from 'react-native';
import FrameBase from './frame/FrameBase';
import CheckIcon from '../assets/svg/CheckIcon';

const screenWidth = Dimensions.get('window').width - 20;
const columnWidth = screenWidth / 2;

// const images = [
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/square/2.png', width: 300, height: 200 }, // portrait
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/square/8.png', width: 400, height: 400 }, // square
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/landscape/6.png', width: 800, height: 600 }, // landscape
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/portrait/2.png', width: 300, height: 200 }, // portrait
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/square/8.png', width: 400, height: 400 }, // square
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/landscape/6.png', width: 800, height: 600 }, // landscape
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/portrait/2.png', width: 300, height: 200 }, // portrait
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/square/8.png', width: 400, height: 400 }, // square
//   { uri: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/landscape/6.png', width: 800, height: 600 }, // landscape
// ];

const MasonryLayout = ({onPress,images,select, longPress}) => {
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);

  useEffect(() => {
    const left = [];
    const right = [];
    let leftHeight = 0;
    let rightHeight = 0;
    let number = 0;

    images.forEach((img) => {
let imageHeight
        if(img.includes('square')) imageHeight = screenWidth/2
  else if(img.includes('portrait')) imageHeight = screenWidth
  else imageHeight = screenWidth/3
    //   const scaleFactor = columnWidth / img.width;
    //   const imageHeight = img.height * scaleFactor;

      const imageData = { uri:img, scaledHeight: imageHeight,id: number++ };

      if (leftHeight <= rightHeight) {
        left.push(imageData);
        leftHeight += imageHeight;
      } else {
        right.push(imageData);
        rightHeight += imageHeight;
      }
    });

    setLeftColumn(left);
    setRightColumn(right);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'row' }}>
      <View style={{ width: columnWidth,marginHorizontal:5 }}>
        {leftColumn.map((img, index) => (
            <Pressable style={{marginBottom: 10,justifyContent:'center',alignItems:'center',overflow:'hidden',borderRadius:5 }}
            onLongPress={() => longPress(img.id)} 
            onPress={() => onPress(img.id)}
            key={`left-${index}`} >
          {/* <Image
            source={{ uri: img.uri }}
            style={{ width: columnWidth, height: img.scaledHeight}}
          /> */}
          <FrameBase imageUri={img.uri} width={columnWidth} height={img.scaledHeight}/>
          { select.includes(img.id) && <View 
          style={{width: 30, height:30,backgroundColor:'grey',
          borderRadius:15,justifyContent:'center',alignItems:'center',margin:2,
          position:'absolute',top:0,left:0}}>
            <CheckIcon/>
          </View> }
          </Pressable>
        ))}
      </View>
      <View style={{ width: columnWidth,marginHorizontal:5 }}>
        {rightColumn.map((img, index) => (
            <Pressable style={{marginBottom: 10,justifyContent:'center',alignItems:'center',overflow:'hidden',borderRadius:5 }}
            onLongPress={() => longPress(img.id)}
            onPress={() => onPress(img.id)}
            key={`right-${index}`}
            >
          {/* <Image
            key={`right-${index}`}
            source={{ uri: img.uri }}
            style={{ width: columnWidth, height: img.scaledHeight, marginBottom: 10 }}
          /> */}
          <FrameBase imageUri={img.uri} width={columnWidth} height={img.scaledHeight}/>
          { select.includes(img.id) && <View 
          style={{width: 30, height:30,backgroundColor:'grey',
          borderRadius:15,justifyContent:'center',alignItems:'center',margin:2,
          position:'absolute',top:0,left:0}}>
            <CheckIcon/>
          </View> }
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default MasonryLayout;
