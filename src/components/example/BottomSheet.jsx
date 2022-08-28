import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CLOSE_HEIGHT = 50;

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

const BottomSheet = ({}) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const context = useSharedValue({ y: 0 });

  const [modal] = useStore("modal");
  const modalOpen = modal.getIsOpen;

  const clearData = () => {
    context.value.y = 0;
    translateY.value = -SCREEN_HEIGHT / 3;
  };

  const closeModa = () => {
    modal.setClose();
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      context.value.y = translateY?.value;
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context?.value?.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        translateY.value = withSpring(0, { damping: 50 });
        closeModa();
        clearData();
      }
    });

  useEffect(() => {
    translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 });
  }, []);

  const rBottonStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y, MAX_TRANSLATE_Y + 50],
      [5, 25],
      Extrapolate.CLAMP
    );
    return { borderRadius, transform: [{ translateY: translateY.value }] };
  });
  return modalOpen ? (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomContainer, rBottonStyle]}>
        <View style={styles.line}></View>
        <div id="modal-root">asdas</div>
      </Animated.View>
    </GestureDetector>
  ) : null;
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 3,
  },
});

export default observer(BottomSheet);
