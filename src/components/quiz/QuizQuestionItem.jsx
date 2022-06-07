import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import useStore from "../../hooks/useStore";

export default function QuizQuestionItem({ data, next }) {
  let mappedAnswers = data?.answers
    ? data.answers.map((item, index) => {
        return <Answer answer={item} key={index} next={next} />;
      })
    : null;

  return <>{mappedAnswers}</>;
}

function Answer({ answer, next }) {
  let [result] = useStore("result");
  let setQuiestionResult = async (answer) => {
    let preData = {};

    // if(answer?.right){
    //   preData

    // }

    answer?.right
      ? (preData.right = [
          result?.result?.right ? result.result.right : null,
          answer.id,
        ])
      : (preData.wrong = [
          result?.result?.wrong ? result.result.wrong : null,
          answer.id,
        ]);

    await result.update(result.result.id, preData);
  };

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          await setQuiestionResult(answer);
          await next();
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
