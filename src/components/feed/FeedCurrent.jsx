import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

export default observer(FeedCurrent);

function FeedCurrent({ route }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <View>
      <Text>{feed?.currentFeed?.title}</Text>
      <Text>{feed?.currentFeed?.desc}</Text>
    </View>
  );
}
