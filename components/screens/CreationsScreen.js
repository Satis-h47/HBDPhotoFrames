import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import MasonryLayout from "../MasonryLayout";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ScreenHeader from "../header/ScreenHeader";
import { useTranslation } from "react-i18next";
import CloseIcon from "../../assets/svg/CloseIcon";
import DeleteIcon from "../../assets/svg/DeleteIcon";
import RNFS from 'react-native-fs';

export default function CreationsScreen({navigation}){
 const {t} = useTranslation()
  const isFocused = useIsFocused();
    const [creations, setCreations] = useState([]);
    // console.log(creations)

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

useFocusEffect(
  useCallback(() => {
    const loadCreations = async () => {
      const data = await AsyncStorage.getItem('Creations');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          // console.log("heloooooooo11111111")
          setCreations(parsed);
        } catch (e) {
          console.error("Failed to parse:", e);
        }
      } else {
        setCreations([]);
      }
    };

    loadCreations();
    // console.log("heloooooooo")
  }, [])
);

const [selecting,setSelecting] = useState(false)
const [selected, setSelected] = useState([])
// let arr = [1,3,4]
  function handlePress(num){
    selecting ? setSelected(prev =>
  prev.includes(num)
    ? prev.filter(n => n !== num)
    : [...prev, num]
)
//  setSelected(prev => {
//     const isSelected = prev.includes(num);
//     const updated = isSelected
//       ? prev.filter(n => n !== num)
//       : [...prev, num];

//     if (isSelected && prev.length === 1) {
//       setSelecting(false);
//     }

//     return updated;
//   })
    :
    navigation.navigate('ReviewCreations',
                   {position:num, creations: creations}
    )
if (selected.includes(num) && selected.length === 1) {
      setSelecting(false);
    }
    // selected.length == 0 && setSelecting(false)
  }
  async function handleDelete(){
    Alert.alert('Delete','Are you sure to delete these images?',
              [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: async () => {
                    const updatedCreations = creations.filter((url, index) =>{
  selected.includes(index) && deleteImageFromGallery(url)
  return !selected.includes(index);
});
  setCreations(updatedCreations);
  try {
    await AsyncStorage.setItem('Creations', JSON.stringify(updatedCreations));
  } catch (e) {
    console.error("Failed to save to AsyncStorage:", e);
  }

  //  setCreations(prev => prev.filter((_,index) => !selected.includes(index)))
   setSelected([])
   setSelecting(false)
                } }
              ]
    )
    // console.log(creations,"befo")
  // const updatedCreations = creations.filter((_, index) => !selected.includes(index));
  // setCreations(updatedCreations);
  // try {
  //   await AsyncStorage.setItem('Creations', JSON.stringify(updatedCreations));
  // } catch (e) {
  //   console.error("Failed to save to AsyncStorage:", e);
  // }

  // //  setCreations(prev => prev.filter((_,index) => !selected.includes(index)))
  //  setSelected([])
  //  setSelecting(false)
  }

    return(
      <SafeAreaView>  
        {
          selecting ? 
          <View style={{height:40,flexDirection:'row',justifyContent:'space-between',
          alignItems:'center',marginHorizontal:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:50,alignItems:'center'}}>
            <Pressable onPress={() =>{ 
              setSelected([])
              setSelecting(false)
              }}>
              <CloseIcon fill="#000"/>
            </Pressable>
              <Text style={{fontSize:20}}>{selected.length}</Text>
            </View>
                          <Pressable onPress={handleDelete}>
              <DeleteIcon fill="#000"/>
            </Pressable>
          </View>
          :
                 <ScreenHeader 
     backPress={()=>navigation.goBack()}
     title={t('creationsScreen.heading')}
       />
        }
       <View style={{height:10}}></View>

       
        <ScrollView>
     {/* <Text onPress={()=>navigation.goBack()}>Back</Text> */}

          {/* <MasonryLayout/> */}
            {/* <Text>My Creations</Text> */}
            {
                creations.length>0 ? <MasonryLayout select={selected} longPress={(num) => {
                  setSelected([num])
                  setSelecting(true)
                }}
  key={creations.length} images={creations} onPress={(num) => handlePress(num)}/>
                // creations.map((item, index) => 
                // <Pressable key={index} style={{margin:10}} onPress={() => navigation.navigate('ReviewCreations', {position:index, creations: creations})}>
                //     <Image source={{uri: item}}
                //     style={{height:300,width:300}}
                //     resizeMode="contain"
                //     />
                // </Pressable> 
                // )
                :
                <Text>NO CREATIONS</Text>
            }
        </ScrollView>
        </SafeAreaView>
    )
}