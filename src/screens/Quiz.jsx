import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import QuizMain from "../components/quiz/QuizMain";
import QuizCurrent from "../components/quiz/QuizCurrent";
import QuizEdit from "../components/quiz/QuizEdit";
import QuizCreate from "../components/quiz/QuizCreate";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Quiz() {
  return (
    <Navigator options={{ headerShown: false }} initialRouteName="feed">
      <Screen
        name="quiz_list"
        component={QuizMain}
        options={{ headerShown: false }}
      />
      <Screen
        name="quiz_create"
        component={QuizCreate}
        options={{ headerShown: false }}
      />
      <Screen
        name="quiz_current"
        component={QuizCurrent}
        options={{ headerShown: false }}
      />
      <Screen
        name="quiz_edit"
        component={QuizEdit}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
