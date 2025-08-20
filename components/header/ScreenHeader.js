import { Pressable, View, Text } from "react-native";
import BackArrow from "../../assets/svg/BackArrow";

export default function ScreenHeader({backPress,title, rightButton}){
    return(
        <View style={{
            height:40,
            // backgroundColor:'red',
            // marginTop:100,
            flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10
        }}>
            <Pressable onPress={backPress}>
                {/* <Text style={{}}>{'<'}</Text> */}
                <BackArrow/>
            </Pressable>
            <Pressable>
                <Text style={{marginHorizontal:20, fontSize:20, fontWeight:'bold'}}>{title}</Text>
            </Pressable>
            <View style={{ position: 'absolute', right: 10 }}>
    {rightButton && rightButton}  
    </View>
        </View>
    )
}