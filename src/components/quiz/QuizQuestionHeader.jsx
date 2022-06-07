import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function QuizQuestionHeader({ data }) {
  return (
    <View style={styles.question_header}>
      <Text>{data?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  question_header: {
    backgroundColor: "#03a9f4",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
