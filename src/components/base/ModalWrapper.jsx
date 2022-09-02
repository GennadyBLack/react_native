import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ModalWrapper = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.containerModal}>
        {children}
        <View nativeID="modal-root"></View>
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
