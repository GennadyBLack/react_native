import React, { useRef } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  ImageBackground,
} from "react-native";
import Icon from "../base/Icon";
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
  const doubleTapRef = useRef();
  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log("ALOOOO");
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            console.log("DOUBLE TAP");
          }}
        >
          <ImageBackground
            source={{ uri: "https://html5css.ru/css/img_lights.jpg" }}
            style={styles.image}
          >
            <Icon source={Icon.sources.base.heartFill} />
          </ImageBackground>
        </TapGestureHandler>
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
