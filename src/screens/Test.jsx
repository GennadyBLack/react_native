import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ModalSheet from "../components/base/ModalSheet";
import GridSearchComponent from "../components/grid/GridSearchComiponent";

import ScrollPageComponent from "../components/base/ScrollPageComponent";
import TabBar from "../components/base/TabBar";
import ChatMain from "../components/chat/ChatMain";

function Test({ navigation }) {
  const [visible, toggle] = ModalSheet.useModal();
  useEffect(() => {}, []);
  const dammy = [
    "test",
    "hi fried",
    "aloha maslo",
    "lorem aposum bro",
    "test",
    "hi fried",
    "aloha maslo",
    "lorem aposum bro",
    "test",
    "hi fried",
    "aloha maslo",
    "lorem aposum bro",
    "test",
    "hi fried",
    "aloha maslo",
    "lorem aposum bro",
  ];
  return (
    <View>
      <ChatMain />
      <GridSearchComponent />
    </View>

    // <View style={{ backgroundColor: "red" }}>
    //   <TabBar />
    // </View>
  );
}
export default observer(Test);
