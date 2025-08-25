import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Dimensions, Image, Text, View, Alert, Share, Button, SafeAreaView, Pressable } from "react-native";
import ScreenHeader from "../header/ScreenHeader";
import HomeIcon from "../../assets/svg/HomeIcon";

const {width} = Dimensions.get('screen');
export default function ShareScreen({navigation,route}){
    const imageUri = route.params.savedUri;
    // console.log(imageUri,"uri")

const saveCreation = async (url) => {
  try {
    const exiCreations = await AsyncStorage.getItem('Creations');
    let data = [];

    if (exiCreations) {
      data = JSON.parse(exiCreations);
    }

    data.unshift(url);
    await AsyncStorage.setItem('Creations', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save creation:', error);
  }
};
  useEffect(() => {
    if (imageUri) {
      saveCreation(imageUri);
    }
  }, [imageUri]);

    const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
                    url: imageUri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

    return(
        <SafeAreaView>
                <ScreenHeader 
          backPress={()=>navigation.goBack()}
          rightButton={
                  <Pressable onPress={()=> navigation.navigate('WelcomeScreen')} 
                  style={{width:30,height:30,
      justifyContent:'center',alignItems:'center',
      borderRadius:15,backgroundColor:'#ff8b94'}}>
           <HomeIcon/>
           </Pressable>
          }
            />
            {/* <Text>{route.params.savedUri}</Text> */}
            {/* <Text >Share Screen</Text> */}
            <Image 
            source={{uri: imageUri}}
            style={{width:width,height:width}}
            resizeMode="contain"
            />
            <Button title="Share" onPress={onShare}/>
        </SafeAreaView>
    )
}