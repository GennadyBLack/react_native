import React, { useEffect } from "react";
import {
  Pressable,
  Text,
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
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const ScrollPageComponent = ({
  data,
  children,
  header_image,
  HEADER_MAX = 250,
  HEADER_MIN = 0,
}) => {
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
        {header_image ? header_image : <Text>Hi</Text>}
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
  },
});
export default observer(ScrollPageComponent);
