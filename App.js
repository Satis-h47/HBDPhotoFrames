import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/screens/HomeScreen';
import EditorScreen from './EditorScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import singleFrames from './assets/data/singleFrames.json';
import doubleFrames from './assets/data/doubleFrames.json';
import cakeFrames from './assets/data/cakeFrames.json';
import fonts from './assets/data/fonts.json';
import { ActivityIndicator, Animated, Button, Pressable, Text, View } from 'react-native';
import ShareScreen from './components/screens/ShareScreen';
import SaveButton from './components/testing/SaveButton';
import Example from './components/Example';
import CreationsScreen from './components/screens/CreationsScreen';
import ReviewCreations from './components/screens/ReviewCreations';
import AddFrame from './assets/svg/AddFrame';
import './assets/language/i18n.config';
import LanguageScreen from './components/screens/LanguageScreen';
import SpecificFrames from './components/screens/SpecificFrames';
import { useTranslation } from 'react-i18next';
import Home from './assets/svg/Home';
import Language from './assets/svg/Language';
import Creations from './assets/svg/Creations';
import BackArrow from './assets/svg/BackArrow';
import ForwardArrow from './assets/svg/ForwardArrow';
import CustomDrawerContent from './components/CustomDrawerContent';
import { useNetInfo } from '@react-native-community/netinfo';
import Fontchild from './components/testing/Fontchild';
import RNFetchBlob from 'rn-fetch-blob';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function MyDrawer() {
const {t} = useTranslation()
  return (
<Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  screenOptions={({ route }) => ({
    drawerLabel: ({ focused, color }) => (
      <View style={{ flexDirection: 'row', 
      justifyContent: 'space-between', alignItems: 'center', 
      // borderBottomWidth:1,
      // borderBottomColor:'red'
      }}>
        <Text style={{ color }}>{route.name}</Text>
        {/* <ForwardArrow/> */}
      </View>
    ),
    drawerActiveTintColor: '#000', // same as inactive
    drawerInactiveTintColor: '#000',
    drawerActiveBackgroundColor: 'transparent',
    drawerInactiveBackgroundColor: 'transparent',
  })}
>
      <Drawer.Screen name={t('screens.home')}
        component={MyStack}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size, color }) => (
        <Home size={size} color={color} />
      )
        }}
      />
      <Drawer.Screen name={t('screens.language')} 
      component={LanguageScreen} 
      options={{
        headerShown:false,
        drawerIcon: ({ focused, size, color }) => (
        <Language size={size} color={color} />
      )
      }}
      />
      <Drawer.Screen name={t('screens.creations')} 
      options={{
        headerShown:false,
        drawerIcon: ({ focused, size, color }) => (
        <Creations size={size} color={color} />
      )
      }}
       component={CreationsStack}/>
    </Drawer.Navigator>
  );
}

function CreationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreationsScreen"
      options={{headerShown:false}}
      component={CreationsScreen} />
      <Stack.Screen name="ReviewCreations"
      options={{headerShown:false}}
      component={ReviewCreations} />
    </Stack.Navigator>
  );
}

function MyStack() {
const {t} = useTranslation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={HomeScreen}
        options={({navigation}) => ({
          // title: t('homeScreen.heading'),
    //           headerTitle: () => (
    //   <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
    //     Hello
    //   </Text>
    // ),
    //     headerStyle: {
    //   backgroundColor: 'grey', // Style for the header container
    // },
    // headerTitleStyle: {
    //   fontSize: 40,
    //   color: 'red', // Title text color
    //   fontWeight: '100',
    // },
          headerShown: false,
          // unmountOnBlur: false,
          headerLeft: () => (
          <Pressable onPress={() => { navigation.openDrawer() }}>
          {/* <Button title='drawer'  /> */}
{/* <AddFrame/> */}
<Text style={{fontSize:30}}>☰</Text>
          </Pressable>
          )
        }
        )}
      />
      <Stack.Screen name='SpecificFrames'
      options={{headerShown:false}}
      component={SpecificFrames}/>
      <Stack.Screen
        name="EditorScreen"
        component={EditorScreen}
        options={({ navigation }) => ({
          title: 'Editor',
          headerShown: false,
          headerStyle: {
            // backgroundColor: '#6200ee',
          },
          // headerTintColor: '#fff',
          headerRight: () => (
            <SaveButton />
          ),
        })}
      />
      <Stack.Screen name='ShareScreen'
      options={{headerShown:false}}
      component={ShareScreen} />
      <Stack.Screen name="CreationsStack"
      options={{headerShown:false}}
      component={CreationsStack} />
      {/* <Stack.Screen
  name="ReviewCreations"
  component={ReviewCreations}
/> */}

    </Stack.Navigator>
  )
}
const App = () => {
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo()

const {i18n} = useTranslation()

// useEffect(() => {
//   const loadLanguage = async () => {
//     const lang = await AsyncStorage.getItem('language');
//     if (lang) {
//       await i18n.changeLanguage(lang);
//     }
//   };

//   loadLanguage();
// }, []);

  useEffect(() => {
    // AsyncStorage.clear()
    const initStorage = async () => {
      try {
            const lang = await AsyncStorage.getItem('language');
    if (lang) {
      await i18n.changeLanguage(lang);
    }

        const existingSingle = await AsyncStorage.getItem('singleFrames');
        if (!existingSingle) {
          await AsyncStorage.setItem('singleFrames', JSON.stringify(singleFrames));
          console.log('Initialized singleFrames in storage.');
        }
        const existingDouble = await AsyncStorage.getItem('doubleFrames');
        if (!existingDouble) {
          await AsyncStorage.setItem('doubleFrames', JSON.stringify(doubleFrames));
          console.log('Initialized doubleFrames in storage.');
        }
        const existingCake = await AsyncStorage.getItem('cakeFrames');
        if (!existingCake) {
          await AsyncStorage.setItem('cakeFrames', JSON.stringify(cakeFrames));
          console.log('Initialized cakeFrames in storage.');
        }
      } catch (error) {
        console.error('AsyncStorage error:', error);
      } finally {
        setLoading(false);
      }
    };

    initStorage();
  }, []);

  // console.log("loc",RNFetchBlob.fs.dirs.MainBundleDir)

  // const[font,setFont] = useState('blunt')
    if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <View style={{height:50,backgroundColor:'#eee'}}></View> */}
      {/* <Fontchild font={font}/> */}
      {/* <Animated.Text style={{marginTop:100, fontFamily: font, fontSize:30}}>Hello</Animated.Text> */}
      <MyDrawer />
      {/* {
        fonts.map((item) => 
        <Text onPress={() => setFont(item)} style={{fontFamily: font}}>{item}</Text>
        )
      } */}
      <View style={{height:70,backgroundColor:'#eee'}}></View>
    </NavigationContainer>
  );
};

export default App;
