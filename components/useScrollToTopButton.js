import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

const useScrollToTopButton = () => {
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false; // mark as unmounted
    };
  }, []);

  const showButton = () => {
    if (!isVisible) {
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const hideButton = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      requestAnimationFrame(() => {
        if (isMounted.current && isVisible) {
          setIsVisible(false);
        }
      });
    });
  };

  const handleScroll = useCallback( (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 100) {
      showButton();
    } else {
      hideButton();
    }
  });

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return {
    scrollRef,
    fadeAnim,
    isVisible,
    handleScroll,
    scrollToTop
  };
};

export default useScrollToTopButton;
