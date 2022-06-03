import React, { useRef, useEffect, useState } from "react";
import GestureRecognizer from "react-native-swipe-detect";

import { Animated, Button, StyleSheet, View, Text } from "react-native";

const Test = ({ children, start, direction }) => {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (start) {
      console.log(direction, "dir - TEST");
      startAnimate();
    }
  }, [start]);

  const startAnimate = () => {
    Animated.timing(value, {
      toValue: 1000,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  };

  const translateDirection = (direction) => {
    if (direction == "SWIPE_UP") {
      let obj = {};
      obj.translateY = value.interpolate({
        inputRange: [0, 100],
        outputRange: [100, 0],
      });
      return obj;
    }
    if (direction == "SWIPE_DOWN") {
      let obj = {};
      obj.translateY = value.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100],
      });
      return obj;
    }
    if (direction == "SWIPE_LEFT") {
      let obj = {};
      obj.translateX = value.interpolate({
        inputRange: [0, 100],
        outputRange: [100, 0],
      });
      return obj;
    }
    if (direction == "SWIPE_RIGHT") {
      let obj = {};
      obj.translateX = value.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 100],
      });
      return obj;
    }

    let obj = {};
    obj.translateX = value.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
    });
    return obj;
  };
  let dir = translateDirection(direction);
  return (
    <Animated.View
      style={{
        transform: [
          {
            ...dir,
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function Swipe({
  children,
  onChange,
  swipeUp,
  swipeDown,
  swipeLeft,
  swipeRight,
  config,
}) {
  const [start, setStart] = useState(false);
  const [dir, setDir] = useState("");

  const defaultConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  let onSwipeUp = () => {
    try {
      swipeUp();
    } catch (error) {
      console.log(error);
    }
  };

  let onSwipeDown = () => {
    try {
      swipeDown();
    } catch (error) {
      console.log(error);
    }
  };

  let onSwipeLeft = () => {
    try {
      swipeLeft();
    } catch (error) {
      console.log(error);
    }
  };

  let onSwipeRight = () => {
    try {
      swipeRight();
    } catch (error) {
      console.log(error);
    }
  };

  let onSwipe = (gestureName) => {
    try {
      setDir(gestureName);
      setStart(true);
      onChange(gestureName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => onSwipe(direction)}
      onSwipeUp={() => onSwipeUp()}
      onSwipeDown={() => onSwipeDown()}
      onSwipeLeft={() => onSwipeLeft()}
      onSwipeRight={() => onSwipeRight()}
      config={config ? config : defaultConfig}
    >
      <Test start={start} direction={dir}>
        {children}
      </Test>
    </GestureRecognizer>
  );
}

Swipe.Test = Test;
