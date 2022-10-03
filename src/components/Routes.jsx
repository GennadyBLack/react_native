// In App.js in a new project

import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { linking } from "../routing/deepLinkingHelper";
import ModalWrapper from "./base/ModalWrapper";
import constants from "../helpers/style";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useStore from "../hooks/useStore";
import { Text, StyleSheet } from "react-native";
import filterMenuLinks from "../routing/menuHelper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const { Screen, Navigator } = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Routes() {
  //state persistence
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = React.useState();

  const [routes, setRoutes] = useState([]);

  let [auth] = useStore("auth");
  useEffect(() => {
    //LINKING CONFIG END
    let mappedLinks = filterMenuLinks(auth?.isAuth, auth?.user?.user?.menu).map(
      (item, inx) => {
        return auth.isAuth ? (
          <Screen
            name={item?.name}
            component={item?.component}
            options={item?.options}
            key={inx}
          />
        ) : (
          <Stack.Screen
            name={item?.name}
            component={item?.component}
            options={item?.options}
            key={inx}
          />
        );
      }
    );
    setRoutes(mappedLinks);
  }, [auth.isAuth]);

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

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      style={styles.wrap}
      initialState={initialState}
      barStyle={{ backgroundColor: "#694fad" }}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <ModalWrapper style={styles.wrap}>
        {auth?.isAuth && (
          <Navigator
            initialRouteName="Main"
            activeColor="#fff"
            // activeColor={constants.GREEN}
            inactiveColor={constants.GREEN}
            // barStyle={{ backgroundColor: "#694fad" }}
          >
            {routes}
          </Navigator>
        )}
        {!auth?.isAuth && (
          <Stack.Navigator activeColor="#fff">{routes}</Stack.Navigator>
        )}
      </ModalWrapper>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrap: {},
});
export default observer(Routes);
