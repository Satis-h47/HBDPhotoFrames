import AsyncStorage from '@react-native-async-storage/async-storage';

// import singleFrames from '../../assets/data/singleFrames.json';
// import doubleFrames from '../../assets/data/doubleFrames.json';
// import cakeFrames from '../../assets/data/cakeFrames.json';
import { Alert, BackHandler, Button, Pressable, ScrollView, Text,
   View, Share, SafeAreaView,Animated,TouchableOpacity,StyleSheet } from 'react-native';
import { useEffect, useState, useRef, useMemo } from 'react';
import ImageItem from '../photo/ImageItem';
import FiveFrames from '../pattern/FiveFrames';
import { useTranslation } from 'react-i18next';
import FramesList from '../pattern/FramesList';
import LinearGradient from 'react-native-linear-gradient';
import CakeFrames from '../../assets/svg/CakeFrames';
import DoubleFrames from '../../assets/svg/DoubleFrames';
import SingleFrames from '../../assets/svg/SingleFrame';
import Creations from '../../assets/svg/Creations';
import RateUs from '../../assets/svg/RateUs';
import MaskedView from '@react-native-masked-view/masked-view';
import MenuIcon from '../../assets/svg/MenuIcon';
import useScrollToTopButton from '../useScrollToTopButton';

export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
        url: 'https://storage.googleapis.com/birthdayphotoframe/birthdaysingle/portrait/2.png',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const [singleFrames, setSingleFrames ] = useState([]);
  const [doubleFrames, setDoubleFrames ] = useState([]);
  const [cakeFrames, setCakeFrames ] = useState([]);

  useEffect(()=>{
      const getData = async () => {
      const exiSingleFrames = await AsyncStorage.getItem('singleFrames');
      const exiDoubleFrames = await AsyncStorage.getItem('doubleFrames');
      const exiCakeFrames = await AsyncStorage.getItem('cakeFrames');

      setSingleFrames(exiSingleFrames ? JSON.parse(exiSingleFrames) : [])
      setDoubleFrames(exiDoubleFrames ? JSON.parse(exiDoubleFrames) : [])
      setCakeFrames(exiCakeFrames ? JSON.parse(exiCakeFrames) : [])
    }
    getData();
  },[]);

  // const [frames,setFrames] = useState([])
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]
      );
      return true; // prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // cleanup
  }, []);

const allFrames = useMemo(() => [...singleFrames, ...doubleFrames, ...cakeFrames], [singleFrames, doubleFrames, cakeFrames]);

  // for (let i = allFrames.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [allFrames[i], allFrames[j]] = [allFrames[j], allFrames[i]];
  // }

  function splitImages(images) {
    const squares = images.filter(img => img.link.includes('square'));
    const portraits = images.filter(img => img.link.includes('portrait'));
    const landscapes = images.filter(img => img.link.includes('landscape'));

    const result = [];

    while (squares.length >= 2 && portraits.length >= 2 && landscapes.length >= 1) {
      const group = [
        portraits.shift(), squares.shift(), squares.shift(),
        portraits.shift(),
        landscapes.shift()
      ];
      result.push(group);
    }

    return result;
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('singleFrames', JSON.stringify(singleFrames));
      // console.log('Data stored successfully');
    } catch (error) {
      console.error('Failed to store data:', error);
    }

    try {
      await AsyncStorage.setItem('doubleFrames', JSON.stringify(doubleFrames));
      // console.log('Data stored successfully');
    } catch (error) {
      console.error('Failed to store data:', error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('singleFrames');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        // console.log('Retrieved data:', data);
        return data;
      }
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }

    try {
      const jsonValue = await AsyncStorage.getItem('doubleFrames');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        // console.log('Retrieved data:', data);
        return data;
      }
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  };
  const { scrollRef, fadeAnim, isVisible, handleScroll, scrollToTop } = useScrollToTopButton();

  //   const scrollRef = useRef(null);
  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  //   const [isVisible, setIsVisible] = useState(false);
  //   const isMounted = useRef(true);
  
  //   useEffect(() => {
  //     return () => {
  //       isMounted.current = false; // mark as unmounted
  //     };
  //   }, []);
  
  //   const showButton = () => {
  //     if (!isVisible) {
  //       setIsVisible(true);
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 300,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   };
  
  // const hideButton = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     requestAnimationFrame(() => {
  //       if (isMounted.current && isVisible) {
  //         setIsVisible(false);
  //       }
  //     });
  //   });
  // };
  
  //   const handleScroll = (event) => {
  //     const offsetY = event.nativeEvent.contentOffset.y;
  //     if (offsetY > 100) {
  //       showButton();
  //     } else {
  //       hideButton();
  //     }
  //   };
  
  //   const scrollToTop = () => {
  //     scrollRef.current?.scrollTo({ y: 0, animated: true });
  //   };
  

  // const frames = splitImages(allFrames)

  // const changeLang = () => {
  //   if(i18n.language === 'en') i18n.changeLanguage('fr')
  //     else i18n.changeLanguage('en')
  // }
// console.log("cake", cakeFrames, singleFrames, doubleFrames)
  return (
    <SafeAreaView>
              <View style={{
            height:40,
            // backgroundColor:'black',
            // marginTop:100,
            flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
        marginBottom:10,
        }}>
            <Pressable style={{}} onPress={() => { navigation.openDrawer() }}>
<MenuIcon/>
            </Pressable>
            {/* <Pressable style={{flex:1,alignItems:'center'}}> */}
                            <MaskedView style={{ flex: 1 }}
                              maskElement={
                                <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                                  <Text style={{textAlign:'center',marginHorizontal:20, fontSize:20, fontWeight:'bold'}}>
                                    {t('homeScreen.heading')}
                                  </Text>
                                </View>
                              }
                            >
                              <LinearGradient style={{ flex: 1 }}
                                colors={['#FF5722', '#FFC107']}

                              >
                              </LinearGradient>
                            </MaskedView>
                {/* <Text style={{marginHorizontal:20, fontSize:20, fontWeight:'bold'}}>{t('homeScreen.heading')}</Text> */}
            {/* </Pressable> */}

        </View>

    <ScrollView style={{}}
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        >
      {/* <Text onPress={changeLang}>{t('lang')}</Text> */}
      {/* <Button title='share' onPress={onShare}/> */}
      <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center',margin:20}}>
        {/* <View style={{width:'60%',backgroundColor:'red',borderRadius:15,height:70,justifyContent:'center'}}>
            <Text onPress={() => navigation.navigate('SpecificFrames',{frames: singleFrames, key: 'single'})}>{t('homeScreen.single')}</Text>
      </View> */}
      <Pressable onPress={() => navigation.navigate('SpecificFrames', { frames: singleFrames, key: 'single' })} style={{ width: '60%', height: 90}}>
        <LinearGradient style={{ flex:1, borderRadius: 15, justifyContent: 'center' }}
          colors={['#5b86e5', '#36d1dc']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={{margin:10}}>
          <SingleFrames />
          <Text style={{ color: 'white', fontSize:12,paddingVertical:5}} >{t('homeScreen.single')}</Text>
        </View>
        </LinearGradient>
        </Pressable>
        {/* <View style={{width:'35%',backgroundColor:'green',borderRadius:15,height:70,justifyContent:'center'}}>
      <Text onPress={() => navigation.navigate('SpecificFrames',{frames: singleFrames, key: 'cake'})}>{t('homeScreen.photoOnCake')}</Text>
      </View> */}
      <Pressable onPress={() => navigation.navigate('SpecificFrames', { frames: cakeFrames, key: 'cake' })} style={{ width: '35%', height: 90}}>
        <LinearGradient style={{flex:1, borderRadius: 15, justifyContent: 'center' }}
          colors={['#f988f4', '#ffbc55']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={{margin:10}}>
          <CakeFrames />
          <Text style={{ color: 'white', fontSize:12,paddingVertical:5}} >{t('homeScreen.photoOnCake')}</Text>
        </View>
        </LinearGradient>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',paddingVertical:10 }}>
        <Pressable onPress={() => navigation.navigate('SpecificFrames', { frames: doubleFrames, key: 'double' })} style={{alignItems:'center'}}>

          <DoubleFrames />
          <Text style={{paddingVertical:5, fontSize:10}} >{t('homeScreen.double')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CreationsStack', {
  screen: 'CreationsScreen'})} style={{alignItems:'center'}}>

          <Creations fill='#69CFC5' />
          <Text style={{paddingVertical:5, fontSize:10}} >{t('homeScreen.creations')}</Text>
        </Pressable>
        <View style={{alignItems:'center'}}>
          <RateUs />
          <Text style={{paddingVertical:5, fontSize:10}}>{t('homeScreen.rateUs')}</Text>
        </View>
      </View>
      <Text style={{ padding: 10, fontWeight:'bold' }} >{t('homeScreen.subHeading')}</Text>
      {/* <FiveFrames /> */}
      {/* <Text>Home</Text>
        <Button title='setData' onPress={storeData}/>
        <Button title='getData' onPress={getData}/>

        <Button onPress={() => navigation.navigate('Profile')} title='goo'/> */}
      {/* {
          frames.map((item,index) => <Pressable key={index} style={{
            // backgroundColor:'red',
            // width:100,
            // height:100,
            // margin:10,
          }}
          >
<FiveFrames data={item} 
          onPress={(item) => navigation.navigate('EditorScreen', {dataFrom: item})}/>
          </Pressable>
          )
        } */}
      <FramesList allFrames={allFrames} navigation={navigation} />
    </ScrollView>
          {isVisible && (
            <Animated.View style={[styles.scrollTopButton, { opacity: fadeAnim }]}>
              <TouchableOpacity onPress={scrollToTop}>
                <Text style={styles.buttonText}>Top ↑</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});