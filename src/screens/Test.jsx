import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

function Test({ navigation }) {
  const [modal] = useStore("modal");
  useEffect(() => {
    modal.setContent(
      <View>
        <Text>Ahahaha, kakoi ty loh</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <Button title="open" onPress={() => modal.scrollFn()}></Button>
      <Button title="open close" onPress={() => modal.setClose()}></Button>
    </View>
  );
}
export default observer(Test);
