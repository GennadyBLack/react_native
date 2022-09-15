import React, { useState } from "react";
import { View, StyleSheet, TextInput, Image, Text } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Icon from "../base/Icon";
import MenuToggler from "../menu/MenuToggler";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { apiUrl } from "../../api";

const AnimateImage = Animated.createAnimatedComponent(Image);

export default function FeedItem({ feed, onDelete, navigation }) {
  const [showComment, setShowComment] = useState(false);
  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(event, "event");
      scale.value = event.scale;
    },
  });

  const rCover = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const menuList = [
    {
      permission: ["owner"],
      title: "delete",
      onPress: (e) => onDelete(feed.id, e),
      // icon:
      class: "test",
    },
    {
      permission: ["owner"],
      title: "edit",
      onPress: () => {
        try {
          navigation.navigate("feed_edit", { id: feed.id });
        } catch (error) {
          console.log(error);
        }
      },
      class: "test",
    },
  ];

  return (
    <View style={{ padding: 30 }}>
      <Text>{JSON.stringify(feed)}</Text>
      <Card>
        <Card.Content style={styles.item}>
          <Title>{feed?.title}</Title>
          <Paragraph>{feed?.desc}</Paragraph>
        </Card.Content>
        <AnimateImage
          source={{ uri: `${apiUrl}/files/${feed?.path || "placeholder.png"}` }}
        />
        {/*<Card.Cover source={{ uri: feed?.path }} /> Not allowed to load local resource // https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource*/}
        {showComment ? (
          <View>
            <TextInput placeholder="Оставьте свой комментарий"></TextInput>
            <Button title="Отправить" />
          </View>
        ) : null}
        <Card.Actions></Card.Actions>
      </Card>

      <Button
        onPress={setShowComment.bind(null, !showComment)}
        mode="contained"
        color="green"
        icon="card-text"
      />
      <MenuToggler
        anchor={
          <Text>alo</Text>
          // <Icon
          //   source={Icon?.sources?.base?.menuDot}
          //   style={{ height: "20px", width: "20px" }}
          // />
        }
        items={menuList}
        // style={styles.topMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    // width: "90%",
    // pointerEvents: "none",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  topMenu: {
    zIndex: 100,
    top: 100,
    backgroundColor: "blue",
    position: "absolute",
  },
  actions: {
    // display: "flex",
  },
});
