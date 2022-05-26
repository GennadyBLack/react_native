import React, { useState, useEffect } from "react";

import {
  Text,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import FeedItem from "../FeedItem";

import useStore from "../../hooks/useStore";
import Spiner from "../Spiner";
import { observer } from "mobx-react-lite";

export default observer(FeedMain);

function FeedMain({ navigation }) {
  const [feed] = useStore("feed");

  useEffect(() => {
    feed.getAll();
  }, []);

  return (
    <>
      {feed.loading ? (
        <Spiner />
      ) : (
        <ScrollView>
          <Text>Feed Main </Text>
          <Button
            title="Create"
            onPress={() => {
              navigation.navigate("feed_create");
            }}
          ></Button>
          <FlatList
            data={feed.feeds}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("feed_current", { id: item?.id });
                }}
              >
                <FeedItem feed={item} key={item.id} />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
    </>
  );
}
