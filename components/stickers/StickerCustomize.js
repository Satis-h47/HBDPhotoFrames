import { Image, Pressable, ScrollView, Text, View } from "react-native";
import CloseIcon from "../../assets/svg/CloseIcon";
import StickerTab from "./StickerTab";
import StickersList from "./StickersList";
// import stickers from '../../assets/data/stickers.json';

export default function StickerCustomize({onClose, onAdd}) {
    return (
        // <View>
        //     <Text>Stickers</Text>
        <View style={{backgroundColor:'white',top:-150}}>
            {/* <View style={{}}> */}
                {/* <ScrollView></ScrollView> */}

                <Pressable onPress={onClose} style={{alignSelf:'flex-end',
                    zIndex:1,backgroundColor:'white',paddingVertical:14,paddingHorizontal:10}}>
                <CloseIcon fill="#000"/>
                </Pressable>
                <View style={{height:220,top:-60}}>
                <StickerTab onAdd={onAdd}/>
                </View>
            {/* </View> */}
            {/* <ScrollView style={{ backgroundColor: 'red', flexDirection: 'row' }}>
                {
                    stickers.map((row, rowIndex) => (
                        <View key={rowIndex} style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}>
                            {row.map((item, colIndex) => (
                                <Pressable onPress={() => onAdd(item)} key={colIndex} >
                                                                    <Image source={{ uri: item }}
                                    style={{
                                        // flex: 1,
                                        height: 70, width: 70,
                                        // padding: 10,
                                        backgroundColor: '#ddd',
                                        marginHorizontal: 2,
                                    }} />
                                    </Pressable>

                            ))}
                        </View>
                    ))
                }
            </ScrollView> */}
            {/* <StickersList onAdd={onAdd}/> */}
        </View>
        // </View>

    )
}