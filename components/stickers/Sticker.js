import { Image } from "react-native";

export default function Sticker({sticker,width,height,flip}){
    if(width<height) height = width
    return <Image source={{uri:sticker}}
    style={{height:height,width:height,
    transform: [{ scaleX: flip ? -1 : 1}]
}}
  resizeMode="contain"
    />
}