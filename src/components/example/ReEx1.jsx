import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100;

const ReEx1 = () => {
  const proccess = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(20);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: proccess.value,
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotate.value * 10}deg` },
      ],
    };
  }, []);
  useEffect(() => {
    proccess.value = withTiming(0.5, { duration: 5000 });
    scale.value = withRepeat(withTiming(2, { duration: 5000 }), -1, true);
    rotate.value = withRepeat(withSpring(100), -1, true);
    return () => {};
  }, []);
  return (
    <View style={styles.containerR1}>
      <Animated.View
        style={[rStyle, { backgroundColor: "blue", width: SIZE, height: SIZE }]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerR1: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
    alignItems: "center",
  },
});
export default ReEx1;
