import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStore from "../hooks/useStore";

export default function GalleryPicker({ value = null, error, onChange, title }) {
  const [image, setImage] = useState(() => (value ? value : null));
  const [tools] = useStore("tools");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // console.log(result);
      let photo = result.uri;
      if (Platform.OS === "android" || "ios") {
        photo = "data:image/jpg;base64," + result.base64;
      }
      await tools.setPreLoadImage(photo)
      // const res = await tools.uploadImage({ uri: photo });
      if (typeof onChange === "function") {
        onChange(tools?.image);
      }
      setImage(photo);
    }
  };

  return (
    <View>
      <Button title={title ? title : "upload image"} onPress={pickImage} />
    </View>
  );
}
