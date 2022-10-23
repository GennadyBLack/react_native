import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStore from "../hooks/useStore";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";

export default function GalleryPicker({
  value = null,
  error,
  onChange,
  title,
}) {
  const [image, setImage] = useState(() => (value ? value : null));
  const [tools] = useStore("tools");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need media library permissions to make this work!");
        }
        if (permissionResult.granted == false) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
        if (mediaLibraryPermission.granted == false) {
          alert("Sorry, we need media permissions to make this work!");
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

    await onResult(result);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1,
      exif: false,
      allowsEditing: true,
    });
    await onResult(result, true);
  };
  async function onResult(result, camera=false) {
    if (!result.cancelled) {
      let photo = result.uri;
      if (Platform.OS === "android" || "ios") {
        if(camera) {
          await MediaLibrary.saveToLibraryAsync(photo);
        }
        photo = "data:image/jpg;base64," + result.base64;
      }

      setImage(photo);
      if (typeof onChange === "function") {
        onChange(photo);
        return;
      }
      await tools.setPreLoadImage(photo);
    }
  }
  return (
    <View>
      <Button title={title ? title : "upload image"} onPress={pickImage} />
      <Button title={title ? title : "open camera"} onPress={openCamera} />
    </View>
  );
}
