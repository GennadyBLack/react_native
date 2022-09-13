import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
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

const { width: SIZE } = Dimensions.get("window");

export default function ReEx7() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
