// In App.js in a new project

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/Login";
import Main from "../screens/Main";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { Text } from "react-native";
export default observer(Routes);

const { Screen, Navigator } = createBottomTabNavigator();

function Routes() {
  let [auth] = useStore("auth");
  useEffect(() => {
    console.log("update");
  }, [auth.isAuth]);

  //LINKING CONFIG
  const linking = {
    prefixes: [
      /* your linking prefixes */
    ],
    config: {
      /* configuration for matching screens with paths */
      screens: {
        Login: "login",
        Profile: "profile",
        Main: "main",
        Feed: "feed",
      },
    },
  };

  //LINKING CONFIG END

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Navigator
        initialRouteName="Main"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#694fad" }}
      >
        {auth?.isAuth ? (
          <>
            <Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Screen
              name="Feed"
              component={Feed}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Screen
              name="Home"
              component={Main}
              options={{ headerShown: false }}
            />
            <Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}
