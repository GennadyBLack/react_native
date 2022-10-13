import React, { useEffect } from "react";
import { Pressable, Text, View, SafeAreaView, StyleSheet } from "react-native";
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
  footerMenu,
  data,
  children,
  headerImage,
  headerMenu,
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
        {headerImage ? headerImage : <Text>Hi</Text>}
        <View
          style={{
            width: "100%",
            height: 20,
            position: "absolute",
            bottom: 20,
          }}
        >
          {headerMenu ? headerMenu : <Text></Text>}
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={[data?.wrapper_style ?? {}, styles.content]}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {children}
        {footerMenu ? footerMenu : <Text></Text>}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const ScrollPageHeader = () => {};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
  },
  content: {
    backgroundColor: "#eeeeee",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
export default observer(ScrollPageComponent);
