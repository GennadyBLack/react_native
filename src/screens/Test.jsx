import React from "react";
import { View, Button, Text } from "react-native";
import Portal from "../components/example/Portal";
import { observer } from "mobx-react-lite";
// import PanCircleExample from "../components/example/PanCircleExample";
import useStore from "../hooks/useStore";

function Test({ navigation }) {
  const [modal] = useStore("modal");
  return (
    <View>
      <Text>
        Text Viewasd asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd
        asd asd asdasd as das asd a s Text Viewasd asdasdasd asdasd asd asdasd
        adasd asdas dasd asd asd asdasd asd asd asdasd as das asd a s Text
        Viewasd asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd asd
        asd asdasd as das asd a s Text Viewasd asdasdasd asdasd asd asdasd adasd
        asdas dasd asd asd asdasd asd asd asdasd as das asd a s Text Viewasd
        asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd asd asd
        asdasd as das asd a sasdsad
      </Text>
      <Portal>
        <View>
          <Text>asdasdasdasda asdasdas</Text>
        </View>
      </Portal>
      <Button title="open modal" onPress={() => modal.setOpen()}></Button>
      <Button title="open close" onPress={() => modal.setClose()}></Button>
    </View>
  );
}
export default observer(Test);
