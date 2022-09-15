import React, { useRef, useCallback } from "react";
import ColorPicker from "./ColorPicker";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import Icon from "../base/Icon";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];
const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
export default function ReEx8() {
  const pickedColor = useSharedValue(COLORS[0]);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const onColorChanged = useCallback((color) => {
    "worklet";
    pickedColor.value = color;
  }, []);
  return (
    <Animated.View style={[styles.topContainer, rStyle]}>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        ></ColorPicker>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 3,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: PICKER_WIDTH,
    height: 20,
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 2,
  },
});
