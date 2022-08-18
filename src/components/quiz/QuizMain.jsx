import React, { useEffect } from "react";
import { Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Tabulator from "../Tabulator";
import QuizQuestionItem from "./QuizQuestionItem";
import QuizQuestionHeader from "./QuizQuestionHeader";

export default observer(QuizMain);

function QuizMain({ navigation, route }) {
  const [quiz] = useStore("quiz");
  let redirectToResultPage = (id) => {
    // navigation.navigate("Result", { id: id });
    navigation.navigate("quiz_result");
  };

  useEffect(() => {
    quiz.get(route?.params?.id);
  }, []);
  return (
    <>
      {quiz?.quiz && (
        <Tabulator
          lastFunction={redirectToResultPage}
          Content={QuizQuestionItem}
          tabs={quiz?.quiz?.questions}
          Header={QuizQuestionHeader}
        />
      )}
    </>
  );
}
