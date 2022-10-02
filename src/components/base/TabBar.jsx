import React from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import {
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import * as shape from "d3-shape";
const { width } = Dimensions.get("window");
const height = 64;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

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
    { x: width + 15, y: height },
    { x: width + tabWidth - 15, y: height },
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

// eslint-disable-next-line react/prefer-stateless-function
const TabBar = (props) => {
  const value = new Animated.Value(0);

  const translateX = value.interpolate({
    inputRange: [0, width],
    outputRange: [-width, 0],
  });
  return (
    <>
      <View {...{ height, width }}>
        <AnimatedSvg
          width={width * 2}
          {...{ height }}
          style={{ transform: [{ translateX }] }}
        >
          <Path fill={backgroundColor} {...{ d }} />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          {/* <StaticTabbar {...{ tabs, value }} /> */}
        </View>
      </View>
      <SafeAreaView style={styles.container} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});

export default TabBar;
// const TabBar = (links = ["d", "q", "d", "d"]) => {
//   const tabWidth = width / links.length;

//   const AnimatedSvg = Animated.createAnimatedComponent(Svg);
//   const tab = shape
//     .line()
//     .x((d) => d.x)
//     .y((d) => d.y)
//     .curve(shape.curveBasis)([
//     { x: width, y: 0 },
//     { x: width + 5, y: 0 },
//     { x: width + 10, y: 10 },
//     { x: width + 15, y: height },
//     { x: width + tabWidth - 15, y: height },
//     { x: width + tabWidth - 10, y: 10 },
//     { x: width + tabWidth - 5, y: 0 },
//     { x: width + tabWidth, y: 0 },
//   ]);
//   const left = shape
//     .line()
//     .x((d) => d.x)
//     .y((d) => d.y)([
//     { x: 0, y: 0 },
//     { x: width, y: 0 },
//   ]);
//   const right = shape
//     .line()
//     .x((d) => d.x)
//     .y((d) => d.y)([
//     { x: width + tabWidth, y: 0 },
//     { x: width * 2, y: 0 },
//     { x: width * 2, y: height },
//     { x: 0, y: height },
//     { x: 0, y: 0 },
//   ]);

//   const d = `${left} ${tab} ${right}`;
//   console.log(d, "DDD");
//   return (
//     <View>
//       <AnimatedSvg
//         width={width * 2}
//         {...{ height }}
//         style={{ transform: [{ translateX: -100 }] }}
//       >
//         <Path {...{ d }} fill="white" />
//       </AnimatedSvg>
//       <SafeAreaView style={{ backgroundColor: "white" }} />
//     </View>
//   );
// };

// export default TabBar;
