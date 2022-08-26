import React from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
// import PanCircleExample from "../components/example/PanCircleExample";
import ModalExample from "../components/example/ModalExample";

function TestHeader() {
  return (
    <>
      <Text>Header</Text>
    </>
  );
}

export default observer(Test);

function Test({ navigation }) {
  return <ModalExample />;
}
