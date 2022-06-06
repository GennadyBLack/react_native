// In App.js in a new project

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useStore from "../hooks/useStore";
import { Text, StyleSheet } from "react-native";
import filterMenuLinks, { linking } from "../helpers/menuHelper";

export default observer(Routes);

const { Screen, Navigator } = createBottomTabNavigator();

function Routes() {
  let [auth] = useStore("auth");

  useEffect(() => {}, [auth.isAuth]);

  //LINKING CONFIG END
  let mappedLinks = filterMenuLinks(auth?.isAuth, auth?.user?.user?.menu).map(
    (item, inx) => {
      return (
        <Screen
          name={item?.name}
          component={item?.component}
          options={item?.options}
          key={inx}
        />
      );
    }
  );

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      style={styles.wrap}
    >
      <Navigator
        initialRouteName="Main"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#694fad" }}
      >
        {mappedLinks}
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "90%",
  },
});
