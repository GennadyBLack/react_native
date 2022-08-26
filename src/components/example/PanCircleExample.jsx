import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Dimensions } from "react-native-web";

const SIZE = 80;
const useFollowAnimatedPosition = ({ x, y, b }) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
      backgroundColor: b,
    };
  });

  return [followX, followY, rStyle];
};

export default function PanCircleExample() {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      translateX.value = e.translationX + context.value.x;
      translateY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  const [followX, followY, bStyle] = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
    b: "blue",
  });

  const [fxr, fyr, redStyle] = useFollowAnimatedPosition({
    x: followX,
    y: followY,
    b: "red",
  });

  const [fxg, fyg, greenStyle] = useFollowAnimatedPosition({
    x: fxr,
    y: fyr,
    b: "green",
  });

  const [fxy, fyy, yellowStyle] = useFollowAnimatedPosition({
    x: fxg,
    y: fyg,
    b: "yellow",
  });

  const [fxp, fyp, pinkStyle] = useFollowAnimatedPosition({
    x: fxy,
    y: fyy,
    b: "pink",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, pinkStyle]}></Animated.View>
      <Animated.View style={[styles.circle, yellowStyle]}></Animated.View>
      <Animated.View style={[styles.circle, greenStyle]}></Animated.View>
      <Animated.View style={[styles.circle, redStyle]}></Animated.View>
      <GestureDetector gesture={gesture}>
        <>
          <Animated.View style={[styles.circle, bStyle]}></Animated.View>
        </>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    opacity: 0.6,
    position: "absolute",
    height: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    opacity: 0.8,
  },
});
