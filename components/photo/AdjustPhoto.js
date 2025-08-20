import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Image, Pressable, Text, View, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

import { launchImageLibrary } from 'react-native-image-picker';
import FrameBase from '../frame/FrameBase';
import AddImage from '../../assets/svg/AddImage';
import CheckIcon from '../../assets/svg/CheckIcon';
import ChangeImage from '../../assets/svg/ChangeImage';
import Reflect from '../../assets/svg/Reflect';
import ImageRotate from '../../assets/svg/ImageRotate';
import CheckmarkIcon from '../../assets/svg/CheckmarkIcon';
import SlideInView from '../slide/SlideInView';
import { useTranslation } from 'react-i18next';

// console.log("screen",Dimensions.get('screen'))

const AdjustPhoto = forwardRef(({ width, height, showBroder, top, left, photoOptionShow, imageSelected }, ref) => {
    useImperativeHandle(ref, () => ({
        reflectHandle,
        rotateHandle,
        changeImage,
        closeOptions,
    }));

    const {t} = useTranslation();
    //   console.log("dsdcs")
    //   useEffect(()=>{
    //     console.log("sa")
    //     setPhotoOptionShow(false)
    //   },[])

    // console.log('statecha', statechange)
    //   const [ photoOptionShow, setPhotoOptionShow] = useState(false)
    const [userImage, setUserImage] = useState(null)

    const [reflectX, setReflectX] = useState(1);
    const [reflectY, setReflectY] = useState(1);
    const [rotate, setRotate] = useState(0);

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const scale = useSharedValue(1);
    const startScale = useSharedValue(0);

    const angle = useSharedValue(0);
    const startAngle = useSharedValue(0);

    const closeOptions = () => {
        // setPhotoOptionShow(false)
        showBroder(false)
    };

    // statechange ? setPhotoOptionShow(true) : setPhotoOptionShow(false)

    const reflectHandle = () => {
        if (((rotate / 90) % 2) === 0) {
            setReflectX(reflectX === 1 ? -1 : 1);
        } else {
            setReflectY(reflectY === 1 ? -1 : 1);
        }
    };

    const rotateHandle = () => {
        setRotate((prev) => (prev + 90) % 360)
    }

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            'worklet';
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            'worklet';
            translationX.value = prevTranslationX.value + event.translationX;
            translationY.value = prevTranslationY.value + event.translationY;
        });

    const rotation = Gesture.Rotation()
        .onStart(() => {
            startAngle.value = angle.value;
        })
        .onUpdate((event) => {
            angle.value = startAngle.value + event.rotation;
        })

    const pinch = Gesture.Pinch()
        .onStart(() => {
            'worklet';
            startScale.value = scale.value;
        })
        .onUpdate((event) => {
            'worklet';
            scale.value = startScale.value * event.scale
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translationX.value },
                { translateY: translationY.value },
                { rotateZ: `${angle.value}rad` },
                { rotate: `${rotate}deg` },
                { scaleX: reflectX },
                { scaleY: reflectY },
                { scale: scale.value },
            ],
        };
    });

    const Handler = Gesture.Simultaneous(rotation, pinch, pan)

    async function changeImage() {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        // console.log("function")
        const result = await launchImageLibrary(options);

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            const localImagePath = result.assets[0].uri;
            setUserImage(localImagePath)
            imageSelected()
             setReflectX(1);
             setReflectY(1);
            setRotate(0);
            // console.log("image", localImagePath)
            // const resultPath = await NativeModules.BackgroundRemover.removeBackground(localImagePath);
            // console.log("Processed image path:", resultPath);
        }
    }

    return (<>
        {photoOptionShow && 
            <View style={{zIndex: 3}}>
                {/* <SlideInView>  */}
            <View style={{
            backgroundColor: 'white', flexDirection: 'row',
            top: -top, left: -left,
            position: 'absolute',
            // zIndex: 3,
            width: 402,
            height: 50,
            justifyContent: 'space-around',
            // alignItems:'center'
        }}>
            <Pressable onPress={changeImage}
                style={{
                    width: '25%', marginVertical: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                <ChangeImage />
                <Text style={{ fontSize: 10 }}>{t('editorScreen.imgOptions.changePhoto')}</Text>
            </Pressable>
            <Pressable onPress={() => reflectHandle()}
                style={{
                    width: '25%', marginVertical: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                <Reflect />
                <Text style={{ fontSize: 10 }}>{t('editorScreen.imgOptions.reflect')}</Text>
            </Pressable>
            <Pressable onPress={() => rotateHandle()}
                style={{
                    width: '25%', marginVertical: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                <ImageRotate />
                <Text style={{ fontSize: 10 }}>{t('editorScreen.imgOptions.rotate')}</Text>
            </Pressable>
            <Pressable style={{
                    width: '25%', marginVertical: 2, alignItems: 'center', justifyContent: 'center'
            }}
                onPress={() => {
                    // setPhotoOptionShow(!photoOptionShow)
                    showBroder(!photoOptionShow)
                }}>
                <CheckmarkIcon color='red' />
                <Text style={{ fontSize: 10 }}>{t('editorScreen.imgOptions.okay')}</Text>
            </Pressable>
            {/* <Button title="Update image" onPress={() => changeImage()} />
          <Button title="Reflect" onPress={() => reflectHandle()} />
          <Button title="Rotate" onPress={() => rotateHandle()} />
                  <Button title="Okay" 
                  onPress={() => {
                    // setPhotoOptionShow(!photoOptionShow)
                    showBroder(!photoOptionShow)
                }} 
                    />             */}
        </View>
        {/* </SlideInView> */}
        </View>
        }
        <View style={{
            // borderColor: photoOptionShow ? 'black' : 'transparent',
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height,
            overflow: 'hidden'
        }}>
            {
                userImage ?
                    <GestureDetector gesture={Handler}>
                        <Pressable style={{
                            // overflow:'hidden'
                        }} onPress={() => {
                            // setPhotoOptionShow(!photoOptionShow)
                            showBroder(!photoOptionShow)
                        }}>
                            <Animated.View style={[
                                animatedStyle,
                            ]}>
                                {/* <Image
                        style={{ height: height, width: width }}
                        resizeMode="center"
                        source={{ uri: 
                            // 'https://images.unsplash.com/photo-1706306611201-305dba63850e'
                            userImage
                         }}
                    /> */}
                                <FrameBase imageUri={userImage} width={width} height={height} />
                            </Animated.View>
                        </Pressable>
                    </GestureDetector>
                    :
                    <View
                        style={{
                            width: width,
                            height: height,
                            // backgroundColor:'black',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {/* <Button title='Select image' onPress={changeImage}/> */}
                        <Pressable onPress={changeImage}>
                            <AddImage />
                        </Pressable>
                    </View>
            }
        </View>
    </>
    );
})


export default AdjustPhoto;
