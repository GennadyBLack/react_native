import React, { useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";
import useStore from "../../hooks/useStore";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { observer } from "mobx-react";
import LeftMenu from "./LeftMenu";

const ModalWrapper = ({ children, props }) => {
  const opacity = useSharedValue(1);

  const mainWrappStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <StatusBar />
      <Animated.View style={[styles.containerModal, mainWrappStyle]}>
        {children}
      </Animated.View>
      <LeftMenu />
      {/* <BottomSheet></BottomSheet> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    color: "white",

    // position: "initial",
  },
});

export default observer(ModalWrapper);
