import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
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

const WORDS = ["WHATs", "Up", "Bitch", "mafka", "Soon"];
const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

const ReEx3 = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={styles.containerR3}
      horizontal
      onScroll={scrollHandler}
    >
      {WORDS.map((item, idx) => {
        return (
          <Page
            key={idx}
            title={item}
            index={idx}
            translateX={translateX}
          ></Page>
        );
      })}
    </Animated.ScrollView>
  );
};

const Page = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return { transform: [{ scale: scale }], borderRadius };
  });

  const rText = useAnimatedStyle(() => {
    const translate = interpolate(
      translateX.value,
      inputRange,
      [200, 0, -200],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: translate }],
    };
  });
  return (
    <View
      style={[styles.page, { backgroundColor: `rgba(0,0,256,0.${index})` }]}
    >
      <Animated.View
        style={[
          { position: "absolute" },
          rText,
          rStyle,
          styles.square,
          { backgroundColor: `rgba(0,0,256,0.${index * 2})` },
        ]}
      >
        <Text style={[styles.text]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerR3: {
    flex: 1,
  },
  page: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default ReEx3;
