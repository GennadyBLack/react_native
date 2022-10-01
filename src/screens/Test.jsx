import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ModalSheet from "../components/base/ModalSheet";
// import Map from "../components/base/Map";
// import Testicus from "../components/base/Testicus";
import ScrollPageComponent from "../components/base/ScrollPageComponent";

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
    <ScrollPageComponent>
      {dammy.map((item, idx) => {
        return (
          <Text
            key={idx}
            style={{ padding: 40, borderColor: "black", borderWidth: 2 }}
          >
            {item}
          </Text>
        );
      })}
    </ScrollPageComponent>
  );
}
export default observer(Test);
