import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Title, Paragraph } from "react-native-paper";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";

export default observer(ProfileMain);

function ProfileMain({ route, navigation }) {
  const [auth] = useStore("auth");
  const [isEdit, setIsEdit] = useState(false);
  const user = auth?.user?.user;

  const submit = async (e) => {
    const pre = prepareEdit(e, user);
    await auth?.updateMe(pre);
  };
  return (
    <View style={styles.wrap}>
      <Card>
        <Card.Content>
          {!isEdit ? (
            <>
              <Title>{user?.username || "Name отсутствует"}</Title>
              <Paragraph>
                {user?.description || "Описание отсутствует"}
              </Paragraph>
            </>
          ) : null}
          {isEdit ? (
            <Form onSubmit={submit} defaultValues={user}>
              <Form.Input
                name="username"
                rules={{
                  required: {
                    value: true,
                    message: "Это поле обязательно для заполнения чудик",
                  },
                  max: { value: 3, message: "Больше 3" },
                }}
              />
              <Form.Input
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: "Это поле обязательно для заполнения чудик",
                  },
                }}
              />
              <Form.Input
                name="description"
                rules={{
                  required: {
                    value: true,
                    message: "Это поле обязательно для заполнения чудик",
                  },
                }}
              />
              <Form.File name="avatar" title="Загрузить фото профиля" />
            </Form>
          ) : null}
        </Card.Content>
        <Card.Cover source={{ uri: user?.avatar }} />

        {!isEdit ? (
          <Button
            title="Редактировать"
            onPress={setIsEdit.bind(null, !isEdit)}
          ></Button>
        ) : null}
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
