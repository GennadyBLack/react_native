import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

import FeedItem from "../components/FeedItem_old";

export default function Chat() {
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
  ];

  let [data, setData] = useState(init);

  let add = () => {
    setData([...data, newF]);
  };
  return (
    <View>
      <Text>Feed List </Text>
      <Button
        title="+"
        onPress={() => {
          add();
        }}
      ></Button>
      <FlatList
        data={data}
        renderItem={({ item }) => <FeedItem feed={item} key={item.id} />}
      />
    </View>
  );
}
