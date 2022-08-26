import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
export default function BottomSheet() {
  const context = useSharedValue({ y: 0 });
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      //   if (translateY.value > SCREEN_HEIGHT / 2) {
      //     translateY.value = SCREEN_HEIGHT;
      //   } else {
      //     translateY.value = 0;
      //   }
    });

  useEffect(() => {
    translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 });
  }, []);
  const rBottonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomContainer, rBottonStyle]}>
        <View style={styles.line}></View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 3,
  },
});
