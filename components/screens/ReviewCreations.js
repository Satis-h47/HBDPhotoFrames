import { useEffect, useLayoutEffect, useState } from "react";
import { View, FlatList, Image, Dimensions, StyleSheet, Text, Button, Pressable, SafeAreaView, Alert } from 'react-native';
import AddFrame from "../../assets/svg/AddFrame";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeader from "../header/ScreenHeader";
import DeleteIcon from "../../assets/svg/DeleteIcon";
import RNFS from 'react-native-fs'
const { width, height } = Dimensions.get('window');

export default function ReviewCreations({navigation,route}){


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable onPress={onDelete}>
  //         <AddFrame />
  //       </Pressable>
  //     ),
  //   });
  // }, [index]);
  
    async function deleteImageFromGallery(filePath) {
      // const hasPermission = await requestStoragePermission();
      // if (!hasPermission) {
      //   console.warn('No permission to access storage');
      //   return false;
      // }
    
      try {
        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
          await RNFS.unlink(filePath);
          console.log('Image deleted:', filePath);
          return true;
        } else {
          console.warn('File does not exist:', filePath);
          return false;
        }
      } catch (error) {
        console.error('Failed to delete image:', error);
        return false;
      }
    }

const onDelete = async () => {
  Alert.alert('Are you sure?','Do You Want to Delete this Image!',
              [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: async () => {
                    const updatedImages = images.filter((url, i) => {
  i == index && deleteImageFromGallery(url)
  return  i !== index
  }); // Create new array without deleted image
  await AsyncStorage.setItem('Creations', JSON.stringify(updatedImages));
  setImages(updatedImages);
  // Adjust index if needed (e.g., deleting last item)
    if (updatedImages.length === 0) {
    navigation.goBack();
    return;
  }
  
  if (index >= updatedImages.length && updatedImages.length > 0) {
    setIndex(updatedImages.length - 1);
  }
                }}])
  // const updatedImages = images.filter((url, i) => {
  // i == index && deleteImageFromGallery(url)
  // return  i !== index
  // }); // Create new array without deleted image
  // await AsyncStorage.setItem('Creations', JSON.stringify(updatedImages));
  // setImages(updatedImages);
  // // Adjust index if needed (e.g., deleting last item)
  //   if (updatedImages.length === 0) {
  //   navigation.goBack();
  //   return;
  // }
  
  // if (index >= updatedImages.length && updatedImages.length > 0) {
  //   setIndex(updatedImages.length - 1);
  // }
};
    const position = route.params?.position
    const img = route.params?.creations
    const [images, setImages] = useState(img || [])
    const [index,setIndex] = useState(position || 0)

//     useEffect(() => {
//   if (images.length === 0) {
//     navigation.goBack();
//   }
// }, [images]);
    
   const handleScroll = (event) => {
     const offsetX = event.nativeEvent.contentOffset.x;
     const newIndex = Math.round(offsetX / width);
     setIndex(newIndex);
   };
 
   return (
     <SafeAreaView  style={{ flex: 1 }}>
     {/* <Text onPress={()=>navigation.pop()}>Back</Text> */}

           <ScreenHeader 
     backPress={()=>navigation.goBack()}
    //  title='Header'
    rightButton={
      <Pressable onPress={onDelete} style={{width:30,height:30,
      justifyContent:'center',alignItems:'center',
      borderRadius:15,backgroundColor:'#ff3a76'}}>
           <DeleteIcon/>
           </Pressable>
    }
       />
       <FlatList
         data={images}
         horizontal
         pagingEnabled
        initialScrollIndex={position}
                getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
         showsHorizontalScrollIndicator={false}
         keyExtractor={(_, index) => index.toString()}
         onMomentumScrollEnd={handleScroll}
         renderItem={({ item }) => (
           <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
         )}
       />
       <View style={styles.counterContainer}>
         <Text style={styles.counterText}>{`${index + 1} / ${images.length}`}</Text>
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   image: {
     width,
     height: height-200,
   },
   counterContainer: {
     height: 64,
    //  backgroundColor: '#00000077',
     alignItems: 'center',
     justifyContent: 'center',
   },
   counterText: {
     fontSize: 17,
     color: '#00000077',
   },
 });
 