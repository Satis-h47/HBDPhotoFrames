import { Image, Pressable, ScrollView, Text, View, Platform } from "react-native";
import CheckIcon from "../../assets/svg/CheckIcon";
import ImageItem from "../photo/ImageItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import frames from '../../assets/data/singleFrames.json'
import RNFetchBlob from 'rn-fetch-blob';
import { useEffect, useState } from "react";

export default function Frames({getFrame,close, framesData}){
const [frames, setFrames] = useState(framesData || []);
// console.log(frames)
  let name = ''
  if(framesData[0].link.includes('single')) name = 'birthdaysingle'
  else if(framesData[0].link.includes('double')) name = 'birthdaydouble'
  else name = 'photooncake'

  let string = '';
  if (framesData[0].link.includes('single')) {
    string = 'singleFrames';
  } else if (framesData[0].link.includes('double')) {
    string = 'doubleFrames';
  } else {
    string = 'cakeFrames';
  }

const storeData = async () => {
  // console.log("hekkhidu");

  try {
    // Store the frames data in AsyncStorage
    await AsyncStorage.setItem(string, JSON.stringify(frames));
    // console.log('Data stored successfully');
  } catch (error) {
    console.error('Failed to store data:', error);
  }
};

const captureImage = async (item,position) => {
    if(item.link.includes('file')){
      getFrame(item)
       return
    }
  try {

  let dimen = ''
  if(item.link.includes('square')) dimen = 'square'
  else if(item.link.includes('portrait')) dimen = 'portrait'
  else dimen = 'landscape'

    const fileName = `${name}/${dimen}_${Date.now()}.jpg`;
    const destPath =
      Platform.OS === 'android'
        ? `${RNFetchBlob.fs.dirs.PictureDir}/${fileName}`
        : `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;

    const res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
      path: destPath,
    }).fetch('GET', item.link);

      const updatedFrames = [...frames];
      updatedFrames[position].link = 'file://' + destPath;
    // frames[position].link = 'file://'+destPath;
    getFrame({...item, link : 'file://'+destPath})
    setFrames(updatedFrames)

  } catch (error) {
    console.error('Capture/save failed:', error);
  }
};

useEffect(() => {
        storeData();
}, [frames]);
// captureImage()

    return(
        <View style={{backgroundColor:'white', top:-150, paddingBottom:100}}>
            <View style={{alignItems:'flex-end', marginHorizontal:20,marginVertical:10}}>
                <Pressable onPress={close}>
                <CheckIcon color='black'/>
                </Pressable>
            </View>
            {/* <View> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        frames.map((item,index) => 
                            <Pressable style={{marginHorizontal:10,overflow:'hidden',borderRadius:10,marginVertical:5}} key={index} onPress={() =>{
                                //  getFrame(item)
                                captureImage(item,index)
                                 }}>
                        {/* <Image source={{uri: item.link}}
                        style={{width:50, height:50, marginHorizontal:10}}
                        resizeMode="contain"
                        /> */}
<ImageItem uri={item.link} height={150} />
                            </Pressable>
                    )
                    }
                </ScrollView>
            {/* </View> */}
        </View>
    )
}