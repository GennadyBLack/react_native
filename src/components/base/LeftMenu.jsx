import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Entypo } from "@expo/vector-icons";

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import useStore from "../../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../profile/ProfileHeader";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const deleteVar = 1.3;
const LeftMenu = () => {
  const [menu] = useStore("menu");
  const [auth] = useStore("auth");
  const navigation = useNavigation();
  const routeState = navigation?.getRootState();
  useEffect(() => {
    console.log(navigation?.getRootState(), "navigation");
  }, []);
  const active = useSharedValue(false);

  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      active.value,
      [true, false],
      [0, -SCREEN_WIDTH / deleteVar - 1],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX: translateX }],
    };
  });

  const bStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      active.value,
      [true, false],
      [0, -SCREEN_WIDTH],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX: translateX }],
    };
  });

  const toggleMenu = useCallback(() => {
    "worklet";
    active.value = !active.value;
  }, []);

  return (
    <Animated.View style={[styles.back, bStyle]}>
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
              {!active.value && (
                <Entypo name="dots-three-vertical" size={24} color="black" />
              )}
            </Animated.View>
          </TouchableHighlight>
        </View>
      ) : (
        <Text></Text>
      )}

      <TouchableHighlight
        style={{ backgroundColor: "black", flex: 1, opacity: 0.1 }}
        onPress={() => {
          toggleMenu();
        }}
      >
        <Text></Text>
      </TouchableHighlight>

      <Animated.View style={[styles.left_menu_wrapper, rStyle]}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
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
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  left_menu_wrapper: {
    flex: 1,
    width: SCREEN_WIDTH / deleteVar,
    height: SCREEN_HEIGHT,
    backgroundColor: "#eee",
    position: "absolute",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  back: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
  },
  menu_link: {
    fontSize: 15,
  },
});

export default observer(LeftMenu);
