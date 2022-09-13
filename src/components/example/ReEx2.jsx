import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

const ReEx2 = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (e, context) => {
      translateY.value = e.translationY + context.translateY;
      translateX.value = e.translationX + context.translateX;
    },
    onEnd: (e) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance > CIRCLE_RADIUS + SIZE / 2) {
        translateY.value = withSpring(0);
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <View style={styles.containerR2}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <View style={styles.circle}>
          <Animated.View style={[styles.square, rStyle]}></Animated.View>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  containerR2: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    border: "1 solid red",
    borderRadius: SIZE * 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ReEx2;
