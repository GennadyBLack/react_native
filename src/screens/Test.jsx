import React from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import Portal from "../components/base/Portal";
import CardExample from "../components/example/CardExample";
import ReEx1 from "../components/example/ReEx1";
import ReEx2 from "../components/example/ReEx2";
import ReEx3 from "../components/example/ReEx3";
import ReEx4 from "../components/example/ReEx4";
import ReEx5 from "../components/example/ReEx5";
import BottomSheet from "../components/base/BottomSheet";

function Test({ navigation }) {
  const [modal] = useStore("modal");
  return (
    // <ReEx5 />
    // <ReEx4 />
    // <ReEx3 />
    // <ReEx2 />
    // <ReEx1 />
    // <CardExample />

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
    // <View>
    //   <Text onPress={() => console.log("fdfd")}>Salam</Text>
    // </View>
    //   </Portal>
    <View>
      <Button title="open" onPress={() => modal.scrollFn()}></Button>
      <Button title="open close" onPress={() => modal.setClose()}></Button>
    </View>
    // </View>
  );
}
export default observer(Test);
