import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, Dimensions, StyleSheet, Button } from "react-native";
import useStore from "../../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import Icon from "./Icon";
import { Ionicons } from "@expo/vector-icons";
//https://icons.expo.fyi/
import { AntDesign } from "@expo/vector-icons";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const LeftMenu = (props) => {
  const [menu] = useStore("menu");
  const [auth] = useStore("auth");
  const navigation = useNavigation();

  useEffect(() => {}, []);
  const active = useSharedValue(false);
  // console.log(menu.filteredRoutes, "menu.filteredRoutes.length");
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
      {menu?.leftRoutes.length ? (
        <TapGestureHandler onGestureEvent={menuToggler}>
          <View
            style={{
              position: "absolute",
              top: 10,
              right: -50,
            }}
          >
            {active.value ? (
              <AntDesign name="closecircle" size={40} color="black" />
            ) : (
              <Ionicons name="menu" size={40} color="black" />
            )}
          </View>
        </TapGestureHandler>
      ) : null}
      <Animated.View>
        {menu.leftRoutes.map((item, idx) => {
          return (
            <TapGestureHandler
              onGestureEvent={(...args) => {
                navigation.navigate(item?.name);
                menuToggler(...args);
              }}
              key={idx}
            >
              <View style={styles.menu_link}>
                <Text>{item?.name}</Text>
              </View>
            </TapGestureHandler>
          );
        })}
      </Animated.View>
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
  menu_link: {
    // backgroundColor:,
    padding: 10,
    // fontSize: 20,
  },
});
export default observer(LeftMenu);
