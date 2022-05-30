import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import Upload from "../validation/Upload";

export default observer(FeedEdit);

function FeedEdit({ route, navigation }) {
  const [feed] = useStore("feed");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <View style={styles.wrap}>
      <Card>
        <Card.Content>
          {!isEdit && (
            <>
              <Title>
                {feed?.currentFeed?.title || "Название отсутствует"}
              </Title>
              <Paragraph>
                {feed?.currentFeed?.desc || "Описание отсутствует"}
              </Paragraph>
            </>
          )}
          {isEdit && (
            <>
              <Title>
                {feed?.currentFeed?.title || "Название отсутствует"}
              </Title>
              <Paragraph>
                {feed?.currentFeed?.desc || "Описание отсутствует"}
              </Paragraph>
            </>
          )}
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Upload />
      </Card>
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
