import React, { useRef, useState } from 'react';
import { Image, Text, View, useWindowDimensions, TouchableOpacity, ScrollView,
  Dimensions, } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import StickersList from './StickersList';

import stickers1 from '../../assets/data/stickers_1.json';
import stickers2 from '../../assets/data/stickers_2.json';
import stickers3 from '../../assets/data/stickers_3.json';
import stickers4 from '../../assets/data/stickers_4.json';
import stickers5 from '../../assets/data/stickers_5.json';
import stickers6 from '../../assets/data/stickers_6.json';
import stickers7 from '../../assets/data/stickers_7.json';
import stickers8 from '../../assets/data/stickers_8.json';
import stickers9 from '../../assets/data/stickers_9.json';
import stickers10 from '../../assets/data/stickers_10.json';

const MyTabBar = ({ navigationState, position, jumpTo }) => (
  <View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // style={{ backgroundColor: 'green' }}
      contentContainerStyle={{ flexDirection: 'row' }}
    >
      {navigationState.routes.map((route, index) => {
        const isFocused = navigationState.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 4,
              backgroundColor: isFocused ? 'grey' : 'transparent',
              // marginRight: 4,
              // height:50,
              // borderRadius: 6
            }}
          >
            {/* <Text style={{ color: 'white' }}>{route.title}</Text> */}
            <Image
              style={{ height: 40, width: 40 }}
              source={{ uri: route.uri }}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const renderTabBar = props => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={{ backgroundColor: '#58f16f' }}
    style={{ backgroundColor: '#a7f4f4', elevation: 0 }}
    renderTabBarItem={({ route }) => (
      <View>
        <Image
          source={{ uri: route.uri }}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>
    )}
  />
);

const routes = [
  { key: 'first', title: 'First', uri: 'https://storage.googleapis.com/happybirthdaystickers/balloons/Balloon_1.png' },
  { key: 'second', title: 'Second', uri: 'https://storage.googleapis.com/happybirthdaystickers/decoration/Decoration_2.png' },
  { key: 'third', title: 'Third', uri: 'https://storage.googleapis.com/happybirthdaystickers/numbers/Numbers_10.png' },
  { key: 'four', title: 'Fourth', uri: 'https://storage.googleapis.com/happybirthdaystickers/snacks/Snacks_3.png' },
  { key: 'five', title: 'Fifth', uri: 'https://storage.googleapis.com/happybirthdaystickers/gifts/9.png' },
  { key: 'six', title: 'Sixth', uri: 'https://storage.googleapis.com/happybirthdaystickers/crowns/15.png' },
  { key: 'seven', title: 'Seventh', uri: 'https://storage.googleapis.com/commonstickers/birthday/B12.png' },
  { key: 'eight', title: 'Eighth', uri: 'https://storage.googleapis.com/commonstickers/flower/F9.png' },
  { key: 'nine', title: 'Ninth', uri: 'https://storage.googleapis.com/commonstickers/love/7.png' },
  { key: 'ten', title: 'Tenth', uri: 'https://storage.googleapis.com/commonstickers/smiley/S1.png' },
];

export default function StickerTab({ onAdd }) {

  const FirstRoute1 = () => (
    <StickersList stickers={stickers1} onAdd={onAdd} />
  );

  const FirstRoute2 = () => (
    <StickersList stickers={stickers2} onAdd={onAdd} />
  );
  const FirstRoute3 = () => (
    <StickersList stickers={stickers3} onAdd={onAdd} />
  );

  const FirstRoute4 = () => (
    <StickersList stickers={stickers4} onAdd={onAdd} />
  );

  const FirstRoute5 = () => (
    <StickersList stickers={stickers5} onAdd={onAdd} />
  );

  const FirstRoute6 = () => (
    <StickersList stickers={stickers6} onAdd={onAdd} />
  );

  const FirstRoute7 = () => (
    <StickersList stickers={stickers7} onAdd={onAdd} />
  );

  const FirstRoute8 = () => (
    <StickersList stickers={stickers8} onAdd={onAdd} />
  );

  const FirstRoute9 = () => (
    <StickersList stickers={stickers9} onAdd={onAdd} />
  );

  const FirstRoute10 = () => (
    <StickersList stickers={stickers10} onAdd={onAdd} />
  );


  const renderScene = SceneMap({
    first: FirstRoute1,
    second: FirstRoute2,
    third: FirstRoute3,
    four: FirstRoute4,
    five: FirstRoute5,
    six: FirstRoute6,
    seven: FirstRoute7,
    eight: FirstRoute8,
    nine: FirstRoute9,
    ten: FirstRoute10
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [tabLayouts, setTabLayouts] = useState({}); // store layout for each tab
  const scrollViewRef = useRef(null);



  const scrollToTab = index => {
    const layout = tabLayouts[index];
    if (layout && scrollViewRef.current) {
      const screenWidth = Dimensions.get('window').width;
      const x = layout.x + layout.width / 2 - screenWidth / 2;
      scrollViewRef.current.scrollTo({ x: Math.max(0, x), animated: true });
    }
  };

  const handleIndexChange = i => {
    setIndex(i);
    scrollToTab(i);
  };

  const CustomTabBar = ({ navigationState }) => (
    <View style={{ backgroundColor: '#b8e2f4',
      borderWidth:1,
      borderColor:'#274cd1',
      paddingRight:50
     }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {navigationState.routes.map((route, i) => {
          const focused = index === i;
          return (
            <View
              key={route.key}
              onLayout={e => {
                const { x, width } = e.nativeEvent.layout;
                setTabLayouts(prev => ({ ...prev, [i]: { x, width } }));
              }}
              style={{ marginHorizontal: 10 }}
            >
              <TouchableOpacity
                onPress={() => handleIndexChange(i)}
                style={{
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderBottomWidth: focused ? 3 : 3,
                  borderBottomColor: focused ? '#274cd1' : 'transparent',
                }}
              >
                <Image
                  source={{ uri: route.uri }}
                  style={{
                    width: 40,
                    height: 40,
                    // opacity: focused ? 1 : 0.5,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={CustomTabBar}
    />
  );
}