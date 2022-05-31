import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
export default observer(QuizCurrent);

function QuizCurrent({ route, navigation }) {
  const [quiz] = useStore("quiz");
  useEffect(() => {
    quiz.get(route?.params?.id);
  }, []);

  return (
    <View>
      <Text>{quiz?.title ?? "s"}</Text>
      <Button
        title="edit"
        onPress={() => navigation.navigate("quiz_edit", { id: quiz?.id })}
      />
    </View>
  );
}
