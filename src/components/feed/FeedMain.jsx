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
    <TouchableOpacity
      onLongPress={() => navigation.navigate("feed_edit", { id: item.id })}
    >
      <FeedItem
        feed={item}
        key={item.id}
        onDelete={deletePost}
        navigation={navigation}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrap}>
      {feed?.loading ? null : (
        <View style={{ flex: 1 }}>
          {/*<Text>Feed Main </Text>*/}
          {/*<Button*/}
          {/*  title="Create"*/}
          {/*  onPress={() => {*/}
          {/*    try {*/}
          {/*      navigation?.navigate("feed_create");*/}
          {/*    } catch (error) {*/}
          {/*      console.log(error);*/}
          {/*    }*/}
          {/*  }}*/}
          {/*></Button>*/}
          {feed?.feeds && feed?.feeds?.length && (
            <FlatList
              data={feed?.feeds}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
          {/*<Button*/}
          {/*  icon="camera"*/}
          {/*  mode="contained"*/}
          {/*  onPress={() => {*/}
          {/*    navigation.navigate("feed_create");*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Create Post*/}
          {/*</Button>*/}
        </View>
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
    zIndex: 100000,
  },
});
