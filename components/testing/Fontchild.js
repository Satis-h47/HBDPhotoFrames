import { Text } from "react-native";

export default function Fontchild({font}){
    return(
        <Text style={{marginTop:100, fontFamily: font, fontSize:30}}>I am text</Text>
    )
}