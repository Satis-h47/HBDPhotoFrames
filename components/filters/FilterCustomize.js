import { Pressable, Text, View, NativeModules, Image } from "react-native";
import CheckIcon from "../../assets/svg/CheckIcon";
import { useEffect, useState } from "react";
import CustomSlider from "../CustomSlider";
import ResetIcon from "../../assets/svg/ResetIcon";

// const { ImageFilterModule } = NativeModules;

export default function FilterCustomize({ onClose, 
  // imageUrl, updateImageUrl, 
  brightness, saturation, hue, setBrightness, setSaturation, setHue }) {
  // console.log("origibnal", imageUrl)
  // const [userImage] = useState('file:///Users/trandasys/Library/Developer/CoreSimulator/Devices/84D1EEB3-FE1D-4D7A-B7FF-3123EC9E1D9E/data/Containers/Data/Application/7C498513-10B6-4E91-9ECA-60B012404B8C/tmp/B9CB1C50-B012-4990-A983-D7D86EBCDF2E.jpg');
  // const [filteredImage, setFilteredImage] = useState(imageUrl);


  const [action, setAction] = useState('brightness');

  return (
    <View style={{ top: -150, backgroundColor: 'white',height:250}}>
      <View style={{ flexDirection: 'row',alignItems:'center', marginHorizontal:20,marginVertical:10 }}>
                            <Pressable  onPress={() => {
                                setBrightness(0)
                                setSaturation(1)
                                setHue(0)
                            }}
                             style={{flex:1,  }}>
                        {(brightness != 0 || saturation != 1 || hue != 0) && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ResetIcon />
                            <Text>Reset</Text>
                        </View>
                        }
                    </Pressable>
        <Text style={{flex:1, textAlign:'center'}}>ADJUST</Text>
        <Pressable onPress={onClose} style={{flex:1, alignItems:'flex-end'}}>
          <CheckIcon color='red' />
        </Pressable>
      </View>
      <View style={{}}>
        {action === 'brightness' && (
          <View style={{ height: 50, justifyContent:'center', alignItems:'center' }}>
            <CustomSlider 
            min={-1.0} max={1.0} eachStep={0.1}
            value={brightness} onValueChange={val => setBrightness(val)} />
          </View>
        )}
        {action === 'saturation' && (
          <View style={{ height: 50, justifyContent:'center', alignItems:'center'  }}>
            <CustomSlider 
            min={0.0} max={2.0} eachStep={0.1}
            value={saturation} onValueChange={val => setSaturation(val)} />
          </View>
        )}
        {action === 'hue' && (
          <View style={{ height: 50, justifyContent:'center', alignItems:'center' }}>
            <CustomSlider 
            min={-3.1416} max={3.1416} eachStep={0.031416}
            value={hue} onValueChange={val => setHue(val)} />
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable onPress={() => setAction('brightness')} style={{alignItems:'center'}}>
          <Text style={{color: action == 'brightness' ? 'red' : 'black', 
            // borderBottomWidth: action == 'brightness' ? 2 : 0
            }}>Brightness</Text>
        {action == 'brightness' && <View style={{backgroundColor:'black',height:3, width:20}}></View>}
        </Pressable>
        <Pressable onPress={() => setAction('saturation')} style={{alignItems:'center'}}>
          <Text style={{color: action == 'saturation' ? 'red' : 'black', 
            // borderBottomWidth: action == 'saturation' ? 2 : 0
            }}>Saturation</Text>
        {action == 'saturation' && <View style={{backgroundColor:'black',height:3, width:20}}></View>}
        </Pressable>
        <Pressable onPress={() => setAction('hue')} style={{alignItems:'center'}}>
          <Text style={{color: action == 'hue' ? 'red' : 'black', 
            // borderBottomWidth: action == 'hue' ? 2 : 0
            }}>Hue</Text>
          {action == 'hue' && <View style={{backgroundColor:'black',height:3, width:20}}></View> }
        </Pressable>
      </View>

      {/* <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} /> */}
    </View>
  );
}
