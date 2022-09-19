import React, { useEffect, useCallback } from "react";

import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

import { toJS } from "mobx";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

const BottomSheet = ({ children, onOpacityChange }) => {
  const active = useSharedValue(false);
  const [modal] = useStore("modal");
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback((destination) => {
    "worklet";
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  const initModal = (modalParams) => {
    scrollTo(MAX_TRANSLATE_Y / 2);
    // onOpacityChange(0.1);
    // const { toTop, toMiddle, toBottom } = modalParams;
    // if (toTop || toMiddle || toBottom) {
    //   toTop ? scrollTo(MAX_TRANSLATE_Y) : null;
    //   toMiddle ? scrollTo(MAX_TRANSLATE_Y / 2) : null;
    //   toBottom ? scrollTo(MAX_TRANSLATE_Y / 3) : null;
    // } else {
    //   scrollTo(MAX_TRANSLATE_Y / 2);
    // }
  };

  const toggleModal = useCallback((modalParams = {}) => {
    "worklet";
    if (!isActive()) {
      initModal(modalParams);
    } else {
      context.value = { y: 0 };
      scrollTo(0);
    }
  }, []);

  // useImperativeHandle(ref, () => ({ toggleModal, isActive, content }), [
  //   toggleModal,
  // ]);
  useEffect(() => {
    modal.setScrollFn(toggleModal);
  });

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      context.value = { y: translateY?.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context?.value?.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      try {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          context.value = { y: 0 };
          scrollTo(0);
          // onOpacityChange(1);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(-SCREEN_HEIGHT);
          // onOpacityChange(0.1);
        }
      } catch (error) {
        console.log(error);
      }
    });

  const rBottonStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y, MAX_TRANSLATE_Y + 50],
      [5, 25],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      shadowOpacity: active.value ? 1 : 0,
      transform: [{ translateY: translateY.value }],
    };
  });

  const content = (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomContainer, rBottonStyle]}>
        <View style={styles.line}></View>
        <View>{toJS(modal?.getContent)}</View>
      </Animated.View>
    </GestureDetector>
  );
  return content;
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    // shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
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
