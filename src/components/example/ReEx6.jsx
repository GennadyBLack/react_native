import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  ImageBackground,
} from "react-native";
import Icon from "../base/Icon";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";
const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width: SIZE } = Dimensions.get("window");
export default function ReEx6() {
  const doubleTapRef = useRef();

  const opacity = useSharedValue(true);

  const scale = useSharedValue(0);

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          onSingleTap();
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            onDoubleTap();
          }}
        >
          <Animated.View>
            <ImageBackground
              source={{ uri: "https://html5css.ru/css/img_lights.jpg" }}
              style={styles.image}
            >
              <AnimatedImage
                source={Icon.sources.base.heartFill}
                style={[
                  styles.heart,
                  {
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.35,
                    shadowRadius: 35,
                  },
                  rStyle,
                ]}
                resizeMode={"center"}
              />
            </ImageBackground>
            <Animated.Text style={[styles.turtles, rTextStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    width: SIZE / 2,
    height: SIZE / 2,
  },
  turtles: { fontSize: 40, textAlign: "center", marginTop: 30 },
});
