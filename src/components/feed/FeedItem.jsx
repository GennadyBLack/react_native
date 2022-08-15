import React, { useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Icon from "../base/Icon";
import MenuToggler from "../menu/MenuToggler";

export default function FeedItem({ feed, onDelete }) {
  const [showComment, setShowComment] = useState(false);

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
        console.log("idit");
      },
      class: "test",
    },
  ];

  return (
    <View>
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
        title="Комментировать"
        onPress={setShowComment.bind(null, !showComment)}
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
});
