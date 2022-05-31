import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { useRoute } from "@react-navigation/native";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";

export default observer(QuestionForm);

function QuestionForm({ navigation, hideModal }) {
  const [question] = useStore("question");
  const route = useRoute();
  console.log(route);
  const submit = async (e) => {
    console.log(e);
    await question.create(route?.params?.id, e);
    hideModal();
  };
  return (
    <View style={styles.wrap}>
      <>
        <Form onSubmit={submit}>
          <Form.Input
            name="title"
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
