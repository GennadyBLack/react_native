import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import useStore from "../../hooks/useStore";
import Upload from "../validation/Upload";
import Cam from "../../screens/Cam";

export default function FeedCreate({ navigation }) {
  let [feed] = useStore("feed");

  let [form, setForm] = useState({ title: "", desc: "" });

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let create = async () => {
    await feed.create(form);
    // feed.getAll();
    navigation.replace("feed");
  };

  return (
    <View style={{flex:1}}>
      <Text>Feed Create </Text>
      <TextInput
        label="Title"
        value={form?.title}
        onChangeText={(text) => setText(text, "title")}
        mode="flat"
      />
      <TextInput
        label="Description"
        value={form?.desc}
        onChangeText={(text) => setText(text, "desc")}
        mode="outlined"
        multiline
      />

        <Button
            title="Pick from Camera"
            onPress={() => navigation.navigate("cam")}
        ></Button>
      <Upload />
      <Button title="Create Feed" onPress={() => create()}></Button>
      <Button
        title="go Back"
        onPress={() => navigation.navigate("feed")}
      ></Button>
    </View>
  );
}
