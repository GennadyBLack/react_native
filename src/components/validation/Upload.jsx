import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStore from "../../hooks/useStore";

export default function Upload({ value = null, error, onChange, title }) {
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await tools.uploadImage(result);

    if (!result.cancelled) {
      console.log(tools.image, tools?.image);
      if (typeof onChange === "function") {
        onChange(tools?.image);
      }

      setImage(result.uri);
    }
  };

  return (
    <View>
      <Button title={title ? title : "upload image"} onPress={pickImage} />
      {image ? (
        <View>
          {/*<Text>{image}</Text>*/}
          {/*<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />*/}
          {image ? <Text>Фото успешно загружено!</Text> : null}
        </View>
      ) : null}
    </View>
  );
}
