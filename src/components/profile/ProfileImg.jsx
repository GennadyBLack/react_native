import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { apiUrl } from "../../api";

export default function ProfileImg({ path, width }) {
  return path ? (
    <Image
      style={{ height: width, width: width, borderRadius: width / 2 }}
      source={{
        uri: `${apiUrl}/files/${path || "placeholder.png"}`,
      }}
    />
  ) : (
    <View
      style={{
        height: width,
        width: width,
        borderRadius: width / 2,
        backgroundColor: "#eee",
      }}
    />
  );
}

const styles = StyleSheet.create({});
