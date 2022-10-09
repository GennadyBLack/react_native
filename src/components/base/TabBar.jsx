import React, { useEffect, useCallback } from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { View, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import useStore from "../../hooks/useStore";

import * as shape from "d3-shape";
const { width } = Dimensions.get("window");
const iconHeight = 25;
const height = 64;
import StaticTabbar from "./StaticTabbar";
import { observer } from "mobx-react-lite";
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
// eslint-disable-next-line react/prefer-stateless-function
const TabBar = (props) => {
  const translate = useSharedValue(200);
  const [menu] = useStore("menu");
  const tabs = menu.filteredRoutes;
  const offset = useSharedValue(0);

  const tabWidth = iconHeight + 50;
  const backgroundColor = "white";

  const scrollTo = useCallback((destination) => {
    "worklet";
    translate.value = withSpring(destination, { damping: 50 });
    console.log(translate.value, "UUUUU");
  }, []);

  const getPath = () => {
    const left = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)([
      { x: 0, y: 0 },
      { x: width, y: 0 },
    ]);
    const tab = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(shape.curveBasis)([
      { x: width, y: 0 },
      { x: width + 5, y: 0 },
      { x: width + 10, y: 10 },
      { x: width + 15, y: height - 15 },
      { x: width + tabWidth - 15, y: height - 15 },
      { x: width + tabWidth - 10, y: 10 },
      { x: width + tabWidth - 5, y: 0 },
      { x: width + tabWidth, y: 0 },
    ]);
    const right = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)([
      { x: width + tabWidth, y: 0 },
      { x: width * 2, y: 0 },
      { x: width * 2, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
  };
  const d = getPath();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      translate.value,
      [0, width],
      [-width, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX: translateX }],
    };
  });

  return (
    <>
      <View {...{ height, width }}>
        <AnimatedSvg width={width * 2} {...{ height }} style={[rStyle]}>
          <Path fill={backgroundColor} {...{ d }} />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar {...{ tabs, translate }} scrollTo={scrollTo} />
        </View>
      </View>
      <SafeAreaView style={styles.container} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default observer(TabBar);
