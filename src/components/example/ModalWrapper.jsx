import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";

const ModalWrapper = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.containerModal}>
        {children}
        <BottomSheet />
        <View nativeID="modal-root"> </View>
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
    position: "initial",
  },
});

export default ModalWrapper;
