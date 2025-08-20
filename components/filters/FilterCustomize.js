import { Pressable, Text, View } from "react-native";
import CheckIcon from "../../assets/svg/CheckIcon";

export default function FilterCustomize({onClose}){
    return(
        <View>
        <Text>Filters</Text>
        <Pressable onPress={onClose}>
        <CheckIcon color='red'/>
        </Pressable>
        </View>
    )
}