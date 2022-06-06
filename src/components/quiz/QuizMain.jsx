import React, { useEffect } from "react";
import { Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Tabulator from "../Tabulator";
import QuizQuestionItem from "./QuizQuestionItem";

export default observer(QuizMain);

function QuizMain({ route }) {
  const [quiz] = useStore("quiz");

  useEffect(() => {
    quiz.get(route?.params?.id);
  }, []);
  return (
    <>
      {quiz?.quiz && (
        <Tabulator Content={QuizQuestionItem} tabs={quiz?.quiz?.questions} />
      )}
    </>
  );
}
