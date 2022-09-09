import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ColorPicker = (props) => {
  return (
    <View>
      <LinearGradient {...props}></LinearGradient>
      <View style={styles.picker} />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {},
});

export default ColorPicker;
