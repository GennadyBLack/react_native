import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "../base/Icon";
import MenuToggler from "../menu/MenuToggler";

export default function FeedItem({ feed, onDelete, navigation }) {
  const [showComment, setShowComment] = useState(false);

  console.log(navigation, "navigation");
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
    <View style={{ padding: "30px" }}>
      <Card>
        <Card.Content style={styles.item}>
          <Title>{feed?.title}</Title>
          <Paragraph>{feed?.desc}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        {/*<Card.Cover source={{ uri: feed?.path }} /> Not allowed to load local resource // https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource*/}
        {showComment ? (
          <>
            <TextInput placeholder="Оставьте свой комментарий"></TextInput>
            <Button title="Отправить" />
          </>
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
          <Icon
            source={Icon?.sources?.base?.menuDot}
            style={{ height: "20px", width: "20px" }}
          />
        }
        items={menuList}
        // style={styles.topMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "90%",
    // pointerEvents: "none",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  topMenu: {
    zIndex: 100,
    top: 100,
    backgroundColor: "blue",
    position: "absolute",
  },
  actions: {
    display: "flex",
  },
});
