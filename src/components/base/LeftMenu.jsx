import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import useStore from "../../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//https://icons.expo.fyi/
import { AntDesign } from "@expo/vector-icons";
import ProfileHeader from "../profile/ProfileHeader";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const LeftMenu = () => {
  const [menu] = useStore("menu");
  const [auth] = useStore("auth");
  const navigation = useNavigation();

  useEffect(() => {}, []);
  const active = useSharedValue(false);
  const translateX = useSharedValue(-SCREEN_WIDTH / 1.5);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      shadowOpacity: active.value ? 1 : 0,
    };
  });

  const toggleMenu = useCallback(() => {
    "worklet";
    active.value = !active.value;
    active.value
      ? (translateX.value = 0)
      : (translateX.value = withSpring(-SCREEN_WIDTH / 1.5));
  }, []);

  return (
    <Animated.View style={[styles.left_menu_wrapper, rStyle]}>
      <StatusBar />
      {menu?.leftRoutes?.length ? (
        <View
          style={{
            position: "absolute",
            top: 10,
            right: -50,
          }}
        >
          <TouchableHighlight
            onPress={() => {
              toggleMenu();
            }}
          >
            <Animated.View>
              {active.value ? (
                <AntDesign name="closecircle" size={40} color="black" />
              ) : (
                <Ionicons name="menu" size={40} color="black" />
              )}
            </Animated.View>
          </TouchableHighlight>
        </View>
      ) : (
        <Text>null</Text>
      )}
      <Animated.View style={{ flex: 1, justifyContent: "space-between" }}>
        <ProfileHeader />
        <View>
          {menu?.leftRoutes.map((item, idx) => {
            return (
              <TouchableHighlight
                key={idx}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                  padding: 10,
                }}
                onPress={() => {
                  navigation.navigate(item?.name);
                  toggleMenu();
                }}
              >
                <Text style={styles.menu_link}>{item?.name}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
        <View>
          <TouchableHighlight
            onPress={() => {
              auth.logout();
              toggleMenu();
            }}
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.menu_link}>Logout</Text>
          </TouchableHighlight>
        </View>
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  menu_link: {
    // backgroundColor:,

    // fontSize: 20,
    fontSize: 15,
    // fontWeight: 700,
  },
});

export default observer(LeftMenu);
