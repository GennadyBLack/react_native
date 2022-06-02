import React from "react";
import GestureRecognizer from "react-native-swipe-detect";

export default function Swipe({
  children,
  onChange,
  swipeUp,
  swipeDown,
  swipeLeft,
  swipeRight,
  config,
}) {
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
      style={{
        backgroundColor: "red",
      }}
    >
      {children}
    </GestureRecognizer>
  );
}
