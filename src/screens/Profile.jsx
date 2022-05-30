import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileMain from "../components/profile/ProfileMain";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Profile() {
  return (
    <Navigator options={{ headerShown: false }} initialRouteName="profile">
      <Screen name="profile" component={ProfileMain} />
    </Navigator>
  );
}
