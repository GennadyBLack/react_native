import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import useStore from "../../hooks/useStore";
import Icon from "./Icon";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const LeftMenu = () => {
  const [menu] = useStore("menu");

  useEffect(() => {
    console.log(menu.leftRoutes, "menu");
  }, []);
  const active = useSharedValue(false);
  const translateX = useDerivedValue(() => {
    return active.value ? withSpring(0) : withSpring(-SCREEN_WIDTH / 1.5);
  });

  const menuToggler = useAnimatedGestureHandler({
    onStart: () => {
      active.value = !active.value;
    },
    onActive: () => {},
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Animated.View style={[styles.left_menu_wrapper, rStyle]}>
      <TapGestureHandler onGestureEvent={menuToggler}>
        <View
          style={{
            position: "absolute",
            top: 10,
            right: -50,
          }}
        >
          {active.value ? (
            <Icon source={Icon.sources.base.menu_on} />
          ) : (
            <Icon source={Icon.sources.base.menu_off} />
          )}
        </View>
      </TapGestureHandler>
      <View>
        <Text>Ytt</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  left_menu_wrapper: {
    flex: 1,
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT,
    backgroundColor: "#EEE",
    position: "absolute",
  },
});
export default observer(LeftMenu);
