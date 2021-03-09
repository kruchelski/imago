import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const ViewPopUp = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 200,
        duration: 100,
        useNativeDriver: false
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...style,
        minHeight: fadeAnim,
        maxHeight: fadeAnim,
      }}
      
    >
      {children}
    </Animated.View>
  );
}

export default ViewPopUp