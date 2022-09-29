import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ModalSheet from "../components/base/ModalSheet";
import Map from "../components/base/Map";

function Test({ navigation }) {
  const [visible, toggle] = ModalSheet.useModal();

  useEffect(() => {}, []);

  return (
    <View>
      <Map></Map>
    </View>
  );
}
export default observer(Test);
