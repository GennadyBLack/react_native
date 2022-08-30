import React from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import Portal from "../components/base/Portal";
import CardExample from "../components/example/CardExample";

function Test({ navigation }) {
  const [modal] = useStore("modal");
  return (
    <CardExample />
    // <View>
    //   <Text>
    //     Text Viewasd asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd
    //     asd asd asdasd as das asd a s Text Viewasd asdasdasd asdasd asd asdasd
    //     adasd asdas dasd asd asd asdasd asd asd asdasd as das asd a s Text
    //     Viewasd asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd asd
    //     asd asdasd as das asd a s Text Viewasd asdasdasd asdasd asd asdasd adasd
    //     asdas dasd asd asd asdasd asd asd asdasd as das asd a s Text Viewasd
    //     asdasdasd asdasd asd asdasd adasd asdas dasd asd asd asdasd asd asd
    //     asdasd as das asd a sasdsad
    //   </Text>
    //   <Portal>
    //     <View>
    //       <Text onPress={() => console.log("fdfd")}>Salam</Text>
    //     </View>
    //   </Portal>
    //   <Button title="open modal" onPress={() => modal.setOpen()}></Button>
    //   <Button title="open close" onPress={() => modal.setClose()}></Button>
    // </View>
  );
}
export default observer(Test);
