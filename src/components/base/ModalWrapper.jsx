import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalGate } from "./PortalNative";

const ModalWrapper = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.containerModal}>
        {children}
        <PortalGate gateName={"modal-root"}></PortalGate>
        {/*<View nativeID="modal-root"></View>*/}
      </View>
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

export default ModalWrapper;
