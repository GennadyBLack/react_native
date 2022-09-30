import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import { toJS } from "mobx";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

const ModalSheet = ({ visible, children, toggle, startAt }) => {
  const translateY = useSharedValue(0);
  const modalHeight = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const attached = useSharedValue(false);
  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
    console.log(translateY.value, "end");
    modalHeight.value = -destination;
  }, []);

  const getStartDestination = useCallback(() => {
    try {
      return startAt ? MAX_TRANSLATE_Y / startAt : MAX_TRANSLATE_Y / 2;
    } catch (error) {
      console.log(error);
    }
  }, [startAt]);

  useEffect(() => {
    visible ? scrollTo(getStartDestination()) : scrollTo(0);
  }, [visible]);

  const gesture = Gesture.Pan()
    .minDistance(25)
    .onTouchesDown((e) => {
      console.log(e, "touchDown");
    })
    .onBegin((e) => {
      context.value = { y: translateY?.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context?.value?.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      modalHeight.value = -translateY.value;
    })
    .onEnd(() => {
      try {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          attached.value = true;
          context.value = { y: 0 };
          scrollTo(0);
          runOnJS(toggle)();
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          attached.value = false;
          scrollTo(-SCREEN_HEIGHT);
        }
        // console.log(modalHeight.value, "modalHeight");
      } catch (error) {
        console.log(error);
      }
    });

  const ExampleWithHoc = gestureHandlerRootHOC(({ children }) => (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={runOnJS(toggle)} nativeID={"touchable-HATACHOUBLE"}>
        <View style={styles.backdrop}></View>
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomContainer, rBottonStyle]}>
          <View style={styles.line}></View>
          {toJS(children)}
        </Animated.View>
      </GestureDetector>
    </View>
  ));

  const rBottonStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y, MAX_TRANSLATE_Y + 50],
      [5, 25],
      Extrapolate.CLAMP
    );

    return {
      borderTopRightRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
      shadowOpacity: visible ? 1 : 0,
      transform: [{ translateY: translateY.value }],
      height: modalHeight.value,
    };
  });

  return (
    visible && (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          runOnJS(toggle)();
        }}
      >
        <ExampleWithHoc children={children} style={{ flex: 1, height: 350 }} />
      </Modal>
    )
  );
};

const useModal = () => {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };
  return [active, toggle, SCREEN_HEIGHT];
};

const styles = StyleSheet.create({
  bottomContainer: {
    // height: 250,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    // borderTopRightRadius: 25,
    // borderTopLeftRadius: 25,
    // borderRadius: 25,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 20 },
    // shadowRadius: 40,
    elevation: 10,

    paddingTop: 35,
    paddingHorizontal: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    // marginVertical: 15,
    borderRadius: 3,
    position: "absolute",
    top: 15,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    // flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

ModalSheet.useModal = useModal;

export default ModalSheet;
