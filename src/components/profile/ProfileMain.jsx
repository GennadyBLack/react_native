import React, { useCallback, useEffect, useState } from "react";
import ScrollPageComponent from "../base/ScrollPageComponent";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Title, Paragraph } from "react-native-paper";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import Switch from "../validation/Switch";
import ModalSheet from "../base/ModalSheet";
import s from "../../helpers/styleHelper";
import { apiUrl } from "../../api";
import { getIcon } from "../../helpers/iconHelper";

export default observer(ProfileMain);

function ProfileMain({ route, navigation }) {
  const [auth] = useStore("auth");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const user = auth?.user?.user;
  // console.log(user, "iiii");
  const submit = async (e) => {
    const pre = prepareEdit(e, user);
    await auth?.updateMe(pre);
  };

  const _onPress = useCallback(
    (arg) => {
      setShowModal(!showModal);
      setModalContent(arg);
    },
    [showModal]
  );

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
    <ScrollPageComponent
      header_image={
        <Image
          style={styles.image}
          source={{
            uri: `${apiUrl}/files/${user?.avatar || "placeholder.png"}`,
          }}
        />
      }
      footer_menu={
        <View>
          <Pressable onPress={_onPress("isEditForm")}>
            {getIcon("edit")}
          </Pressable>

          <Pressable onPress={_onPress("showLogs")}>
            <Text>Show last login</Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.wrap} nativID={"super-wrap"}>
        <View>
          <Title>{user?.username || "Name отсутствует"}</Title>
          <Paragraph>{user?.description || "Описание отсутствует"}</Paragraph>
        </View>
        <ModalSheet
          startAt={1.3}
          visible={showModal}
          toggle={() => {
            setShowModal(!showModal);
          }}
        >
          <ProfileEditForm />
        </ModalSheet>
      </View>
    </ScrollPageComponent>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});
