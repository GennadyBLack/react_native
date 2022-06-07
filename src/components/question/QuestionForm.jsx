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
  const [question, answer] = useStore("question", "answer");
  const [rightId, setRightId] = useState(false);
  const route = useRoute();
  console.log(route);

  const submit = async (e) => {
    console.log(e);
    await question.create(route?.params?.id, {
      title: e.question,
    });
    for (const ans of e.answers) {
      console.log(ans.id, rightId);
      await answer.create({
        id: question?.question?.id,
        data: {
          title: ans.title,
          right: ans.id == rightId,
        },
      });
    }

    hideModal();
  };

  return (
    <View style={styles.wrap}>
      <>
        <Form onSubmit={submit}>
          <Form.Input
            style={styles.mb2}
            name="question"
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
          <FieldArray
            name="answers"
            appendBtn="Добавить ответ"
            label="Верный ответ"
            switchAction={setRightId}
          />
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
