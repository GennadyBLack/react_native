import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStore from "../hooks/useStore";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    tools.uploadImage(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image ? <Image source={{ uri: image }} /> : <Text></Text>}
    </View>
  );
}
