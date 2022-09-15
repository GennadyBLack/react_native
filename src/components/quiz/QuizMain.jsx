import React, { useEffect } from "react";
import { Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Tabulator from "../Tabulator";
import QuizQuestionItem from "./QuizQuestionItem";
import QuizQuestionHeader from "./QuizQuestionHeader";

export default observer(QuizMain);

function QuizMain({ navigation, route }) {
  const [quiz, result] = useStore("quiz", "result");
  let redirectToResultPage = (id) => {
    // navigation.navigate("Result", { id: id });
    navigation.navigate("quiz_result", { id: id });
  };

  useEffect(() => {
    quiz.get(route?.params?.id);
  }, [result?.result?.id]);
  return (
    <View>
      {quiz?.quiz && (
        <Tabulator
          lastFunction={() => redirectToResultPage(route?.params?.id)}
          Content={QuizQuestionItem}
          tabs={quiz?.quiz?.questions}
          Header={QuizQuestionHeader}
          resetTab
        />
      )}
    </View>
  );
}
