import React, { useState, useRef, useEffect } from 'react';
import {
  View, Image, Button, Modal, Text, StyleSheet, TextInput,
  useWindowDimensions, TouchableWithoutFeedback, Alert,
  ScrollView, Pressable, TouchableOpacity, ImageBackground, Image as RNImage,
  Platform,
  ActivityIndicator,
  SafeAreaView, NativeModules
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Pinchable from 'react-native-pinchable'
import Zoom from 'react-native-zoom-reanimated';
// import { Zoom } from 'react-native-reanimated-zoom';
// import { launchImageLibrary } from 'react-native-image-picker';

import { fitContainer, ResumableZoom, useImageResolution } from 'react-native-zoom-toolkit';
// import Rotation from './components/Rotation';
import ButtonHandler from './components/ButtonHandler';
// import Slider from './components/Slider';
import ShadowPropSlider from './components/ShadowPropSlider';
import LinearGradient from 'react-native-linear-gradient';
import CustomSlider from './components/CustomSlider';
import StickersIcon from './assets/svg/StickersIcon';
import CheckIcon from './assets/svg/CheckIcon';
import EditTextIcon from './assets/svg/EditTextIcon';
import TextRotation from './assets/svg/TextRotation';
import CloseIcon from './assets/svg/CloseIcon';
import TextColorIcon from './assets/svg/TextColorIcon';
import NoneIcon from './assets/svg/NoneIcon';
import AddTextIcon from './assets/svg/AddTextIcon';
import ResetIcon from './assets/svg/ResetIcon';
import FontTextIcon from './assets/svg/FontTextIcon';
import TextCustomize from './components/text/TextCustomize';
import colors from './assets/data/colors.json';
import radiantColorPairs from './assets/data/radiantColorPairs.json';
import fonts from './assets/data/fonts.json';
import StickerCustomize from './components/stickers/StickerCustomize';
import StickerResize from './components/stickers/StickerResize';
import AddFrame from './assets/svg/AddFrame';
import ApplyFilter from './assets/svg/ApplyFilter';
import AddImage from './assets/svg/AddImage';
import FrameBase from './components/frame/FrameBase';
import AdjustPhoto from './components/photo/AdjustPhoto';
import Frames from './components/frame/Frames';

// import singleFrames from './assets/data/singleFrames.json';
// import doubleFrames from './assets/data/doubleFrames.json';

import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import HomeScreen from './components/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterCustomize from './components/filters/FilterCustomize';
import ScreenHeader from './components/header/ScreenHeader';
import { useTranslation } from 'react-i18next';

const {ImageFilterModule} = NativeModules;

const EditorScreen = ({ navigation, route }) => {
  const {t} = useTranslation();

  const headings = {
    singleFrames: t('editorScreen.headingSingle'),
    doubleFrames: t('editorScreen.headingDouble'),
    cakeFrames: t('editorScreen.headingCake'),
  };

  const forName = route.params.dataFrom.link
  let name = ''
  if(forName.includes('square')) name = 'square'
  else if(forName.includes('portrait')) name = 'portrait'
  else name = 'landscape'

  // console.log("Editorscreen")
  const inputRef = useRef(null);
  const { width, height } = useWindowDimensions();
  // const { isFetching, resolution } = useImageResolution({ imageUri });
  const [array, setArray] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [texts, setTexts] = useState([]);
  const [onetext, setOnetext] = useState('')
  // const [data, setData] = useState(null)
  const [update, setUpdate] = useState(false);
  const [ido, setIdo] = useState(null);
  const [warning, setWarning] = useState(false)

  const [tappedItem, setTappedItem] = useState('')

  const [stickersArray, setStickersArray] = useState([])
  const [showStickers, setShowStickers] = useState(false)

  const [showFrames, setShowFrames] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [zIndexCounter, setZIndexCounter] = useState(1);

  const [photoOptionShow1, setPhotoOptionShow1] = useState(false)
  const [photoOptionShow2, setPhotoOptionShow2] = useState(false)
  const [saveButton1, setSaveButton1] = useState(false)
  const [saveButton2, setSaveButton2] = useState(false)
      const [userImageOne, setUserImageOne] = useState(null)
      const [userImageOneBUp, setUserImageOneBUp] = useState(null)
      const [userImageTwo, setUserImageTwo] = useState(null)
      const [userImageTwoBUp, setUserImageTwoBUp] = useState(null)

        const [brightness, setBrightness] = useState(0.0);
  const [saturation, setSaturation] = useState(1.0);
  const [hue, setHue] = useState(0.0);

  useEffect(() => {
    console.log(0)
  const debounceTimeout = setTimeout(() => {
    const applyFilters = async () => {
      try {
        const resultPath = await ImageFilterModule.applyFilters(
          userImageOneBUp,
          saturation,
          hue,
          brightness
        );
        // console.log('Filtered image path:', resultPath);
        // setFilteredImage(resultPath);
        setUserImageOne(resultPath)
      } catch (error) {
        console.error('Filter error:', error);
      }
    };
    const applyFiltersTwo = async () => {
      try {
        const resultPath = await ImageFilterModule.applyFilters(
          userImageTwoBUp,
          saturation,
          hue,
          brightness
        );
        // console.log('Filtered image path:', resultPath);
        // setFilteredImage(resultPath);
        setUserImageTwo(resultPath)
      } catch (error) {
        console.error('Filter error:', error);
      }
    };

  if (userImageOneBUp) applyFilters();
  if (userImageTwoBUp && frameUrl.frame2) applyFiltersTwo();
  }, 300);

  return () => clearTimeout(debounceTimeout);
  }, [brightness, saturation, hue]);

  const [frames, setFrames] = useState([]);
  // console.log(frames);

  const photoRef = useRef();
  const viewShotRef = useRef(null);
  const [saveImage, setSaveImage] = React.useState(null);

  const captureImage = async () => {
    try {
      const uri = await viewShotRef.current.capture(); // e.g., file:///...
      const sourcePath = uri.replace('file://', '');
      // console.log('Captured image URI:', uri); // e.g., file:///path-to-temp-file.jpg

      // Get a permanent file path
      const fileName = `${name}_${Date.now()}.jpg`;
      const destPath =
        Platform.OS === 'android'
          ? `${RNFetchBlob.fs.dirs.PictureDir}/${fileName}`
          : `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;
      // Move the file
      await RNFetchBlob.fs.mv(sourcePath, destPath);
      // console.log('Image saved to:', destPath);

      const imagePath = 'file://' + destPath;
      // setSaveImage(imagePath);
      shiftShareScreen(imagePath);
    } catch (error) {
      console.error('Capture/save failed:', error);
    }
  };

  const [imageDims, setImageDims] = useState({
    width: 0, height: 0, left1: 0, top1: 0, fwidth1: 0, fheight1: 0
    , left2: 0, top2: 0, fwidth2: 0, fheight2: 0
  });
  // const imageUrl = 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/portrait/1.png';
  // const imageUrl = 'https://storage.googleapis.com/birthdayphotoframe/birthdaydouble/square/1.png';
  const [frameUrl, setFrameUrl] = useState(route.params.dataFrom

    //   {
    //   "link": "https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/portrait/1.png",
    //   "frame1": {
    //     "left": 109,
    //     "top": 535,
    //     "right": 131,
    //     "bottom": 169
    //   },
    //   // "frame2": {
    //   //   "left": 387,
    //   //   "top": 189,
    //   //   "right": 23,
    //   //   "bottom": 707
    //   // }
    // }
  )

        let string = ''
            if(frameUrl.link.includes('single')) string = 'singleFrames'
      else if(frameUrl.link.includes('double')) string = 'doubleFrames'
      else string = 'cakeFrames'

      
  useEffect(() => {
    // Get natural image dimensions
    RNImage.getSize(frameUrl.link, (originalWidth, originalHeight) => {
      const containerWidth = width - 20;
      const containerHeight = 480;

      const imageRatio = originalWidth / originalHeight;
      const containerRatio = containerWidth / containerHeight;

      let finalWidth, finalHeight;

      if (imageRatio > containerRatio) {
        // Image is wider relative to container — scale by width
        finalWidth = containerWidth;
        finalHeight = containerWidth / imageRatio;
      } else {
        // Image is taller relative to container — scale by height
        finalHeight = containerHeight;
        finalWidth = containerHeight * imageRatio;
      }
      let left1 = finalWidth * frameUrl.frame1.left / originalWidth
      let top1 = finalHeight * frameUrl.frame1.top / originalHeight
      let right1 = finalWidth * frameUrl.frame1.right / originalWidth
      let bottom1 = finalHeight * frameUrl.frame1.bottom / originalHeight
      let fwidth1 = finalWidth - right1 - left1
      let fheight1 = finalHeight - bottom1 - top1
      let left2, top2, fwidth2, fheight2
      if (frameUrl.frame2) {
        left2 = finalWidth * frameUrl.frame2.left / originalWidth
        top2 = finalHeight * frameUrl.frame2.top / originalHeight
        let right2 = finalWidth * frameUrl.frame2.right / originalWidth
        let bottom2 = finalHeight * frameUrl.frame2.bottom / originalHeight
        fwidth2 = finalWidth - right2 - left2
        fheight2 = finalHeight - bottom2 - top2
      }
      // console.log("frame dims" , fwidth, fheight, left, top, right,bottom)
      setImageDims({
        width: finalWidth, height: finalHeight, left1, top1, fwidth1, fheight1
        , left2, top2, fwidth2, fheight2
      });
    });
  }, [frameUrl]);

  useEffect(() => {
    const getData = async () => {
      // const singleFrames = await AsyncStorage.getItem('singleFrames')
      // console.log(frameUrl.link,"useEffect")

      const data = await AsyncStorage.getItem(string);
      // console.log(data,"ds")
      setFrames(JSON.parse(data))
    }
    getData();
  }, [])

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // adjust delay as needed
    }
  }, [modalVisible]);

  const showBroderHandle1 = (data) => {
    // console.log('state1',data)
    data && setPhotoOptionShow2(false)
    setTimeout(() => {
      setPhotoOptionShow1(data);
    }, 100)// update state with data from child
  };
  const showBroderHandle2 = (data) => {
    data && setPhotoOptionShow1(false)
    setTimeout(() => {
      setPhotoOptionShow2(data);
    }, 100) // update state with data from child
  };
  function TappedSticker(tapItem) {
    tapItem && TappedText()
    // console.log("tappedtext", tapItem)
    // tapItem.text ? tappedItem.id == tapItem.id ? setTappedItem('') : setTappedItem(tapItem) : setTappedItem('')
    const newa = stickersArray.map((item) => {
      if (item.id === tapItem?.id) {
        item.tapped = !item.tapped
        item.zIndex = zIndexCounter
      }
      else item.tapped = false

      return item
    })
    setStickersArray(newa)
    setZIndexCounter(prev => prev + 1);
  }
  function DeleteSticker(item) {
    // setTappedItem('')
    const newa = stickersArray.filter((value) => item.id !== value.id)
    // newa.push(item)
    setStickersArray(newa);
    // console.log("dlt", newa)
  }
  function closeStickers() {
    setShowStickers(false)
  }
  function Stickerhandle(item) {
    // console.log("stixke", item)
    const newItem = {
      sticker: item,
      id: Date.now(),
      tapped: true,
      zIndex: zIndexCounter
    }
    setStickersArray((prevArray) => [
      ...prevArray.map(item => ({ ...item, tapped: false })),
      newItem
    ]);
    setZIndexCounter(prev => prev + 1);
  }

  function handle() {
    if (onetext.length < 1) {
      Alert.alert('', 'Enter some text')
      return
    }
    setModalVisible(false)
    if (update) {
      const newa = array.map((value) => {
        if (ido === value.id) {
          value.text = onetext
        }
        return value
      })
      setArray(newa);
    }
    else {
      TappedSticker()
      const newItem = {
        text: onetext,
        id: Date.now(),
        tapped: true,
        font: 'font_abc_1',
        color: ['#FFFFFF'],
        backgroundColor: ['transparent'],
        shadowColor: '#FFFFFF',
        colorOpacity: 1,
        backgroundColorOpacity: 1,
        shadowOffset: 1,
        rotatedX: 0,
        rotatedY: 0,
        zIndex: zIndexCounter
      }
      setArray((prevArray) => [
        ...prevArray.map(item => ({ ...item, tapped: false })),
        newItem
      ]);
      setTappedItem(newItem)
      setZIndexCounter(prev => prev + 1);
    }
    setOnetext('')
    // console.log(array)
  }
  function changeColorOpacity(value) {
    // console.log(value,array)
    const newa = array.map((item) => {
      if (item.tapped) item.colorOpacity = value / 100
      return item
    })
    setArray(newa)
  }
  function changeBgColorOpacity(value) {
    // console.log(value)
    const newa = array.map((item) => {
      if (item.tapped) item.backgroundColorOpacity = value / 100
      return item
    })
    // console.log(newa)
    setArray(newa)
  }
  function changeShadowOffset(val) {
    // console.log(val, array)
    const newa = array.map((item) => {
      if (item.tapped) item.shadowOffset = val
      return item
    })
    setArray(newa)
  }
  function changeColor(value) {
    // console.log(value, array)
    const newa = array.map((item) => {
      if (item.tapped) item.color = Array.isArray(value) ? [...value] : [value]
      return item
    })
    setArray(newa)
  }
  function changeBgColor(value) {
    // console.log(value)
    const newa = array.map((item) => {
      if (item.tapped) item.backgroundColor = Array.isArray(value) ? [...value] : [value]
      return item
    })
    setArray(newa)
  }
  function changeShadowColor(value) {
    // console.log(value)
    const newa = array.map((item) => {
      if (item.tapped) item.shadowColor = value
      return item
    })
    setArray(newa)
  }
  function changeFontStyle(value) {
    const newa = array.map((item) => {
      if (item.tapped) item.font = value
      return item
    })
    setArray(newa)
  }
  function rotateX(value) {
    const newa = array.map((item) => {
      if (item.tapped) item.rotatedX = value
      return item
    })
    setArray(newa)
  }
  function rotateY(value) {
    const newa = array.map((item) => {
      if (item.tapped) item.rotatedY = value
      return item
    })
    setArray(newa)
  }
  function TappedText(tapItem) {
    tapItem && TappedSticker()
    // console.log("tappedtext", tapItem)
    tapItem?.text ? tappedItem.id == tapItem.id ? setTappedItem('') : setTappedItem(tapItem) : setTappedItem('')
    const newa = array.map((item) => {
      if (item.id === tapItem?.id) {
        item.tapped = !item.tapped
        item.zIndex = zIndexCounter
      }
      else item.tapped = false

      return item
    })
    setArray(newa)
    setZIndexCounter(prev => prev + 1);
  }
  function DeleteText(item) {
    setTappedItem('')
    const newa = array.filter((value) => item.id !== value.id)
    // newa.push(item)
    setArray(newa);
    setShowStickers(false)
    // console.log("dlt", newa)
  }

  //   const { imageUri } = route.params;

  // const addText = () => {
  //     setTexts([...texts, `Text ${texts.length + 1}`]);
  // };
  function EditText(vamo) {
    // console.log("edirt", vamo)
    setOnetext(vamo.text)
    setIdo(vamo.id)
    setUpdate(true)
    setModalVisible(true)
  }
  // const options = {
  //   mediaType: 'photo',
  //   includeBase64: false,
  //   maxHeight: 20,
  //   maxWidth: 20,
  // };
  // async function calling() {
  //   // console.log("function")
  //   const result = await launchImageLibrary(options);

  //   if (result.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (result.error) {
  //     console.log('ImagePicker Error: ', result.error);
  //   } else {
  //     const localImagePath = result.assets[0].uri;
  //     setData(localImagePath)
  //     // console.log("image", localImagePath)
  //     // const resultPath = await NativeModules.BackgroundRemover.removeBackground(localImagePath);
  //     // console.log("Processed image path:", resultPath);
  //   }
  // }

  function UpdateFrame(frame) {
    // console.log('now',frame)
    setFrameUrl(frame)
  }
  //   const imageRef = useRef(null);

  // const onLayout = (e) => {
  //   // if (imageRef.current) {
  //     const {x, y, width, height, pageX, pageY} = e.nativeEvent.layout
  //     // imageRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       console.log(`Rendered Width: ${width}, Height: ${height}`,x ,y, pageX, pageY);
  //     // });
  //   // }
  // };
  function ManageFilters(){
    Platform.OS == 'android' && alert('iOS devices only support filters')

    saveButton1 && (!frameUrl.frame2 || saveButton2) ?
          setShowFilters(!showFilters)
          :
          alert('Please select photo')
        }
  function shiftShareScreen(savedImage) {
    navigation.navigate('ShareScreen', { savedUri: savedImage })
  }


  const condition = saveButton1 && (!frameUrl.frame2 || saveButton2);

  const closeAll = () => {
          tappedItem && setShowStickers(false)
          TappedText()
          TappedSticker()
          // photoRef?.current.closeOptions()
          showBroderHandle1(false)
          showBroderHandle2(false)
        }
  return (
      <SafeAreaView style={{ flex: 1 }}>
    <GestureHandlerRootView>
      <ScreenHeader 
backPress={()=>navigation.goBack()}
title={headings[string]}
rightButton={     
    <Pressable onPress={() => {
      closeAll()
        setTimeout(() => {
    captureImage()
  }, 200)
    }}
      disabled={!condition}
    >
              <LinearGradient style={{ 
        width: 60,
        height: 30,
        borderRadius: 15,
        alignItems: 'center', justifyContent: 'center' }}
                colors={[condition ? '#2193b0' : 'grey', condition ? '#6dd5ed' : 'grey']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
      <Text style={{ color: condition ? '#fff' : '#ccc' }}>SAVE</Text>
              </LinearGradient>
    </Pressable>
      }
  />


      {/* <ActivityIndicator/> */}
      {/* <HomeScreen/> */}
      {/* <Button title="Capture View" onPress={captureImage} />

      {saveImage && (
        <Image
          source={{ uri: saveImage }}
          style={{ width: 300, height: 300, marginTop: 20 }}
        />
      )} */}
        <TouchableWithoutFeedback style={{}} onPress={closeAll}>
          <View style={{
            width:width,height: 500,
            justifyContent:'center',
            marginBottom:50,
            alignItems:'center',
            // backgroundColor:'red'
            }}>
                <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={{
            height: imageDims.height, width: imageDims.width,
            // backgroundColor: 'green', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Black overlay view with final image dimensions */}
            <View
              style={[
                {
                  width: imageDims.width,
                  height: imageDims.height,
                  // backgroundColor: 'red',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // overflow:'hidden',
                  // position:'absolute'
                },
              ]}
            >
              <View style={{ position: 'absolute', top: imageDims.top1, left: imageDims.left1 }}>
                <AdjustPhoto top={imageDims.top1 + (500 - imageDims.height) / 2} left={imageDims.left1 + (width - imageDims.width) / 2}
                  ref={photoRef} photoOptionShow={photoOptionShow1} imageSelected={() => setSaveButton1(true)}
                  width={imageDims.fwidth1} height={imageDims.fheight1} showBroder={showBroderHandle1}
                  userImage={userImageOne} UpdateUserImage={(url) => {
                    setUserImageOne(url)
                    setUserImageOneBUp(url)
                  }}
                />
                {photoOptionShow1 && <View pointerEvents='box-none' style={{
                  position: 'absolute',
                  borderColor: '#EB5F83', zIndex: 1,
                  height: imageDims.fheight1, width: imageDims.fwidth1,
                  borderWidth: 2, borderRadius: 10, top: 0, left: 0
                }}>

                </View>}
              </View>
              {frameUrl.frame2 &&
                <View style={{ position: 'absolute', top: imageDims.top2, left: imageDims.left2 }}>
                  <AdjustPhoto top={imageDims.top2 + (500 - imageDims.height) / 2} left={imageDims.left2 + (width - imageDims.width) / 2}
                    ref={photoRef} photoOptionShow={photoOptionShow2} imageSelected={() => setSaveButton2(true)}
                    width={imageDims.fwidth2} height={imageDims.fheight2} showBroder={showBroderHandle2}
                    userImage={userImageTwo} UpdateUserImage={(url) => {
                    setUserImageTwo(url)
                    setUserImageTwoBUp(url)
                  }}
                  //  pressed={photoOptionShow}
                  />
                  {photoOptionShow2 && <View pointerEvents='box-none' style={{
                    position: 'absolute',
                    borderColor: '#EB5F83', zIndex: 1,
                    height: imageDims.fheight2, width: imageDims.fwidth2,
                    borderWidth: 2, borderRadius: 10, top: 0, left: 0
                  }}>

                  </View>}
                </View>
              }
            </View>
            {/* Actual image */}
            <View style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent:'center',
              alignItems:'center'
            }} pointerEvents='none'>
            <Image
              source={{ uri: frameUrl.link }}
              // pointerEvents="box-none"
              style={{
                width: width - 20,
                height: 480,
                // flex:1,
                // position: 'absolute',
                resizeMode: 'contain',
              }}
            />
            </View>
            <View
              pointerEvents="box-none"
              style={[
                {
                  width: imageDims.width,
                  height: imageDims.height,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'absolute',
                  zIndex: 2
                },
              ]}
            >
              {/* { photoOptionShow && <View style={{backgroundColor:'white',flexDirection:'row',top:0,left:0,position:'absolute'}}>
                  <Button title="Update image" onPress={() => photoRef.current?.changeImage()} />
      <Button title="Reflect" onPress={() => photoRef.current?.reflectHandle()} />
      <Button title="Rotate" onPress={() => photoRef.current?.rotateHandle()} />
              <Button title="Okay" onPress={() => setPhotoOptionShow(!photoOptionShow)} />            
            </View>
            } */}
              {
                array.map((text) =>
                  <ButtonHandler text={text} key={text.id} onDelete={DeleteText} onTapped={TappedText}
                    onEdit={EditText}
                  />
                  //   <ResumableZoom extendGestures={false}>
                  //     {/* <Image  source={{ uri: data}} style={{ width: 250, height: 250}} /> */}
                  //     <View style={{width:80, height:40, backgroundColor:'#e2e2e2', alignItems:'center', justifyContent:'center'}}>
                  //     <Text>{text}</Text>
                  //     </View>
                  // </ResumableZoom>
                )
              }
              {
                stickersArray.map((sticker) =>
                  <StickerResize key={sticker.id} sticker={sticker}
                    onDelete={DeleteSticker}
                    onTapped={TappedSticker}
                  />
                )
              }
            </View>
            {/* <FrameBase/> */}
            {/* <ImageBackground onLayout={onLayout} ref={imageRef} style={{height:470,width: width-20,justifyContent:'center',alignItems:'center'}} 
          //https://storage.googleapis.com/birthdayphotoframe/birthdaydouble/square/1.png
          source={{uri:'https://storage.googleapis.com/birthdayphotoframe/birthdaydouble/square/1.png'}}
          resizeMode='contain'
          > */}
            {/* </ImageBackground> */}
            {/* <View style={{ marginTop: 70, padding: 20 }}>
          <Button title='Click' onPress={calling} />
          </View> */}
            {/* <StickerResize/> */}


          </View>
      </ViewShot>
      </View>
        </TouchableWithoutFeedback>
      <View style={{
        // marginTop:100, 
        // backgroundColor:'red',
        flexDirection: 'row', justifyContent: 'space-evenly'
      }}>
        {/* <Button title="Stickers"/> */}
        <Pressable
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setShowFrames(!showFrames)}>
          <AddFrame />
          <Text style={{ fontSize: 10, marginVertical: 4 }}>{t('editorScreen.menu.frames')}</Text>
        </Pressable>
        <Pressable
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setShowStickers(!showStickers)}>
          <StickersIcon />
          <Text style={{ fontSize: 10, marginVertical: 4 }}>{t('editorScreen.menu.stickers')}</Text>
        </Pressable>
        <Pressable style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            setUpdate(false)
            setModalVisible(true)
          }} >
          <AddTextIcon />
          <Text style={{ fontSize: 10, marginVertical: 4 }}>{t('editorScreen.menu.text')}</Text>
        </Pressable>
        <Pressable onPress={ManageFilters}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ApplyFilter />
          <Text style={{ fontSize: 10, marginVertical: 4 }}>{t('editorScreen.menu.filters')}</Text>
        </Pressable>
      </View>
      <View style={{}}>
        {/* <Pinchable> */}
        {/* <Zoom> */}
        {/* <Image
                source={{ uri: imageUri }}
                style={{ width: 250, height: 250 }}
                resizeMode="contain"
            /> */}
        {/* </Zoom> */}
        {/* </Pinchable> */}
        {
          showFrames && <Frames framesData={frames} getFrame={UpdateFrame} close={() => setShowFrames(false)} />
        }
        {tappedItem && <TextCustomize
          tappedItem={tappedItem} EditText={() => EditText(tappedItem)}
          changeColor={changeColor} changeBgColor={changeBgColor} changeShadowColor={changeShadowColor}
          changeColorOpacity={changeColorOpacity} changeBgColorOpacity={changeBgColorOpacity}
          changeShadowOffset={changeShadowOffset} changeFontStyle={changeFontStyle}
          rotateX={rotateX} rotateY={rotateY}
        />
        }
        {showStickers && <StickerCustomize onAdd={Stickerhandle} onClose={closeStickers} />}
        {
          showFilters && <FilterCustomize
          //  updateImageUrl={(url) => setUserImageOne(url)} imageUrl={userImageOneBUp}
           brightness={brightness} saturation={saturation} hue={hue} setBrightness={(val) => setBrightness(val)}
           setSaturation={(val) => setSaturation(val)} setHue={(val) => setHue(val)}
           onClose={() => setShowFilters(false)}/>
        }
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {/* <View style={{
                    position: 'absolute',
                    top: 500,  // Custom position
                    left: 20,  // Custom position
                    right: 20, // Custom position
                    // backgroundColor: 'blue',
                    padding: 20,
                    borderRadius: 10,
                }}> */}
          <View style={{
            flex: 1,
            // height: 400,
            // justifyContent: 'center',  // Center the content vertically
            // alignItems: 'center',      // Center the content horizontally
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Semi-transparent background
          }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 30 }}>
              {/* <Text style={{ color: 'white' }} onPress={handle}>Ok</Text> */}
              <Pressable onPress={() => setModalVisible(false)}>
                <CloseIcon />
              </Pressable>
              <Pressable onPress={handle}>
                <CheckIcon />
              </Pressable>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                ref={inputRef}
                placeholder={t('editorScreen.text.enterText')} placeholderTextColor='white' onChangeText={(value) => setOnetext(value)} value={onetext} style={{ borderWidth: 0.3, borderColor: 'white', color: 'white', borderRadius: 5, marginHorizontal: 20 }} />
            </View>
            {/* {warning && <Text>Enter some text</Text>} */}
          </View>
          {/* </View> */}
        </Modal>
      </View>
    </GestureHandlerRootView>
</SafeAreaView>
  );
};

export default EditorScreen;
