import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalGate } from "./PortalNative";

const ModalWrapper = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <StatusBar />
      <View style={styles.containerModal}>
        {children}
        <PortalGate gateName={"modal-root"} />
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
