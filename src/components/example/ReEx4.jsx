import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Switch } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  interpolate,
  withTiming,
  Extrapolate,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const Colors = {
  dark: {
    background: "1e1e1e1",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRAK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};
const ReEx4 = () => {
  const [theme, setTheme] = useState("light");
  return (
    <View style={styles.container}>
      <Text>test text</Text>
      <Switch
        value={theme === "dark"}
        onValueChange={(toggled) => {
          setTheme(toggled ? "dark" : "light");
        }}
        thumbColor="violet"
        trackColor={SWITCH_TRAK_COLOR[`${theme === "light"}`]}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ReEx4;
