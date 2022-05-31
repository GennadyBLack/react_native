import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Badge } from "react-native-paper";

export default function QuizItem({ quiz }) {
  return (
    <View style={styles.item_container}>
      <Text>{quiz?.title}</Text>
      <Text>{quiz?.createdAt}</Text>
      <Badge>{quiz?.questions?.length || 0}</Badge>
    </View>
  );
}

const styles = StyleSheet.create({
  item_container: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
});
