import React, { useEffect } from "react";

import {
  Text,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

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
              renderItem={({ item }) => (
                <TouchableOpacity
                  onLongPress={() =>
                    navigation.navigate("feed_edit", { id: item.id })
                  }
                >
                  <FeedItem feed={item} key={item.id} />
                </TouchableOpacity>
              )}
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
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
  },
});
