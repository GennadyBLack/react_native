import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
export default observer(FeedCurrent);

function FeedCurrent({ route, navigation }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  console.log(feed?.currentFeed, "feed?.currentFeed");
  return (
    <View>
      <Text>{feed?.currentFeed?.title ?? "s"}</Text>
      <Text>{feed?.currentFeed?.desc ?? "s"}</Text>
      <Button
        title="edit"
        onPress={() =>
          navigation.navigate("feed_edit", { id: feed?.currentFeed?.id })
        }
      />
    </View>
  );
}
