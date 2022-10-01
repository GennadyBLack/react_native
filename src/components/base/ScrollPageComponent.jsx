import React, { useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate, Extrapolate,
} from "react-native-reanimated";

const HEADER_MAX = 200,
  HEADER_MIN = 30;
const ScrollPageComponent = ({ data, children }) => {
  const translateY = useSharedValue(0);

  const rHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      translateY.value,
      [0, HEADER_MAX - HEADER_MIN],
      [HEADER_MAX, HEADER_MIN],
        Extrapolate.CLAMP
    );
    return { height: height };
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateY.value = e.contentOffset.y;
    },
  });
  return (
    <SafeAreaView>
      <Animated.View style={[rHeaderStyle, styles.header]}>
        <Text>Hi</Text>
      </Animated.View>
      <Animated.ScrollView
        style={data?.wrapper_style ?? {}}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {children}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const ScrollPageHeader = () => {};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
export default observer(ScrollPageComponent);
