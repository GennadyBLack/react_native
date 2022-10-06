import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Paragraph, Title } from "react-native-paper";
import GalleryPicker from "../../screens/GalleryPicker";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import s from "../../helpers/styleHelper";
import ModalSheet from "../base/ModalSheet";
import ScrollPageComponent from "../base/ScrollPageComponent";
import { apiUrl } from "../../api";

export default observer(FeedEdit);

function FeedEdit({ route, navigation }) {
  const [feed] = useStore("feed");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);
  const submit = async (e) => {
    const pre = prepareEdit(e, feed?.currentFeed);
    if (Object.keys(pre).length) {
      await feed.update(route?.params?.id, pre);
      setIsEdit(false);
      await feed.get(route?.params?.id);
    }

    // if (Object.keys(pre).length) feed.update(route?.params?.id, pre);
  };
  return (
    <ScrollPageComponent
      style={styles.wrap}
      header_image={
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: `${apiUrl}/files/${
              feed?.currentFeed?.path || "placeholder.png"
            }`,
          }}
        />
      }
    >
      <Text>{feed?.currentFeed?.title || "Название отсутствует"}</Text>

      <Text>{feed?.currentFeed?.desc || "Описание отсутствует"}</Text>

      <Pressable
        style={[s.button, { marginTop: 20 }]}
        onPress={setIsEdit.bind(null, !isEdit)}
      >
        <Text style={s.buttonText}>Редактировать</Text>
      </Pressable>
      <ModalSheet
        visible={isEdit}
        toggle={() => setIsEdit(false)}
        startAt={1.2}
      >
        <Form onSubmit={submit} defaultValues={feed?.currentFeed}>
          <Form.Input
            style={{ marginTop: 20 }}
            name="title"
            mode="outlined"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              min: { value: 3, message: "Больше 3" },
            }}
          />
          <Form.Input
            style={{ marginTop: 20 }}
            name="desc"
            mode="outlined"
            multiline
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              max: { value: 250, message: "меньше 250" },
            }}
          />
        </Form>
      </ModalSheet>
    </ScrollPageComponent>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
  },
});
