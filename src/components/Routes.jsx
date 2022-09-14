// In App.js in a new project

import React, { useEffect } from "react";
import { Linking, View } from "react-native";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useStore from "../hooks/useStore";
import { Text, StyleSheet } from "react-native";
import filterMenuLinks, { linking } from "../helpers/menuHelper";

export default observer(Routes);
const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const { Screen, Navigator } = createBottomTabNavigator();

function Routes() {
  //state persistence
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = React.useState();
  let [auth] = useStore("auth");
  useEffect(() => {}, [auth.isAuth]);
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        // Only restore state if there's no deep link and we're not on web
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        //Расскоментить, чтобы запускать приложение с последней посещенной страницы
        // if (state !== undefined) {
        //   setInitialState(state);
        // }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View>
        <Text>Loading...please wait</Text>
      </View>
    );
  }
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
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
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
  wrap: {},
});
