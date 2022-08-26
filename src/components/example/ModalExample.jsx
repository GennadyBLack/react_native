import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";

const ModalExample = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.containerModal}>
        <Text style={{ color: "white" }}>Hi meeeeeen</Text>
        <StatusBar style="light" />
        <BottomSheet />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "initial",
  },
});

export default ModalExample;
