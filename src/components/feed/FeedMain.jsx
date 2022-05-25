import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import FeedItem from "../FeedItem";
export default function FeedMain({ navigation }) {
  let newF = {
    id: Math.random(),
    title: "hi there",
    desc: "test text",
    author: { name: "me", id: 1 },
  };
  let init = [
    {
      id: 2,
      title: "hi therde",
      desc: "test tedxt",
      author: { name: "mde", id: 2 },
    },
    {
      id: 3,
      title: "hi FDFDF",
      desc: "test FDF",
      author: { name: "mde", id: 2 },
    },
  ];

  let [data, setData] = useState(init);

  let add = () => {
    setData([...data, newF]);
  };

  return (
    <View>
      <Text>Feed Main </Text>
      <Button
        title="Create"
        onPress={() => {
          navigation.navigate("FeedCreate");
        }}
      ></Button>
      <FlatList
        data={data}
        renderItem={({ item }) => <FeedItem feed={item} key={item.id} />}
      />
    </View>
  );
}
