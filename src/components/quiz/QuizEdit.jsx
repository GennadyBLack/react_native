import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Paragraph, Title } from "react-native-paper";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import QuestionModal from "../question/QuestionModal";
import QuestionItemList from "../question/QuestionItemList";

export default observer(QuizEdit);

function QuizEdit({ route, navigation }) {
  const [quiz, result] = useStore("quiz", "result");
  const [question] = useStore("question");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    quiz.get(route?.params?.id);
  }, []);

  const submit = async (e) => {
    const pre = prepareEdit(e, quiz?.quiz);
    if (Object.keys(pre).length) {
      await quiz.update(route?.params?.id, pre);
      setIsEdit(false);
      await quiz.get(route?.params?.id);
    }
    navigation.navigate("quiz_list");
    // if (Object.keys(pre).length) quiz.update(route?.params?.id, pre);
  };
  let remove = async (id, itemId) => {
    await question?.delete(id, itemId);
  };

  let quizRemove = async (id) => {
    console.log(id);
    await quiz?.delete(id);
  };
  let clearResults = async () => {
    await result?.clearResults();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    // onPress={() => navigation.navigate("quiz_edit", { id: item.id })}
    >
      <QuestionItemList
        key={item.id}
        question={item}
        index={item.id}
        edit={true}
        onDelete={() => remove(item.id)}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrap}>
      {!isEdit ? (
        <>
          <Title>{quiz?.quiz?.title || "Название отсутствует"}</Title>
          <Text>
            {quiz?.quiz?.questions?.length
              ? `${quiz?.quiz?.questions?.length} questions`
              : "no questions yet"}
          </Text>
          <Paragraph>{quiz?.quiz?.desc || "Описание отсутствует"}</Paragraph>
        </>
      ) : null}
      {isEdit ? (
        <>
          <Form onSubmit={submit} defaultValues={quiz?.quiz}>
            <Form.Input
              placeholder="title"
              name="title"
              rules={{
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения чудик",
                },
                min: { value: 3, message: "Больше 3" },
              }}
            />
            <Form.Input
              placeholder="desc"
              name="desc"
              rules={{
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения чудик",
                },
                max: { value: 250, message: "меньше 250" },
              }}
            />
            <Form.Input
              name="time"
              placeholder="time on answer"
              rules={{
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения чудик",
                },
                max: { value: 250, message: "меньше 250" },
              }}
            />
          </Form>
          <FlatList
            data={quiz?.quiz?.questions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <QuestionModal />
        </>
      ) : null}

      {!isEdit ? (
        <Button
          title="Редактировать"
          onPress={setIsEdit.bind(null, !isEdit)}
        ></Button>
      ) : null}
      <Button
        style={styles.deleteBtn}
        title="Удалить"
        onPress={() => quizRemove(quiz?.quiz?.id)}
      ></Button>
      <Button
        style={styles.deleteBtn}
        title="Очистить результаты"
        onPress={clearResults}
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    // width: "90%",
    // margin: "5%",
    // paddingTop: 5,
    height: "100%",
  },
  deleteBtn: {
    marginTop: 15,
    backgroundColor: "red",
  },
});
