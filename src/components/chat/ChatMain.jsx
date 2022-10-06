import React, { useEffect } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import s from "../../helpers/styleHelper";
import { observer } from "mobx-react-lite";

const moc = [{}];
const ChatMain = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Chat</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(ChatMain);
