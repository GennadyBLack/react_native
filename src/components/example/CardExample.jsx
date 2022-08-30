import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CardExample = ({ children }) => {
  const coordinates = useSharedValue({ x: 0, y: 0 });
  const context = useSharedValue({ x: 0, y: 0 });
  const touched = useSharedValue(false);

  const rotateDiapazon = (v) => {
    if (v < -13) return -13;
    if (v > 13) return 13;
    return v;
  };
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      coordinates.value.y,
      [SCREEN_WIDTH, SCREEN_WIDTH + 50],
      [1, 5],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateY: coordinates.value.y },
        { translateX: coordinates.value.x },
        {
          rotate: `${rotateDiapazon(coordinates.value.x)}deg`,
        },
        { scale },
      ],
    };
  });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      touched.value = true;
      context.value = { x: coordinates.value.x, y: coordinates.value.y };
    })
    .onUpdate((e) => {
      coordinates.value = { x: e.translationX, y: e.translationY };
    })
    .onEnd(() => {
      coordinates.value = { x: 0, y: 0 };
      touched.value = true;
    });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <View style={styles.line}></View>
          <View>{children}</View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: "0 auto",
    height: SCREEN_HEIGHT / 1.2,
    width: "90%",
    backgroundColor: "white",
    position: "absolute",
    // top: SCREEN_HEIGHT,
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

export default observer(CardExample);
