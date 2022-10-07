import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { TextInput } from "react-native-paper";
import useStore from "../../hooks/useStore";
import GalleryPicker from "../../screens/GalleryPicker";
import { useIsFocused } from "@react-navigation/native";

export default function FeedCreate({ navigation }) {
  let [feed, tools] = useStore("feed", "tools");
  let [image, setImage] = useState(null);
  let [form, setForm] = useState({ title: "", desc: "" });

  const isFocused = useIsFocused();
  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let create = async () => {
    if (image || tools.preLoadImage) {
      try {
        await tools.uploadImage({ uri: image || tools.preLoadImage });
        await tools.preLoadImage(null);
      } catch (e) {
        console.error(e);
      }
    }
    await feed.create(form);
    // feed.getAll();
    navigation.replace("feed");
  };

  const onPhotoChosen = (img) => {
    setImage(img);
  };
  useEffect(() => {
    if (isFocused) {
      console.log(
        tools?.preLoadImage?.slice(0, 100) || "not ready",
        "Preloadada"
      );
    }
  }, [isFocused]);

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
      {image && isFocused && (
        <Image
          source={{ uri: image, cache: "reload" }}
          style={{ width: "100%", height: 350 }}
          key={new Date()}
        />
      )}

      <GalleryPicker onChange={(img) => onPhotoChosen(img)} />
      <Button title="Create Feed" onPress={() => create()}></Button>
      <Button
        title="go Back"
        onPress={() => navigation.navigate("feed")}
      ></Button>
    </View>
  );
}
