import React, { useEffect } from "react";

import {
  Text,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import FeedItem from "../FeedItem";

import useStore from "../../hooks/useStore";
// import Spiner from "../Spiner";

import { observer } from "mobx-react-lite";

export default observer(FeedMain);

function FeedMain({ navigation }) {
  const [feed] = useStore("feed");

  useEffect(() => {
    feed.getAll();
  }, []);

  return (
    <>
      {feed?.loading ? null : (
        <>
          <Text>Feed Main </Text>
          <Button
            title="Create"
            onPress={() => {
              navigation.navigate("feed_create");
            }}
          ></Button>
          <FlatList
            data={feed?.feeds}
            renderItem={({ item }) => <FeedItem feed={item} key={item.id} />}
          />
          <Button
            title="UPLOAD"
            onPress={() => {
              navigation.navigate("upload");
            }}
          ></Button>
        </>
      )}
    </>
  );
}
