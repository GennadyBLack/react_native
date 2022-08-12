import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import useStore from "../../hooks/useStore";

export default function QuizQuestionItem({ data, next }) {
  let [result, quiz] = useStore("result", "quiz");
  useEffect(() => {
    // console.log(quiz.quiz.id, "quiz");
    // console.log(result, "result");
    const fetchResult = async () => {
      await result.getAll({
        params: {
          filter: {
            quizId: 2,
            userId: 1,
          },
          limit: 100,
        },
      });
    };
    const createResult = async () => {
      await result.create({ quizId: quiz?.quiz?.id });
    };
    // const createResult = async () => {
    //   await result.create({ quizId: quiz?.quiz?.id });
    // };
    fetchResult();
    const resultList = result?.result_list;
    if (!resultList?.length) {
      createResult();
    }
    // if (!result?.result?.id) {
    // }
  }, []);

  let mappedAnswers = data?.answers
    ? data.answers.map((item, index) => {
        return <Answer answer={item} key={index} next={next} result={result} />;
      })
    : null;

  return <>{mappedAnswers}</>;
}

function Answer({ answer, next, result }) {
  let setQuiestionResult = async (answer) => {
    const resultObj = result?.result;
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
