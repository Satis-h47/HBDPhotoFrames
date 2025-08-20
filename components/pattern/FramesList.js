import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FiveFrames from "./FiveFrames";
import { useNetInfo } from "@react-native-community/netinfo";

function FramesList({navigation,allFrames}){


  const [shuffledFrames, setShuffledFrames] = useState([]);

  useEffect(() => {
    // Shuffle the frames only once when the component mounts or `allFrames` changes
    const shuffled = [...allFrames].sort(() => Math.random() - 0.5);
    setShuffledFrames(shuffled);
  }, [allFrames]); 

    const netInfo = useNetInfo();
  //   for (let i = allFrames.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [allFrames[i], allFrames[j]] = [allFrames[j], allFrames[i]];
  // }

function splitImages(images) {
// console.log("split", images)
  if(!netInfo.isConnected){
    images = images.filter(img => img.link.includes('file'));
  }

  const squares = images.filter(img => img.link.includes('square'));
  const portraits = images.filter(img => img.link.includes('portrait'));
  const landscapes = images.filter(img => img.link.includes('landscape'));

  const result = [];

  if(landscapes.length == 0){
    while (squares.length >= 2 && portraits.length >= 2 ) {
    const group = [
     portraits.shift(), squares.shift(), squares.shift(),
       portraits.shift()
    ];
    result.push(group);
  }
}
else{

  while (squares.length >= 2 && portraits.length >= 2 && landscapes.length >= 1) {
    const group = [
     portraits.shift(), squares.shift(), squares.shift(),
       portraits.shift(),
      landscapes.shift()
    ];
    result.push(group);
  }
}
// console.log("res", result)
  return result;
}
const frames = splitImages(shuffledFrames)

// console.log("frames", frames)
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

    return(
      <View>
        <ScrollView
        // ref={scrollRef}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
        >
                    {
                      frames.map((item,index) => <Pressable key={index} style={{
                        // backgroundColor:'red',
                        // width:100,
                        // height:100,
                        // margin:10,
                      }}
                      >
            {/* <ImageItem uri={item.link}/>  */}
            <FiveFrames data={item} 
                      onPress={(item) => navigation.navigate('EditorScreen', {dataFrom: item})}/>
                      </Pressable>
                      )
                    }
                    </ScrollView>
                              {/* {isVisible && (
            <Animated.View style={[styles.scrollTopButton, { opacity: fadeAnim }]}>
              <TouchableOpacity onPress={scrollToTop}>
                <Text style={styles.buttonText}>Top ↑</Text>
              </TouchableOpacity>
            </Animated.View>
          )} */}
        </View>
    )
}
// const styles = StyleSheet.create({
//   scrollTopButton: {
//     position: 'absolute',
//     bottom: 300,
//     right: 20,
//     backgroundColor: '#333',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 30,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
export default React.memo(FramesList);