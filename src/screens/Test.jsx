import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ModalSheet from "../components/base/ModalSheet";

function Test({ navigation }) {
  const [visible, toggle] = ModalSheet.useModal();

  useEffect(() => {}, []);

  return (
    <View>
      <ModalSheet visible={visible} toggle={toggle}>
        <Text nativeID="modal-test">asdasdasd</Text>
      </ModalSheet>
      <Button title="open" onPress={() => toggle()}></Button>
    </View>
  );
}
export default observer(Test);
