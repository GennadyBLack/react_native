import React, { useEffect } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

export default observer(FeedCurrent);
import s from "../../helpers/styleHelper";

function FeedCurrent({ route, navigation }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <View>
      <Text>{feed?.currentFeed?.title ?? ""}</Text>
      <Text>{feed?.currentFeed?.desc ?? ""}</Text>
      <Pressable
        style={s.button}
        onPress={() =>
          navigation.navigate("feed_edit", { id: feed?.currentFeed?.id })
        }
      >
        <Text>Редактировать</Text>
      </Pressable>
    </View>
  );
}
