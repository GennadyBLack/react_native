import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function QuizQuestionItem({ data, next }) {
  let mappedAnswers = data?.answers
    ? data.answers.map((item, index) => {
        return <Answer answer={item} key={index} next={next} />;
      })
    : null;

  return <>{mappedAnswers}</>;
}

function Answer({ answer, next }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log(answer);
          next();
        }}
      >
        <View
          style={{
            height: 70,
            backgroundColor: "white",
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{answer?.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
