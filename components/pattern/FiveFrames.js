import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import FrameBase from "../frame/FrameBase";

const screenWidth = Dimensions.get('window').width - 22;
export default function FiveFrames({data, onPress}){
    // console.log(data)
    const width = screenWidth/2
    return(
        <View style={{}}>
            <View style={{flexDirection:'row'}}>
                <View>
                    <Pressable onPress={() => onPress(data[0])} style={styles.frame}>
                    <Image source={{uri:data[0].link}}
                    style={{width:width,height:width*2}}
                    />
                    </Pressable>
                    <Pressable onPress={() => onPress(data[1])} style={styles.frame}>
                    <Image source={{uri:data[1].link}}
                    style={{width:width,height:width}}
                    />
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => onPress(data[2])} style={styles.frame}>
                    <Image source={{uri:data[2].link}}
                    style={{width:width,height:width}}
                    />
                    </Pressable>
                    <Pressable onPress={() => onPress(data[3])} style={styles.frame}>
                    <Image source={{uri:data[3].link}}
                    style={{width:width,height:width*2}}
                    />
                    </Pressable>
                </View>
            </View>
                {  data[4] &&  <Pressable onPress={() => onPress(data[4])} style={[styles.frame]}>
            {/* <Image source={{uri:data[4].link}}
                    style={{width:310,height:200}}
                    /> */}
                    <FrameBase width={width*2+11} height={width/3} imageUri={data[4].link}/>
                    </Pressable>}
        </View>
    )
}

const styles = StyleSheet.create({
    frame:{
                        borderColor:'#5b86e5',
                        borderWidth:1,
                        borderRadius:10,
                        overflow:'hidden',
                        margin:5
                    }
})