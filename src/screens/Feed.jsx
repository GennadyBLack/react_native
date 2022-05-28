import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedMain from "../components/feed/FeedMain";
import FeedCreate from "../components/feed/FeedCreate";
import React from "react";
import FeedEdit from "../components/feed/FeedEdit";
import FeedCurrent from "../components/feed/FeedCurrent";
import ImagePickerExample from "./Upload";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Feed() {
  return (
    <Navigator options={{ headerShown: false }} initialRouteName="feed">
      <Screen
        name="feed"
        component={FeedMain}
        options={{ headerShown: false }}
      />
      <Screen
        name="feed_create"
        component={FeedCreate}
        options={{ headerShown: false }}
      />
      <Screen
        name="feed_current"
        component={FeedCurrent}
        options={{ headerShown: false }}
      />
      <Screen
        name="feed_edit"
        component={FeedEdit}
        options={{ headerShown: false }}
      />
      <Screen
        name="upload"
        component={ImagePickerExample}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
