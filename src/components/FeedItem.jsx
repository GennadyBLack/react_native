import React from "react";
import { View, Text } from "react-native";

export default function FeedItem({ feed }) {
  return (
    <View>
      <Text>{feed?.id}</Text>
      <Text>{feed?.title}</Text>
    </View>
  );
}
