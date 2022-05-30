import React, { useState } from "react";
import { ScrollView, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import useStore from "../../hooks/useStore";

export default function FeedCreate({ navigation }) {
  let [feed] = useStore("feed");

  let [form, setForm] = useState({ title: "", desc: "" });

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let create = () => {
    feed.create(form);
    feed.getAll();
  };

  return (
    <ScrollView>
      <Text>Feed Create </Text>
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

      <Button title="Create Feed" onPress={() => create()}></Button>
      <Button
        title="go Back"
        onPress={() => navigation.navigate("FeedMain")}
      ></Button>
    </ScrollView>
  );
}
