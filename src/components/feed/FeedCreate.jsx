import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { TextInput } from "react-native-paper";
import useStore from "../../hooks/useStore";
import GalleryPicker from "../../screens/GalleryPicker";
import Cam from "../../screens/Cam";
import { useIsFocused } from "@react-navigation/native";

export default function FeedCreate({ navigation }) {
  let [feed, tools] = useStore("feed", "tools");

  let [form, setForm] = useState({ title: "", desc: "" });

  const isFocused = useIsFocused();
  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let create = async () => {
    if (tools.cameraImage) {
      await tools.uploadImage({ uri: tools.cameraImage });
      await tools.setCameraImage(null);
    }
    await feed.create(form);
    // feed.getAll();
    navigation.replace("feed");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Feed Create </Text>
      <TextInput
        label="Title"
        value={form?.title}
        onChangeText={(text) => setText(text, "title")}
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={form?.desc}
        onChangeText={(text) => setText(text, "desc")}
        mode="outlined"
        multiline
      />
      {tools.cameraImage && isFocused && (
        <Image
          source={{ uri: tools.cameraImage, cache: "reload" }}
          style={{ width: "100%", height: 350 }}
          key={new Date()}
        />
      )}

      <Button
        title="Pick from Camera"
        onPress={() => navigation.navigate("cam")}
      ></Button>
      <GalleryPicker/>
      <Button title="Create Feed" onPress={() => create()}></Button>
      <Button
        title="go Back"
        onPress={() => navigation.navigate("feed")}
      ></Button>
    </View>
  );
}
