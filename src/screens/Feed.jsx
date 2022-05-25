import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedMain from "../components/feed/FeedMain";
import FeedCreate from "../components/feed/FeedCreate";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Feed() {
  return (
    <Navigator options={{ headerShown: false }} initialRouteName="Feed">
      <Screen
        name="Feed"
        component={FeedMain}
        options={{ headerShown: false }}
      />
      <Screen
        name="FeedCreate"
        component={FeedCreate}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
