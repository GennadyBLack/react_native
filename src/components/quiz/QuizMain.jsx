import React, { useEffect } from "react";
import { Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

export default observer(QuizMain);

function QuizMain({ route }) {
  const [quiz] = useStore("quiz");

  useEffect(() => {
    quiz.get(route?.params?.id);
  }, []);
  console.log(quiz?.quiz, "quiz");
  return (
    <>
      <Text>HERE</Text>
    </>
  );
}
