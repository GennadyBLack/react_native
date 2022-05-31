import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import useStore from "../../hooks/useStore";

export default function QuizCreate({ navigation }) {
  let [quiz] = useStore("quiz");

  let [form, setForm] = useState({ title: "", desc: "" });

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let create = () => {
    quiz.create(form);
    quiz.getAll();
  };

  return (
    <View>
      <Text>quiz Create </Text>
      <TextInput
        label="Title"
        value={form?.title}
        onChangeText={(text) => setText(text, "title")}
      />
      <TextInput
        label="Description"
        value={form?.desc}
        onChangeText={(text) => setText(text, "desc")}
      />

      <Button title="Create quiz" onPress={() => create()}></Button>
      <Button
        title="go Back"
        onPress={() => navigation.navigate("quizMain")}
      ></Button>
    </View>
  );
}
