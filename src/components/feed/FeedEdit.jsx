import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import ImagePickerExample from "../../screens/Upload";

export default observer(FeedEdit);

function FeedEdit({ route }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <View>
      <Text>{feed?.currentFeed?.title}</Text>
      <Text>{feed?.currentFeed?.desc}</Text>
      <ImagePickerExample />
    </View>
  );
}
