import React, { useEffect } from "react";
import { View, Button, Text, Pressable, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ChatMain from "../components/chat/ChatMain";
import FeedItem from "../components/feed/FeedItem";
import TabBar from "../components/base/TabBar";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function Test({ navigation }) {
  return (
    <View>
      <TabBar />
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
});
export default observer(Test);
