import React, { useEffect, useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Portal from "./Portal";
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
import { PortalGate } from "./PortalNative";
import PortalContext from "../../contexts/portalContext";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

const BottomSheet = ({ children }) => {
  const [modal] = useStore("modal");
  const portal = useContext(PortalContext);
  const modalOpen = modal.getIsOpen;
  const modalData = modal.getData;
  const modalParams = modal.getParams;
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const context = useSharedValue({ y: 0 });

  console.log(modalOpen, "modalOpen");
  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const initModal = () => {
    const { toTop, toMiddle, toBottom } = modalParams;
    if (toTop || toMiddle || toBottom) {
      toTop ? scrollTo(MAX_TRANSLATE_Y) : null;
      toMiddle ? scrollTo(MAX_TRANSLATE_Y / 2) : null;
      toBottom ? scrollTo(MAX_TRANSLATE_Y / 3) : null;
    } else {
      scrollTo(MAX_TRANSLATE_Y / 3);
    }
  };

  const clearData = () => {
    context.value.y = 0;
    scrollTo(-SCREEN_HEIGHT / 3);
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
        scrollTo(0);
        closeModa();
        clearData();
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(-SCREEN_HEIGHT);
      }
    });

  useEffect(() => {
    initModal();

    return () => modal.clearData();
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

  const content = modalOpen ? (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomContainer, rBottonStyle]}>
        <View style={styles.line}></View>
        <View>{children}</View>
      </Animated.View>
    </GestureDetector>
  ) : null;

  useEffect(() => {
    modalOpen
      ? portal.teleport("modal-root", content)
      : portal.destroy("modal-root");
  }, [modalOpen]);

  return <></>;
  // return <Portal>{content}</Portal>;
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
