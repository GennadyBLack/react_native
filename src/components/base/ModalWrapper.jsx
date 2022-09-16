import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react";

const ModalWrapper = ({ children }) => {
  // const ref = useRef(null);
  // const [modal] = useStore("modal");
  //
  // useEffect(() => {
  //   console.log(modal);
  //   modal.setModal(ref.current.content);
  //   modal.setScrollFn(ref.current.toggleModal);
  // }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <StatusBar />
      <View style={styles.containerModal}>{children}</View>
      <BottomSheet>
        <Text>asdsdfsdf</Text>
      </BottomSheet>
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
