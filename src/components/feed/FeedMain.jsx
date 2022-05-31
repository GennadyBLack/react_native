import React, { useEffect } from "react";

import {
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-paper";

import FeedItem from "./FeedItem";

import useStore from "../../hooks/useStore";
// import Spiner from "../Spiner";

import { observer } from "mobx-react-lite";

export default observer(FeedMain);

function FeedMain({ navigation }) {
  const [feed] = useStore("feed");

  useEffect(() => {
    feed.getAll();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => navigation.navigate("feed_edit", { id: item.id })}
    >
      <FeedItem feed={item} key={item.id} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrap}>
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
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                navigation.navigate("upload");
              }}
            >
              UPLOAD
            </Button>
          </>
        )}
      </>
    </View>
  );
}
//TODO:поправить скролл
const styles = StyleSheet.create({
  wrap: {
    height: "100%",
  },
});
