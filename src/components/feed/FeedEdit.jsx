import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Paragraph, Title } from "react-native-paper";
import Upload from "../validation/Upload";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";

export default observer(FeedEdit);

function FeedEdit({ route, navigation }) {
  const [feed] = useStore("feed");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);
  const submit = async (e) => {
    const pre = prepareEdit(e, feed?.currentFeed);
    console.log(pre);
    await feed.update(route?.params?.id, pre);
    setIsEdit(false);
    await feed.get(route?.params?.id);

    // if (Object.keys(pre).length) feed.update(route?.params?.id, pre);
  };
  return (
    <View style={styles.wrap}>
      <Card>
        <Card.Content>
          {!isEdit ? (
            <>
              <Title>
                {feed?.currentFeed?.title || "Название отсутствует"}
              </Title>
              <Paragraph>
                {feed?.currentFeed?.desc || "Описание отсутствует"}
              </Paragraph>
            </>
          ) : null}
          {isEdit ? (
            <Form onSubmit={submit} defaultValues={feed?.currentFeed}>
              <Form.Input
                name="title"
                rules={{
                  required: {
                    value: true,
                    message: "Это поле обязательно для заполнения чудик",
                  },
                  min: { value: 3, message: "Больше 3" },
                }}
              />
              <Form.Input
                name="desc"
                rules={{
                  required: {
                    value: true,
                    message: "Это поле обязательно для заполнения чудик",
                  },
                  max: { value: 250, message: "меньше 250" },
                }}
              />
            </Form>
          ) : null}
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Upload />
        <Button
          title="Редактировать"
          onPress={setIsEdit.bind(null, !isEdit)}
        ></Button>
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
