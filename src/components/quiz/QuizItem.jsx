import React from "react";
import { View, Text } from "react-native";

export default function QuizItem({ quiz }) {
  console.log(quiz, "quizALIII");
  return (
    <View>
      <Text>{quiz?.title}</Text>
      <Text>{quiz?.createdAt}</Text>
    </View>
  );
}
