import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Title, Paragraph } from "react-native-paper";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import Switch from "../validation/Switch";
import MenuSwicher from "./MenuSwicher";
import { profileMenuList } from "../../routing/menuHelper";
import ModalSheet from "../base/ModalSheet";
import s from "../../helpers/styleHelper";

export default observer(ProfileMain);

function ProfileMain({ route, navigation }) {
  const [auth] = useStore("auth");
  const [isEdit, setIsEdit] = useState(false);
  const user = auth?.user?.user;

  const submit = async (e) => {
    console.log(e, "EEEE");
    const pre = prepareEdit(e, user);

    console.log(pre, "PREE");
    await auth?.updateMe(pre);
  };
  const onMenuChange = async (e, link) => {
    let userLinks = [...user.menu];
    if (e) {
      userLinks.push(link);
    } else {
      userLinks = userLinks.filter((item) => item !== link);
    }
    await auth?.updateMe({ menu: userLinks });
  };
  return (
    <View style={styles.wrap} nativID={"super-wrap"}>
      <View>
        <Title>{user?.username || "Name отсутствует"}</Title>
        <Paragraph>{user?.description || "Описание отсутствует"}</Paragraph>
      </View>
      <ModalSheet
        startAt={1.3}
        visible={isEdit}
        toggle={() => {
          setIsEdit(false);
        }}
      >
        <ScrollView
          nativeID={"spisok-pipisok"}
          style={{ flex: 1 }}
          scrollEventThrottle={16}
        >
          <Form onSubmit={submit} defaultValues={user}>
            <Form.Input
              name="username"
              mode="outlined"
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
              mode="outlined"
              rules={{
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения чудик",
                },
              }}
            />
            <Form.Input
              name="description"
              mode="outlined"
              multiline
              rules={{
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения чудик",
                },
              }}
            />
            <Form.File name="avatar" title="Загрузить фото профиля" />
            <Switch />
          </Form>
          {/* <MenuSwicher
            data={profileMenuList(user?.menu)}
            onChange={(e, l) => {
              onMenuChange(e, l);
            }}
          /> */}
        </ScrollView>
      </ModalSheet>
      <Card.Cover source={{ uri: user?.avatar }} />
      {!isEdit ? (
        <Pressable
          style={[s.button, { marginBottom: 20 }]}
          onPress={setIsEdit.bind(null, !isEdit)}
        >
          <Text style={s.buttonText}>Редактировать</Text>
        </Pressable>
      ) : (
        <Text></Text>
      )}
      <Pressable
        style={s.button}
        onPress={() => {
          auth.logout();
        }}
      >
        <Text style={s.buttonText}>Выйти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
    flex: 1,
  },
});
