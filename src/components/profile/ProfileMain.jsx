import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Card, Title, Paragraph } from "react-native-paper";
import Form from "../validation/Form";
import prepareEdit from "../../helpers/editHelper";
import Switch from "../validation/Switch";
import MenuSwicher from "./MenuSwicher";
import { profileMenuList } from "../../helpers/menuHelper";
import ModalSheet from "../base/ModalSheet";

export default observer(ProfileMain);

function ProfileMain({ route, navigation }) {
  const [auth] = useStore("auth");
  const [isEdit, setIsEdit] = useState(false);
  const user = auth?.user?.user;

  const submit = async (e) => {
    const pre = prepareEdit(e, user);
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
            startAt={3}
            visible={isEdit}
            toggle={() => {
              setIsEdit(false);
            }}
          >
            <ScrollView nativeID={"spisok-pipisok"} style={{flex:1}} contentContainerStyle={{padding: 25}} onScroll={(e)=> console.log(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
                <TouchableOpacity style={{width:'100%', height: 40, backgroundColor: 'blue', marginVertical: 15}} onPress={console.log('touch')}><Text>Привет</Text></TouchableOpacity>
                <Text>KeKUS1</Text>
                <Text>KeKUS2</Text>
                <Text>KeKUS3</Text>
                <Text>KeKUS4</Text>
                <Text>KeKUS5</Text>
                <Text>KeKUS6</Text>
                <Text>KeKUS7</Text>
                <Text>KeKUS8</Text>
                <Text>KeKUS9</Text>
                <Text>KeKUS10</Text>
                <Text>KeKUS11</Text>
                <Text>KeKUS12</Text>
                <Text>KeKUS13</Text>
                <Text>KeKUS14</Text>
                <Text>KeKUS15</Text>
                <Text>KeKUS16</Text>
                <Text>KeKUS17</Text>
                <Text>KeKUS18</Text>
                <Text>KeKUS19</Text>
                <Text>KeKUS20</Text>
                <Text>KeKUS21</Text>
                <Text>KeKUS22</Text>
                <Text>KeKUS23</Text>
                <Text>KeKUS24</Text>
                <Text>KeKUS25</Text>
                <Text>KeKUS26</Text>
                <Text>KeKUS27</Text>
                <Text>KeKUS28</Text>
                <Text>KeKUS29</Text>
                <Text>KeKUS30</Text>
                <Text>KeKUS31</Text>
                <Text>KeKUS32</Text>
                <Text>KeKUS33</Text>
                <Text>KeKUS34</Text>
                <Text>KeKUS35</Text>
                <Text>KeKUS36</Text>
                <Text>KeKUS37</Text>
                <Text>KeKUS38</Text>
                <Text>KeKUS39</Text>
            </ScrollView>
          </ModalSheet>

        {/*<Card.Cover source={{ uri: user?.avatar }} />*/}

        {!isEdit ? (
          <Button
            title="Редактировать"
            onPress={setIsEdit.bind(null, !isEdit)}
          ></Button>
        ) : null}
      <Button
        title="Logout"
        onPress={() => {
          auth.logout();
        }}
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
    flex:1,
  },
});
