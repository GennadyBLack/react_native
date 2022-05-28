import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Button } from "react-native-paper";
import Upload from "../validation/Upload";

export default observer(FeedEdit);

function FeedEdit({ route, navigation }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <View>
      <Text>{feed?.currentFeed?.title}</Text>
      <Text>{feed?.currentFeed?.desc}</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          navigation.navigate("upload");
        }}
      >
        UPLOAD
      </Button>
      <Upload></Upload>
    </View>
  );
}
