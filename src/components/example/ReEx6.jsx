import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("window");
export default function ReEx6() {
  return (
    <View style={styles.container}>
      <TapGestureHandler
        onActivated={() => {
          console.log("ALOOOO");
        }}
      >
        <Image
          source={{ uri: "https://html5css.ru/css/img_lights.jpg" }}
          style={styles.image}
        />
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
