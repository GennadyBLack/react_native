import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Title } from "react-native-paper";
import Upload from "../validation/Upload";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";

export default observer(ProfileMain);

function ProfileMain({ route, navigation }) {
  const [{ user }] = useStore("auth");
  const [isEdit, setIsEdit] = useState(false);

  const submit = (e) => {
    const pre = prepareEdit(e, user);
  };
  return (
    <View style={styles.wrap}>
      <Card>
        <Card.Content>
          {!isEdit && (
            <>
              <Title>{user?.username || "Name отсутствует"}</Title>
              {/* <Paragraph>
                {feed?.currentFeed?.desc || "Описание отсутствует"}
              </Paragraph> */}
            </>
          )}
          {isEdit && (
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
            </Form>
          )}
        </Card.Content>
        <Card.Cover source={{ uri: user?.avatar }} />
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
