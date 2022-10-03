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

import FeedItem_old from "./FeedItem_old";
import FeedItem from "./FeedItem";

import useStore from "../../hooks/useStore";

import { observer } from "mobx-react-lite";

export default observer(FeedMain);

function FeedMain({ navigation }) {
  const [feed] = useStore("feed");
  const deletePost = async (id) => {
    await feed.delete(id);
    await feed.getAll();
  };

  useEffect(() => {
    const getAllFeed = async () => {
      await feed.getAll();
    };

    getAllFeed();
  }, []);
  const renderItem = ({ item }) => (
    <FeedItem
      feed={item}
      key={item.id}
      onDelete={deletePost}
      navigation={navigation}
    />
  );
  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        icon="camera"
        mode="contained"
        onPress={() => {
          navigation.navigate("feed_create");
        }}
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Text>Create Post</Text>
      </TouchableOpacity>
      {feed?.loading ? (
        <Text>Загрузка</Text>
      ) : (
        <FlatList
          data={feed?.feeds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          nativeID={`FlatList`}
          style={{ zIndex: 10 }}
          contentContainerStyle={{overflow: "visible" }}
        />
      )}
    </View>
  );
}
//TODO:поправить скролл
const styles = StyleSheet.create({
  wrap: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#eee",
  },
});
