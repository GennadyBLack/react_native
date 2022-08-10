import React, {useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";

import useStore from "../../hooks/useStore";

export default function QuizQuestionItem({ data, next }) {
    let [result] = useStore("result");
   useEffect(() => {
       const resultId = result?.result?.id;
       if (!resultId) {
           await result.create(result.result.id, preData);
       }
   })

  let mappedAnswers = data?.answers
    ? data.answers.map((item, index) => {
        return <Answer answer={item} key={index} next={next} resultId={} quizId={} />;
      })
    : null;

  return <>{mappedAnswers}</>;
}

function Answer({ answer, next, resultId, quizId }) {

  let setQuiestionResult = async (answer) => {
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
      preData.right = result?.result?.right
        ? [...result.result.right, answer.id]
        : [answer.id];
    } else {
      preData.wrong = result?.result?.wrong
        ? [...result.result.wrong, answer.id]
        : [answer.id];
    }

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
