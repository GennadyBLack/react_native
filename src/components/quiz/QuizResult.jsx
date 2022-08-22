import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useStore from "../../hooks/useStore";

export default function QuizResult({ navigation, route }) {
  const [result, quiz] = useStore("result", "quiz");
  const [fullResult, setFullResult] = useState(null);
  const [quizFail, setQuizFailed] = useState(null);

  useEffect(() => {
    const getResult = async () => {
      await result.update(result?.result?.id, { completed: true });
      await result.get(result?.result?.id);
      // console.log(result.result, "resultino");
      // setFullResult(res?.data);
      setFullResult(result.result);
      setQuizFailed(result?.result?.wrong && result?.result?.wrong?.length > 0);
    };
    getResult();
  }, []);
  console.log(fullResult, "fullResult");
  console.log(quizFail, "quizFail");
  console.log(route.params.id);

  return (
    <View style={styles.quizWrap}>
      <Text style={styles.textH3}>
        Верных ответов: {fullResult?.right || ""}
      </Text>
      <Text style={styles.textH3}>
        Неправильных ответов: {fullResult?.wrong || ""}
      </Text>
      <Text style={styles.textH2}>
        {quizFail ? "Вы не прошли квиз" : "Поздравляем, вы прошли квиз!"}
      </Text>
      {quizFail && (
        <TouchableOpacity
          style={styles.button}
          title="Пройти заново"
          onPress={() => {
            quiz.start(route.params.id, { restart: true });
            navigation.navigate("quiz_start", {
              id: route.params.id,
              restart: true,
            });
          }}
        >
          <Text>Пройти заново</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  quizWrap: {
    width: "90%",
    marginInline: "auto",
    paddingTop: 5,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textH3: {
    fontSize: "1.2rem",
    marginVertical: "5",
  },
  textH2: {
    fontSize: "1.6rem",
    marginVertical: "5",
  },
  button: {
    marginTop: "10",
    alignItems: "center",
    backgroundColor: "#028DFFFF",
    // width: "150",
    textAlign: "center",
    padding: 10,
  },
});
