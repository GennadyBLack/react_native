import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";

export default observer(QuestionForm);

function QuestionForm({ route, navigation, question }) {
  const [quiz] = useStore("quiz");

  const submit = async (e) => {
    const pre = prepareEdit(e, quiz?.currentquiz);
    if (Object.keys(pre).length) {
      await quiz.update(route?.params?.id, pre);
    }
  };
  return (
    <View style={styles.wrap}>
      <>
        <Form onSubmit={submit} defaultValues={question}>
          <Form.Input
            name="question"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              min: { value: 3, message: "Больше 3" },
            }}
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
});
