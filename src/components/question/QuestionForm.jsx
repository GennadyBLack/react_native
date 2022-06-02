import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { useRoute } from "@react-navigation/native";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import FieldArray from "../validation/FieldArray";

export default observer(QuestionForm);

function QuestionForm({ navigation, hideModal }) {
  const [question] = useStore("question");
  const [answers, setAnswers] = useState([]);
  const route = useRoute();
  console.log(route);
  const submit = async (e) => {
    console.log(e);
    // await question.create(route?.params?.id, e);
    hideModal();
  };

  const answerInputs = answers?.map((answer, index) => (
    <Form.Input
      name={`title${index}`}
      key={answer.id}
      label={`Введите ответ # ${index + 1}`}
      rules={{
        required: {
          value: true,

          message: "Это поле обязательно для заполнения чудик",
        },
        min: { value: 3, message: "Больше 3" },
      }}
    />
  ));

  return (
    <View style={styles.wrap}>
      <>
        <Form onSubmit={submit}>
          <Form.Input
            style={styles.mb2}
            name="title"
            mode="outlined"
            label="Введите вопрос"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              min: { value: 3, message: "Больше 3" },
            }}
          />
          <FieldArray name="answers" />
          {/*{answerInputs}*/}
          {/*<Button*/}
          {/*  title="Добавить ответ"*/}
          {/*  onPress={(e) =>*/}
          {/*    setAnswers([*/}
          {/*      ...answers,*/}
          {/*      {*/}
          {/*        quizId: route?.params?.id,*/}
          {/*        id: answers?.length + 1 || 1,*/}
          {/*        value: "",*/}
          {/*      },*/}
          {/*    ])*/}
          {/*  }*/}
          {/*/>*/}
        </Form>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
  },
  mb2: {
    marginBottom: "2%",
  },
});
