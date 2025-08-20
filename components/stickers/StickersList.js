import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function StickersList({ onAdd, stickers }) {
    return (
<ScrollView
  horizontal
  alwaysBounceHorizontal={false}
  showsHorizontalScrollIndicator={false}
>
  <View>
    {stickers.map((row, rowIndex) => (
      <View key={rowIndex} style={{ flexDirection: 'row' }}>
        {row.map((item, colIndex) => (
          <Pressable onPress={() => onAdd(item)} key={colIndex}>
            <Image
              source={{ uri: item }}
              style={{ height: 50, width: 50, margin: 15 }}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>
    ))}
  </View>
</ScrollView>

    )
}