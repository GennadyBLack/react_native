import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import useStore from "../../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import QuizList from "./QuizList";

export default function QuizQuestionItem({ data, next }) {
  const navigation = useNavigation();
  let mappedAnswers = data?.answers
    ? data.answers.map((item, index) => {
        return <Answer answer={item} key={index} next={next} />;
      })
    : null;

  return (
    <>
      {mappedAnswers}{" "}
      <Button
        onPress={() => navigation.navigate("register")}
        title="VADIM IS GAY"
      ></Button>
    </>
  );
}

function Answer({ answer, next }) {
  const [result] = useStore("result");
  let setQuiestionResult = async (answer) => {
    const resultObj = result?.result;
    console.log(resultObj, "resultObj");
    let preData = {};

    // if(answer?.right){
    //   preData

    // }

    // answer?.right
    //   ? (preData.right = result?.result?.right
    //       ? [...result.result.right, answer.id]
    //       : [answer.id])
    //   : (preData.wrong = result?.result?.wrong
    //       ? [...result.result.wrong, answer.id]
    //       : [answer.id]);
    // тяжело читать :(

    if (answer?.right) {
      preData.right = resultObj?.right
        ? [...resultObj.right, answer.id]
        : [answer.id];
    } else {
      preData.wrong = resultObj?.wrong
        ? [...resultObj.wrong, answer.id]
        : [answer.id];
    }

    await result.update(resultObj.id, preData);
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
